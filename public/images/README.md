# レッスン専用の概念図

全12回に個別のSVG概念図を使用します。scripts/generate-lesson-diagrams.mjsで生成し、図のラベル・説明文をコードで管理します。本文・代替テキストでも内容を説明します。実機の構成図ではなく、仕組みを学ぶための簡略図です。

- 第1回：入力・処理・出力・記憶 — lesson-01-input-process-output.svg
- 第2回：CPU・RAM・SSDの役割 — lesson-02-cpu-ram-ssd.svg
- 第3回：アプリ・OS・ドライバー・機器 — lesson-03-app-os-hardware.svg
- 第4回：施設内LANから外部サービスへ — lesson-04-network-topology.svg
- 第5回：URL・DNS・HTTPS・ページ表示 — lesson-05-browser-dns-server.svg
- 第6回：画面・API・サーバー・DB — lesson-06-api-backend-database.svg
- 第7回：端末の権限・本人の同意・業務の権限 — lesson-07-permissions-consent.svg
- 第8回：クラウド・同期・バックアップ — lesson-08-cloud-sync-backup.svg
- 第9回：機密性・完全性・可用性 — lesson-09-cia-triad.svg
- 第10回：偽メールから偽サイトへの誘導 — lesson-10-phishing-path.svg
- 第11回：認証・更新・監視・復旧の多層防御 — lesson-11-layered-defence.svg
- 第12回：記録が開かない時の切り分け — lesson-12-troubleshooting-map.svg

# 既存の場面イラスト（トップページ等）

レッスンでは以下の汎用画像を使用せず、上の専用概念図へ置き換えました。トップページはhospital-workspace.jpgを使用します。旧画像は既存参照のため保持しています。

# 学習用の場面イラスト

生成：組み込みの image_gen.imagegen。3点とも新規生成。実在する人物・患者・施設の写真ではありません。教材では「学習用の架空場面・AI生成イラスト」と明記します。

配信用ファイルはJPEG形式・1200×800。元のPNGから配信用の形式・サイズへ変換し、画像内容の修正はしていません。

| ファイル | 場面 | 教材で注目すること |
|---|---|---|
| hospital-workspace.jpg | 病院の記録・共有 | 端末、入力、画面、保存、印刷、職員同士の確認 |
| home-visit.jpg | 訪問先のタブレット利用 | 業務端末、写真・記録の保存先、通信・同期、同意 |
| care-handover.jpg | 施設の多職種申し送り | 紙と電子記録、情報の正確さ、連携、障害時の代替手順 |

## 最終プロンプト

### hospital-workspace.jpg

Use case: illustration-story. Asset type: a wide 3:2 educational scene illustration for a Japanese IT-security learning website for healthcare and care workers. A fictional Japanese rehabilitation documentation workspace: two adult clinicians in plain sage and cream scrubs sit at a tidy desk, one points to a desktop screen showing only abstract empty form blocks, the other holds a blank paper clipboard. Clearly show keyboard, small desktop computer tower, monitor, printer, a desk surface and a closed filing cabinet. Modern friendly editorial illustration, soft paper texture, calm dark teal, sage green, warm ivory, restrained muted orange. Accurate plausible everyday objects, human hands and faces, no treatment or medical procedure. Composition wide, readable at mobile size, objects large, uncluttered. The purpose is to connect input, processing, saving and interprofessional handover to visible real objects. No text, no letters, no logos, no medical records, no readable data, no watermark. This is clearly an illustration, not a documentary photo.

### home-visit.jpg

Use case: illustration-story. Asset type: wide 3:2 educational scene illustration for a Japanese healthcare IT and security course. A fictional adult Japanese home-visit therapist in sage green plain scrubs, seated at a small tidy table in a modest bright living room, thoughtfully holding a tablet with only a simple abstract blank form, an older adult in everyday clothing seated comfortably across the table, and a zipped professional shoulder bag beside the therapist. An ordinary smartphone lies face down on the table beside a closed plain paper folder, no camera in use. Calm respectful everyday conversation, not treatment. Large clearly distinguishable tablet, phone, bag and people, uncrowded composition suitable for mobile. Warm ivory, dark teal, sage green, muted terracotta, soft textured editorial illustration matching a calm education website. No text, no logos, no identifying information, no actual medical records, no watermark, accurate plausible hands and devices. This is an illustration of a fictional case, not a real patient photo. The learning purpose is to discuss which device is for work and where visit records are saved and synced.

### care-handover.jpg

Use case: illustration-story. Asset type: wide 3:2 educational scene illustration for a Japanese care-worker IT security course. A fictional Japanese care-facility staff room during a shift handover. Three adult staff members in plain sage, ivory and muted blue uniforms, mixed genders and ages, calmly discussing the next action. One holds a closed blank clipboard, one points to a desktop monitor that shows a simple large neutral abstract grey panel with no data, and another has a tablet placed face down. A neat desk and a closed storage cabinet, no residents or clinical procedures. Soft paper-texture editorial illustration, warm natural lighting, dark teal and sage green with cream and muted orange accents, clear large objects and humane expressions, uncluttered wide 3:2 composition, readable on a phone. No lettering, no logos, no names, no patient data, no watermark. The learning purpose is team handover and using an approved paper workflow while an IT system is unavailable, not a dramatic cyberattack scene. Clearly an educational illustration.
