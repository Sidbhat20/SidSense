import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  publicDir: "public",
  base: "./",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about.html"),
        work: resolve(__dirname, "work.html"),
        project: resolve(__dirname, "project.html"),
        contact: resolve(__dirname, "contact.html"),
      },
    },
    assetsInclude: [
      "**/*.jpeg",
      "**/*.jpg",
      "**/*.png",
      "**/*.svg",
      "**/*.gif",
    ],
    copyPublicDir: true,
    cssCodeSplit: true,
    minify: 'esbuild',
  },
  server: {
    middleware: true,
    hmr: {
      overlay: true,
    },
  },
  optimizeDeps: {
    include: ['gsap', 'lenis'],
  },
});
