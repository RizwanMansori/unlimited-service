import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // Service Worker auto update
      includeAssets: ["favicon.svg", "robots.txt", "icon-192.png", "icon-512.png"],
      manifest: {
        name: "Unlimited Service",
        short_name: "UService",
        start_url: "/",
        display: "standalone",
        background_color: "#111827",
        theme_color: "#4F46E5",
        description: "Sabhi Services Ek Jagah",
        icons: [
          { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icon-512.png", sizes: "512x512", type: "image/png" }
        ]
      }
    })
  ]
});