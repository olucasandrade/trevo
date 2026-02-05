use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;
use tauri::Manager;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct SavedRequest {
    id: String,
    name: String,
    url: String,
    method: String,
    headers: Option<std::collections::HashMap<String, String>>,
    body: Option<String>,
    params: Option<std::collections::HashMap<String, String>>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct RequestFolder {
    id: String,
    name: String,
    requests: Vec<SavedRequest>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct EnvironmentVariable {
    id: String,
    key: String,
    value: String,
    enabled: bool,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Environment {
    id: String,
    name: String,
    variables: Vec<EnvironmentVariable>,
    #[serde(rename = "isActive")]
    is_active: bool,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ResponseExtractor {
    id: String,
    #[serde(rename = "variableName")]
    variable_name: String,
    source: String,
    path: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ChainedRequest {
    id: String,
    #[serde(rename = "requestId")]
    request_id: String,
    extractors: Vec<ResponseExtractor>,
    #[serde(rename = "dependsOn")]
    depends_on: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct RequestChain {
    id: String,
    name: String,
    requests: Vec<ChainedRequest>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Collection {
    id: String,
    name: String,
    description: Option<String>,
    folders: Vec<RequestFolder>,
    environments: Vec<Environment>,
    chains: Vec<RequestChain>,
    #[serde(rename = "createdAt")]
    created_at: String,
    #[serde(rename = "updatedAt")]
    updated_at: String,
}

fn get_collections_dir(app: &tauri::AppHandle) -> Result<PathBuf, String> {
    let app_data = app
        .path()
        .app_data_dir()
        .map_err(|e| format!("Failed to get app data directory: {}", e))?;
    Ok(app_data.join("collections"))
}

#[tauri::command]
pub fn save_collection(app: tauri::AppHandle, collection: Collection) -> Result<(), String> {
    let collections_dir = get_collections_dir(&app)?;
    fs::create_dir_all(&collections_dir)
        .map_err(|e| format!("Failed to create collections directory: {}", e))?;

    let file_path = collections_dir.join(format!("{}.json", collection.id));
    let json = serde_json::to_string_pretty(&collection)
        .map_err(|e| format!("Failed to serialize collection: {}", e))?;

    fs::write(file_path, json)
        .map_err(|e| format!("Failed to write collection file: {}", e))?;

    Ok(())
}

#[tauri::command]
pub fn load_collection(app: tauri::AppHandle, collection_id: String) -> Result<Collection, String> {
    let collections_dir = get_collections_dir(&app)?;
    let file_path = collections_dir.join(format!("{}.json", collection_id));

    let json = fs::read_to_string(&file_path)
        .map_err(|e| format!("Failed to read collection file: {}", e))?;

    serde_json::from_str(&json)
        .map_err(|e| format!("Failed to parse collection: {}", e))
}

#[tauri::command]
pub fn list_collections(app: tauri::AppHandle) -> Result<Vec<Collection>, String> {
    let collections_dir = get_collections_dir(&app)?;

    if !collections_dir.exists() {
        return Ok(vec![]);
    }

    let mut collections = vec![];

    let entries = fs::read_dir(&collections_dir)
        .map_err(|e| format!("Failed to read collections directory: {}", e))?;

    for entry in entries {
        let entry = entry.map_err(|e| format!("Failed to read directory entry: {}", e))?;
        let path = entry.path();

        if path.extension().map_or(false, |ext| ext == "json") {
            if let Ok(json) = fs::read_to_string(&path) {
                if let Ok(collection) = serde_json::from_str(&json) {
                    collections.push(collection);
                }
            }
        }
    }

    // Sort by updated_at descending
    collections.sort_by(|a: &Collection, b: &Collection| {
        b.updated_at.cmp(&a.updated_at)
    });

    Ok(collections)
}

#[tauri::command]
pub fn delete_collection(app: tauri::AppHandle, collection_id: String) -> Result<(), String> {
    let collections_dir = get_collections_dir(&app)?;
    let file_path = collections_dir.join(format!("{}.json", collection_id));

    fs::remove_file(&file_path)
        .map_err(|e| format!("Failed to delete collection file: {}", e))?;

    Ok(())
}
