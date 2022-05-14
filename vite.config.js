const { resolve } = require("path");
const { defineConfig } = require("vite");
const rootPath = "frontend/pages";

module.exports = defineConfig({
  root: "frontend/pages",
  build: {
    outDir: "../public",
    rollupOptions: {
      input: {
        index: resolve(__dirname, rootPath, "index.html"),
      },
    },
  },
});
