use reqwest::{header::{HeaderMap, HeaderName, HeaderValue}, Client, Method};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::time::Instant;

#[derive(Debug, Deserialize)]
pub struct RequestConfig {
    method: String,
    url: String,
    headers: Option<HashMap<String, String>>,
    params: Option<HashMap<String, String>>,
    body: Option<serde_json::Value>,
    body_type: Option<String>,
}

#[derive(Debug, Serialize)]
pub struct ApiResponse {
    status: u16,
    #[serde(rename = "statusText")]
    status_text: String,
    headers: HashMap<String, String>,
    body: serde_json::Value,
    #[serde(rename = "elapsedTime")]
    elapsed_time: f64,
    size: usize,
}

#[tauri::command]
pub async fn send_http_request(config: RequestConfig) -> Result<ApiResponse, String> {
    let client = Client::builder()
        .danger_accept_invalid_certs(false)
        .build()
        .map_err(|e| format!("Failed to create HTTP client: {}", e))?;

    let start = Instant::now();

    // Parse method
    let method = Method::from_bytes(config.method.to_uppercase().as_bytes())
        .map_err(|e| format!("Invalid HTTP method: {}", e))?;

    // Parse URL and add query params
    let mut url = reqwest::Url::parse(&config.url)
        .map_err(|e| format!("Invalid URL: {}", e))?;

    if let Some(params) = &config.params {
        for (key, value) in params {
            if !key.is_empty() && !value.is_empty() {
                url.query_pairs_mut().append_pair(key, value);
            }
        }
    }

    // Build request
    let mut request = client.request(method.clone(), url);

    // Add headers
    if let Some(headers) = &config.headers {
        let mut header_map = HeaderMap::new();
        for (key, value) in headers {
            if !key.is_empty() && !value.is_empty() {
                if let (Ok(name), Ok(val)) = (
                    HeaderName::from_bytes(key.as_bytes()),
                    HeaderValue::from_str(value),
                ) {
                    header_map.insert(name, val);
                }
            }
        }
        request = request.headers(header_map);
    }

    // Add body
    if let Some(body) = &config.body {
        let body_type = config.body_type.as_deref().unwrap_or("none");

        match body_type {
            "json" => {
                request = request
                    .header("Content-Type", "application/json")
                    .json(body);
            }
            "form" => {
                if let Some(obj) = body.as_object() {
                    let form: HashMap<String, String> = obj
                        .iter()
                        .filter_map(|(k, v)| {
                            v.as_str().map(|s| (k.clone(), s.to_string()))
                        })
                        .collect();
                    request = request
                        .header("Content-Type", "application/x-www-form-urlencoded")
                        .form(&form);
                } else if let Some(s) = body.as_str() {
                    request = request
                        .header("Content-Type", "application/x-www-form-urlencoded")
                        .body(s.to_string());
                }
            }
            "text" => {
                let text = match body {
                    serde_json::Value::String(s) => s.clone(),
                    _ => body.to_string(),
                };
                request = request
                    .header("Content-Type", "text/plain")
                    .body(text);
            }
            _ => {}
        }
    }

    // Send request
    let response = request
        .send()
        .await
        .map_err(|e| format!("Request failed: {}", e))?;

    let elapsed = start.elapsed().as_millis() as f64;

    // Extract response info
    let status = response.status().as_u16();
    let status_text = response
        .status()
        .canonical_reason()
        .unwrap_or("Unknown")
        .to_string();

    // Extract headers
    let headers: HashMap<String, String> = response
        .headers()
        .iter()
        .map(|(k, v)| {
            (
                k.to_string(),
                v.to_str().unwrap_or("").to_string(),
            )
        })
        .collect();

    // Get response body
    let body_bytes = response
        .bytes()
        .await
        .map_err(|e| format!("Failed to read response body: {}", e))?;

    let size = body_bytes.len();

    // Try to parse as JSON, fallback to string
    let body: serde_json::Value = serde_json::from_slice(&body_bytes).unwrap_or_else(|_| {
        serde_json::Value::String(String::from_utf8_lossy(&body_bytes).to_string())
    });

    Ok(ApiResponse {
        status,
        status_text,
        headers,
        body,
        elapsed_time: elapsed,
        size,
    })
}
