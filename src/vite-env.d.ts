// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SHEETS_MODE?: "mock" | "apps_script" | "sheets_api";
  readonly VITE_APPS_SCRIPT_URL?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
