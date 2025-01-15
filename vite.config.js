import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss, { postcss } from "tailwindcss"
// import { plugins } from "./tailwind.config";

export default defineConfig ({
  plugins:[react()],
  css: {
    postcss:{
      plugins:[tailwindcss()],
    },
  },
});
