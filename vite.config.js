import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { imagetools } from "vite-imagetools";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Images imported with a query (e.g. ?w=400;800&format=avif;webp;jpg&as=picture)
    // are resized and re-encoded at build time.
    imagetools({
      defaultDirectives: () => new URLSearchParams({ quality: "72" }),
    }),
  ],
  // Keep CRA's output folder so the existing Render publish directory still works.
  build: { outDir: "build", assetsInlineLimit: 0 },
});
