# ケアと、デジタル。

医療・介護・福祉に関わるセラピスト向けの、日本語のIT・ネットワーク・クラウド・情報セキュリティ基礎学習サイトです。

公開URL: https://security.hiluco.net/

## 内容

- 全12回。各回に仕組みの説明、図解、架空の現場事例、実践課題、解説付きの3択問題を3問。
- 全問正解で学習済み。ブラウザ内に解答・最新得点・最高得点・進捗を保存。
- 検索できる用語集、教材の印刷、進捗削除。
- スマートフォン対応、キーボード操作、縮小動作設定対応。
- 学習データのサーバー送信、ログイン、アクセス解析、外部フォントなし。

## 教材の出典と位置付け

参照された学習チャットはAPI上で本文が参照記号として返り、元の教材本文は取得できませんでした。元の学習目的と対象者をもとにWeb教材を新たに構成しています。第9〜12回の題名を引き継ぎ、第1〜8回の構成は再設計しました。元チャットの完全な転載ではありません。

参考資料へのリンクはサイト内の「この講座について」に掲載。IPAの基本対策と厚生労働省の医療情報システム安全管理の公式資料を案内しています。内容は一般的な入門学習であり、個別施設の安全管理規程や公式ガイドラインへの適合審査を代替しません。

## 開発・検証

Node.js 24推奨。

```sh
npm ci
npm run check
npx playwright install chromium
npm test
node scripts/preview.mjs
```

プレビュー: http://127.0.0.1:4173/

`npm run check` はJavaScriptの構文、12回分の必須教材、36問の正解・選択肢を検証して `dist/` を生成します。`npm test` は実ブラウザで320px/375px/1280pxの全教材表示、採点、進捗復元、検索、削除、保存不可時を検証します。画面キャプチャは `SCREENSHOT_DIR` を指定しない場合はテスト実行を省略します。

## 教材の編集

`public/lessons.json` に全教材を集約しています。タイトル・説明・図解の段階・事例・実践課題・用語・確認問題を編集した後、`npm run check` と `npm test` を実行してください。

## 公開

Cloudflare Workers Static Assetsを利用し、サーバー処理やデータベースはありません。

- アカウント: Embodied Eutopia
- Worker: therapist-security-learning
- カスタムドメイン: security.hiluco.net
- 設定: wrangler.jsonc

```sh
npx wrangler login
npx wrangler whoami
npm run check
npx wrangler deploy --dry-run
npm run deploy
```

公開前にアカウントと公開先の重複を確認してください。既存ドメインの置換を強制するオプションは使わず、衝突する場合は停止して調査します。ルートドメインのDNS/MX/TXTや他Workerを変更する操作は必要ありません。GitHub Actionsは検証だけを行い、Cloudflareへの自動公開は設定していません。秘密情報はコミットしないでください。

## 復旧

初回公開前に同名Workerや同名カスタムドメインはありません。更新後に問題があれば、Cloudflareの対象Workerのデプロイ履歴から直前の正常な版へ戻します。サイト削除時は対象のカスタムドメインとWorkerだけを削除し、ゾーン全体やメール関連レコードを削除しないでください。ブラウザ内進捗は、キー `care-digital-progress-v1` を維持する限り同一オリジンで引き継がれます。
