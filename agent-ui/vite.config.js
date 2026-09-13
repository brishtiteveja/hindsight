import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Builds the agent island into web/agent/, which the existing FastAPI static
// mount already serves. React is bundled in — the host page stays a plain HTML
// document with no framework of its own.
export default defineConfig({
  plugins: [react()],
  // Relative, because the studio is served at / locally and /hindsight/ behind
  // nginx. Lazy chunks resolve against their own module URL under both.
  base: "./",
  resolve: {
    alias: [
      // KaTeX ships ~1.4MB of base64 woff2 in its stylesheet. Math still
      // renders, with system fonts, and the CSS drops from 1.5MB to ~100KB.
      { find: /^katex\/dist\/katex\.min\.css$/, replacement: "/src/empty.css" },
    ],
  },
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
  build: {
    lib: {
      entry: "src/main.jsx",
      // ES rather than IIFE: IIFE forces inlineDynamicImports, which pulls
      // every lazily-loaded shiki grammar and mermaid into one 17MB file.
      // <script type="module"> is still a single tag.
      formats: ["es"],
      fileName: () => "hs-agent.js",
      cssFileName: "hs-agent",
    },
    cssCodeSplit: false,
    minify: true,          // not "esbuild": Vite 8 moved to rolldown/oxc
    target: "es2020",
    outDir: "../web/agent",
    emptyOutDir: true,
  },
});
