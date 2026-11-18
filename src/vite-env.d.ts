/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** GitHub GraphQL API のトークン（コントリビューション取得用） */
  readonly VITE_GITHUB_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
