import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./", // Simplifié pour Vercel
  optimizeDeps: {
    entries: ["src/main.tsx"],
  },
  plugins: [
    react(),
  ],
  build: {
    outDir: "build", // Change vers 'build' pour correspondre à vercel.json
    sourcemap: false, // Désactive les sourcemaps pour réduire la taille
    rollupOptions: {
      output: {
        manualChunks: undefined, // Simplifie le chunking
      },
    },
  },
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    allowedHosts: true,
  }
});