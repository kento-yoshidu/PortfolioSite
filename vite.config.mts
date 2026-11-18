import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // TanStack Router のプラグインは react() より前に置く必要がある
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    react(),
  ],
});
