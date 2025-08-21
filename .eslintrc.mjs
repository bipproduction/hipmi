import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const config = compat.extends("next/core-web-vitals", "next/typescript");
console.log(config); // Cek output di terminal

export default Array.isArray(config) ? config : [config];
