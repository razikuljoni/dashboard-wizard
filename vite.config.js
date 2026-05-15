import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react()],

    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },

    build: {
        target: "esnext",
        sourcemap: false,
        chunkSizeWarningLimit: 1000,
        minify: "esbuild",

        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ["react", "react-dom", "react-router-dom"],
                    antd: ["antd"],
                    redux: ["@reduxjs/toolkit", "react-redux"],
                },
                entryFileNames: "assets/[name].[hash].js",
                chunkFileNames: "assets/[name].[hash].js",
                assetFileNames: "assets/[name].[hash].[ext]",
            },
        },
    },
});
