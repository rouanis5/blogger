import legacy from "@vitejs/plugin-legacy";
const { resolve } = require("path");
const { defineConfig } = require("vite");
const rootPath = "frontend";

module.exports = defineConfig({
  root: rootPath,
  build: {
    outDir: "../public",
    rollupOptions: {
      input: {
        index: resolve(__dirname, rootPath, "index.html"),
      },
    },
  },
  plugins: [
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
  ],
});
