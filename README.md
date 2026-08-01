# matsu-front

`matsu-front` は、matsu のブラウザ向けフロントエンドです。React、TypeScript、Vite で構成し、画面表示、ユーザー操作、画面内の一時的な状態、BFFから取得したデータの表示を担当します。

ブラウザからのAPI通信は `matsu-bff` だけを経由します。各resource serverやAuth Serverを直接呼び出しません。access tokenとrefresh tokenはBFFが管理し、ブラウザの `localStorage` や `sessionStorage` には保存しません。

## 必要な環境

- Node.js 22
- npm
- Docker Desktop（Dockerで起動する場合）
- ローカルで起動した `matsu-bff`

ワークスペース全体の準備と起動方法は、親リポジトリの `README.md` と `DEVELOPMENT.md` を参照してください。

## セットアップ

リポジトリのルートで依存関係をインストールします。

```bash
npm install
```

Windows PowerShellで実行ポリシーにより `npm.ps1` が拒否される場合は、`npm` の代わりに `npm.cmd` を使用してください。

## 起動と停止

### Node.jsで起動する

```bash
npm run dev
```

開発サーバーは通常、`http://localhost:5173` で起動します。停止するには、実行中のターミナルで `Ctrl+C` を押します。

### Dockerで起動する

```bash
docker compose up --build front
```

ソースコードはコンテナへbind mountされ、Viteのhot reloadが有効になります。停止後にコンテナを削除する場合は、次を実行します。

```bash
docker compose down
```

このCompose構成はローカル開発専用です。

## BFFの設定

BFFの既定URLは `http://localhost:18082` です。別のURLを使用する場合は、`.env.local` に次を設定します。

```dotenv
VITE_BFF_BASE_URL=http://localhost:18082
```

`.env.local` はGit管理の対象外です。Docker起動時は `docker-compose.yml` の `VITE_BFF_BASE_URL` が使用されます。

API clientはBFFのsession Cookieを送信します。認証処理を変更する場合も、ブラウザでtokenを保持したり、BFFを迂回する通信を追加したりしないでください。

## 基本的な開発フロー

1. `develop` の最新状態から作業branchを作成します。
2. `npm install` で依存関係を同期します。
3. `npm run dev` またはDockerで開発サーバーを起動します。
4. 変更後に `npm run check` と `npm run build` を実行します。
5. BFFのrouteやschemaに追従した場合は、OpenAPI型を再生成して差分を含めます。
6. `develop` 向けのPull Requestを作成します。

## 主なスクリプト

| コマンド                   | 用途                                                 |
| -------------------------- | ---------------------------------------------------- |
| `npm run dev`              | Vite開発サーバーを起動する                           |
| `npm run build`            | TypeScriptのbuild確認後、production bundleを生成する |
| `npm run preview`          | 生成したproduction buildをローカルで確認する         |
| `npm run lint`             | ESLintをwarningなしで実行する                        |
| `npm run lint:fix`         | ESLintで修正可能な問題を修正する                     |
| `npm run typecheck`        | ファイルを出力せずTypeScriptを検査する               |
| `npm run format`           | Prettierでファイルを整形する                         |
| `npm run format:check`     | Prettierの差分がないことを確認する                   |
| `npm run check`            | lint、typecheck、format checkをまとめて実行する      |
| `npm run fix`              | lintの自動修正とformatを実行する                     |
| `npm run openapi:generate` | BFF OpenAPIからFrontendのAPI型を生成する             |
| `npm run openapi:check`    | API型を再生成し、未反映の差分がないことを確認する    |

Docker内で品質チェックを実行する場合は、次を使用します。

```bash
docker compose run --rm front npm run check
docker compose run --rm front npm run build
```

## BFF OpenAPI型の更新

BFFの登録済みrouteとschemaから生成される `matsu-bff/openapi/openapi.json` が、Frontend API型の入力です。BFF契約を変更した場合は、ワークスペースの `apps` 配下で両リポジトリが隣接している状態で次を実行します。

```bash
cd ../matsu-bff
npm run openapi:generate

cd ../matsu-front
npm run openapi:generate
```

生成先は `src/api/generated/schema.d.ts` です。生成ファイルは手作業で編集しません。`npm run openapi:check` は、再生成後に未反映の差分が生じないことを検査する場合に使用します。`matsu-front` を単独でcloneした場合も既存の生成ファイルでbuildできますが、再生成には `matsu-bff` を同じ親ディレクトリへ配置する必要があります。

## CIと最小運用

`develop` または `main` 向けのPull Requestでは、GitHub ActionsがNode.js 22で次を実行します。

```bash
npm ci
npm run check
npm run build
```

Pull Requestを作成する前にも、同じ品質ゲートをローカルで実行してください。依存関係を更新した場合は `package.json` と `package-lock.json` を同じ変更に含めます。

## 関連する設計資料

- [Frontendの責務と境界](https://github.com/shu-matsukubo/matsu-docs/blob/main/docs/components/frontend.md)
- [API契約の管理方針](https://github.com/shu-matsukubo/matsu-docs/blob/main/docs/architecture/api-contracts.md)
- [認証とセッション](https://github.com/shu-matsukubo/matsu-docs/blob/main/docs/architecture/authentication.md)
