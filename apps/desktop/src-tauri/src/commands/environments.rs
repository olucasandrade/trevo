use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;
use tauri::Manager;

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

fn get_environments_path(app: &tauri::AppHandle) -> Result<PathBuf, String> {
    let app_data = app
        .path()
        .app_data_dir()
        .map_err(|e| format!("Failed to get app data directory: {}", e))?;
    Ok(app_data.join("environments.json"))
}

#[tauri::command]
pub fn get_environments(app: tauri::AppHandle) -> Result<Vec<Environment>, String> {
    let file_path = get_environments_path(&app)?;

    if !file_path.exists() {
        return Ok(vec![]);
    }

    let json = fs::read_to_string(&file_path)
        .map_err(|e| format!("Failed to read environments file: {}", e))?;

    serde_json::from_str(&json)
        .map_err(|e| format!("Failed to parse environments: {}", e))
}

#[tauri::command]
pub fn save_environments(
    app: tauri::AppHandle,
    environments: Vec<Environment>,
) -> Result<(), String> {
    let app_data = app
        .path()
        .app_data_dir()
        .map_err(|e| format!("Failed to get app data directory: {}", e))?;

    fs::create_dir_all(&app_data)
        .map_err(|e| format!("Failed to create app data directory: {}", e))?;

    let file_path = app_data.join("environments.json");
    let json = serde_json::to_string_pretty(&environments)
        .map_err(|e| format!("Failed to serialize environments: {}", e))?;

    fs::write(file_path, json)
        .map_err(|e| format!("Failed to write environments file: {}", e))?;

    Ok(())
}

#[tauri::command]
pub fn save_environment(app: tauri::AppHandle, environment: Environment) -> Result<(), String> {
    let mut environments = get_environments(app.clone())?;

    // Find and update or add
    if let Some(idx) = environments.iter().position(|e| e.id == environment.id) {
        environments[idx] = environment;
    } else {
        environments.push(environment);
    }

    save_environments(app, environments)
}

#[tauri::command]
pub fn delete_environment(app: tauri::AppHandle, environment_id: String) -> Result<(), String> {
    let environments: Vec<Environment> = get_environments(app.clone())?
        .into_iter()
        .filter(|e| e.id != environment_id)
        .collect();

    save_environments(app, environments)
}
