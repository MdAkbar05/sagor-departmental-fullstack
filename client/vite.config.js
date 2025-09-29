// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      // Disable the experimental oxc parser
      babel: {
        parserOpts: {
          plugins: ["jsx"], // Ensure JSX is enabled
        },
      },
    }),
  ],
  // Alternatively, completely disable experimental features
  experimental: {
    disableOxc: true,
  },
});
