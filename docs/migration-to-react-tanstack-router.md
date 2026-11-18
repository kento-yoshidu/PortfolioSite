# Next.js → React + Vite + TanStack Router 移行計画

## 目的

このサイトは Next.js 固有の機能（SSR/SSG、`next/image`、`next/font` など）をほとんど使っていない。
フレームワークの重さに見合わないため、Vite + React + TanStack Router の SPA 構成に置き換える。

## 現状の Next.js 依存箇所

| ファイル | 使用している機能 | 移行後の対応 |
|---|---|---|
| `pages/components/Header.tsx` | `next/link`（`href="#sec1"` のページ内アンカー） | 通常の `<a href="#sec1">` で十分 |
| `pages/components/LinkButton.tsx` | `next/link`（`path="summary#sample"` 等） | TanStack Router `<Link to="/summary" hash="sample">`。props を `to` / `hash` に分ける |
| `pages/summary.tsx` | `next/link`（`href="/"`）, `next/head` | `<Link to="/">`、ルートの `head` オプション |
| `pages/index.tsx` | `next/head`（`<title>`） | ルートの `head` オプション |
| `pages/_app.tsx` | `AppProps`、`ApolloProvider`、`global.css` の import | `src/main.tsx` と `src/routes/__root.tsx` に移す |
| `pages/_document.tsx` | `<Html lang="ja">` のみ | `index.html` に記述 |
| `pages/api/ac.ts` | API Routes（`NextApiRequest`）, `process.env.ATCODER_PROBLEMS_API` | **要判断**（下記「未決事項」参照） |
| `apollo-client.ts` | `process.env.NEXT_PUBLIC_GITHUB_API` | `import.meta.env.VITE_GITHUB_API` |
| `next.config.js` | `reactStrictMode` のみ | 削除（`<StrictMode>` で代替） |
| `next-env.d.ts` | Next.js 型定義 | 削除し `src/vite-env.d.ts` を追加 |
| `.eslintrc.json` | `next/core-web-vitals` | Flat Config で `typescript-eslint` + `eslint-plugin-react-hooks` 等に置き換え |
| `amplify.yml` | `baseDirectory: .next` | `baseDirectory: dist` |

`getStaticProps` / `getServerSideProps` / `next/image` / `next/font` は未使用。
GitHub コントリビューションは既にブラウザから直接 GraphQL API を叩いているため、データ取得の構造は変わらない。

## 移行後のディレクトリ構成（案）

```
index.html
vite.config.ts
src/
  main.tsx                 # createRouter / RouterProvider / ApolloProvider / StrictMode
  routeTree.gen.ts         # TanStack Router プラグインが自動生成
  vite-env.d.ts
  routes/
    __root.tsx             # <HeadContent />, <Outlet />
    index.tsx              # 旧 pages/index.tsx
    summary.tsx            # 旧 pages/summary.tsx
  components/              # 旧 pages/components/
  styles/                  # 旧 pages/styles/（*.module.css と .d.ts）
  css/                     # 旧 pages/css/（global.css, reset.css）
  lib/                     # 旧 lib/
  apollo-client.ts
public/
```

`pages/` は Next.js 固有の命名なので廃止し、`src/` 配下に集約する。

## 手順

### 0. 事前準備

- 未コミットの `pages/index.tsx` の変更をコミットまたは退避する
- 作業ブランチを `develop` から切る（例: `feature/vite-tanstack-router`）

### 1. Vite + TanStack Router の導入

- 追加: `vite`, `@vitejs/plugin-react`, `@tanstack/react-router`, `@tanstack/router-plugin`
- 任意: `@tanstack/react-router-devtools`
- `vite.config.ts` に `tanstackRouter({ target: "react", autoCodeSplitting: true })` と `react()` を設定（プラグイン順序は TanStack Router を先に）
- `index.html` を作成（`<html lang="ja">`、favicon、共通の OGP メタタグ）
- `package.json` の scripts を変更
  - `dev`: `vite`
  - `build`: `tsc -b && vite build`
  - `preview`: `vite preview`
  - `lint`: `eslint .`
- `tsconfig.json` を Vite 向けに更新（`moduleResolution: "bundler"`、`jsx: "react-jsx"`、`types: ["vite/client"]`、`include: ["src"]`）

### 2. ファイル移動とルート作成

- `pages/components/*` → `src/components/`
- `pages/styles/*` → `src/styles/`
- `pages/css/*` → `src/css/`
- `lib/*` → `src/lib/`
- `apollo-client.ts` → `src/apollo-client.ts`
- `src/routes/__root.tsx`: `global.css` の import、`<HeadContent />`、`<Outlet />`
- `src/routes/index.tsx`: `createFileRoute("/")` で旧 `pages/index.tsx` の中身を移植。`head: () => ({ meta: [{ title: "Kento Yoshizu Portfolio Site" }] })`
- `src/routes/summary.tsx`: `createFileRoute("/summary")` で旧 `pages/summary.tsx` を移植
- `src/main.tsx`: `ApolloProvider` で `RouterProvider` を包む
- import パスを全面修正（`../styles/...` など）

### 3. Next.js API の置き換え

- `next/link` → `@tanstack/react-router` の `Link`（Header はプレーンな `<a>`）
- `LinkButton` の props を `path: "summary#sample"` から `to: "/summary"`, `hash: "sample"` に変更し、`index.tsx` の 3 箇所の呼び出しを修正
- ハッシュ遷移時のスクロールを確認。必要なら `createRouter` の `scrollRestoration` やハッシュスクロール設定を調整
- `next/head` → ルートの `head` オプション
- 環境変数のリネーム: `NEXT_PUBLIC_GITHUB_API` → `VITE_GITHUB_API`（`.env.local` と Amplify の環境変数の両方）

