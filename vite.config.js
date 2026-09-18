import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@formspree/ajax": "@formspree/ajax/dist/index.mjs",
    },
  },
});
