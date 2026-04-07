import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;

          if (
            id.includes("@react-three") ||
            id.includes("three") ||
            id.includes("postprocessing")
          ) {
            return "three-vendor";
          }

          if (id.includes("gsap")) {
            return "motion-vendor";
          }

          if (id.includes("@emailjs")) {
            return "email-vendor";
          }

          if (id.includes("react")) {
            return "react-vendor";
          }

          return "vendor";
        },
      },
    },
  },
});
