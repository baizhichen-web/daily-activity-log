import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { aiNativePlugin } from "./scripts/ai-native/generate.mjs";

export default defineConfig({
  plugins: [react(), aiNativePlugin()],
  server: { port: 5175 },
});
