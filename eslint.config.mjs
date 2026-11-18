import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import stylistic from "@stylistic/eslint-plugin";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores([
    "dist",
    // TanStack Router が自動生成するファイル
    "src/routeTree.gen.ts",
    // typed-css-modules が自動生成するファイル
    "**/*.module.css.d.ts",
  ]),
  {
    files: ["**/*.{js,mjs,ts,mts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
      // セミコロン必須
      "@stylistic/semi": ["error", "always"],
      // 文字列はダブルクオート（中にダブルクオートを含む場合のみシングルクオート可）
      "@stylistic/quotes": ["error", "double", { avoidEscape: true }],
      "@stylistic/jsx-quotes": ["error", "prefer-double"],
    },
  },
  {
    // TanStack Router のルートファイルは `Route` を export する必要があるため、
    // 「コンポーネント以外を export しない」ルールの対象外にする
    files: ["src/routes/**/*.tsx"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
]);
