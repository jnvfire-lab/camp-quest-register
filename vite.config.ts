import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  // lê variáveis do .env.local
  const env = loadEnv(mode, process.cwd(), "");
  const apps = env.VITE_APPS_SCRIPT_URL; // URL /exec do Apps Script

  // Proxy no dev: /api/submit -> https://script.google.com/.../exec
  let proxy: any = undefined;
  if (apps) {
    const u = new URL(apps);
    proxy = {
      "/api/submit": {
        target: `${u.protocol}//${u.host}`,
        changeOrigin: true,
        secure: true,
        // mapeia SEMPRE para o caminho do GAS (ignora o path local)
        rewrite: () => u.pathname + (u.search || ""),
      },
    };
  }

  return {
    server: {
      host: "::",
      port: 8080,
      proxy, // habilita o proxy no dev
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(
      Boolean
    ),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