### 4. `pages/api/ac.ts` の扱い

「未決事項」の結論に従う。

### 5. Storybook

- 削除済み（2026-11-17）。対応不要

### 6. ESLint

- `eslint-config-next` を外す
- Flat Config（`eslint.config.js`）で `@eslint/js`、`typescript-eslint`、`eslint-plugin-react-hooks`、`eslint-plugin-react-refresh` を設定
- **セミコロン必須**にする
  - ESLint 本体の `semi` ルールは v8.53 で非推奨になっているため、`@stylistic/eslint-plugin` を使う
  - `"@stylistic/semi": ["error", "always"]`
  - 型定義のメンバー区切りもそろえるなら `"@stylistic/member-delimiter-style": "error"`（`type Props = { a: string; b: number; }` の形）
  - 設定例:

    ```js
    // eslint.config.js
    import js from "@eslint/js";
    import tseslint from "typescript-eslint";
    import reactHooks from "eslint-plugin-react-hooks";
    import reactRefresh from "eslint-plugin-react-refresh";
    import stylistic from "@stylistic/eslint-plugin";

    export default tseslint.config(
      { ignores: ["dist", "src/routeTree.gen.ts", "**/*.module.css.d.ts"] },
      js.configs.recommended,
      ...tseslint.configs.recommended,
      {
        files: ["**/*.{ts,tsx}"],
        plugins: {
          "react-hooks": reactHooks,
          "react-refresh": reactRefresh,
          "@stylistic": stylistic,
        },
        rules: {
          ...reactHooks.configs.recommended.rules,
          "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
          "@stylistic/semi": ["error", "always"],
          "@stylistic/member-delimiter-style": "error",
        },
      },
    );
    ```

- 既存コードはほぼ全ファイルがセミコロンなし（セミコロンありは `pages/api/ac.ts` のみ）。導入直後に `npx eslint . --fix` で一括修正する
  - 差分が大きくなるので、**ファイル移動や機能変更とは別コミット**にする（レビューと `git blame` を追いやすくするため）
  - 一括修正のコミットは `.git-blame-ignore-revs` に登録しておくとよい
- 生成ファイル（`routeTree.gen.ts`、`*.module.css.d.ts`）は lint 対象から外す
- 任意: VS Code の `.vscode/settings.json` に `"editor.codeActionsOnSave": { "source.fixAll.eslint": "explicit" }` を入れて保存時に自動修正

### 7. デプロイ設定（Amplify）

- `amplify.yml` の `baseDirectory` を `dist` に変更
- Amplify コンソールで SPA 用のリライトを追加
  - source: `</^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json|webp)$)([^.]+$)/>`
  - target: `/index.html`
  - type: `200 (Rewrite)`
- Amplify 側の環境変数をリネーム
- アプリのプラットフォームが「Web Compute (SSR)」になっている場合は「Web (静的)」に変更する

### 8. 後片付け

- 削除: `next`, `eslint-config-next`, `next.config.js`, `next-env.d.ts`, `pages/`, `.next/`
- 未使用依存の整理（コード中で参照なし）: `styled-components`, `@types/styled-components`, `graphiql`, `@graphiql/toolkit`
- `public/vercel.svg` が未使用なら削除
- `.gitignore` に `dist` を追加、`.next` を削除
- `CLAUDE.md` / `README.md` のコマンド・構成・環境変数の記述を更新
- CI（`.github/workflows/build.yml`）が `npm run build` で通ることを確認

## 動作確認チェックリスト

- [ ] `npm run dev` でトップと `/summary` が表示される
- [ ] `/summary` に直接アクセス／リロードしても 404 にならない（ローカルは `vite preview`、本番は Amplify）
- [ ] トップの「more」ボタンから `/summary#sample` / `#apps` / `#task` の各セクションへスクロールする
- [ ] `/summary` の「← Home」でトップへ戻れる
- [ ] Header の `#sec1` リンクが動く
- [ ] スクロールで `.inter` / `.card` の表示アニメーションが発火する（`IntersectionObserver` が `useEffect` で正しく登録されること。ルート遷移後に再登録されるかも確認）
- [ ] GitHub コントリビューションが取得・表示される
- [ ] 各ページの `<title>` が正しい
- [ ] `npm run build` / `npm run lint` が通る
- [ ] セミコロンを抜いた行で `npm run lint` がエラーになる（ルールが効いていることの確認）
- [ ] Amplify のプレビューデプロイで上記を確認

## 未決事項

1. **`pages/api/ac.ts`（AtCoder API プロキシ）の扱い**
   呼び出し元の `ac.tsx` は現在リポジトリに存在せず、機能自体も「工事中」。
   - A. いったん削除する（推奨。必要になったら再検討）
   - B. Amplify Functions / AWS Lambda などに切り出す
   - C. ブラウザから AtCoder Problems API を直接呼ぶ（CORS とレート制限の確認が必要）
2. **SEO / OGP**
   SPA になるため、クローラーからはページごとのメタ情報が見えにくくなる。
   `index.html` に共通の OGP を置くだけで十分か、ビルド時プリレンダリング（例: `vite-plugin-prerender` 系や TanStack Start の静的出力）が必要かを判断する。
3. **GitHub トークンの露出**
   移行前と同じく、`VITE_GITHUB_API` はクライアントバンドルに埋め込まれる。現状維持でよいか（read-only スコープの PAT に限定されているか）を確認する。

## 参考

- TanStack Router: https://tanstack.com/router/latest/docs/framework/react/quick-start
- Vite 環境変数: https://vite.dev/guide/env-and-mode
