mod commands;

use tauri::Manager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![
            commands::http::send_http_request,
            commands::collections::save_collection,
            commands::collections::load_collection,
            commands::collections::list_collections,
            commands::collections::delete_collection,
            commands::environments::get_environments,
            commands::environments::save_environments,
            commands::environments::save_environment,
            commands::environments::delete_environment,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
