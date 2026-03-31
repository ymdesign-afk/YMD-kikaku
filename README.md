# YMデザイン企画 / YM Design & Co. — コーポレートサイト

> 想いをくみ取り、伝わる形に。
> Web制作・SNS運用サポート・企業コンサルティングまで。個人事業主・中小企業に寄り添うWebデザイン事務所のコーポレートサイトです。

**バージョン：v0.4**（2026-03-31 更新）

---

## 🗂 ファイル構成

```
/
├── index.html          # TOPページ（ファーストビュー〜CTAまで全セクション）
├── about.html          # ABOUT — 想い・プロフィール
├── service.html        # SERVICE — サービス一覧（4カテゴリ）
├── works.html          # WORKS — 制作実績（フィルタ付きグリッド）
├── flow.html           # FLOW — ご依頼の流れ（8ステップ）
├── faq.html            # FAQ — よくあるご質問（アコーディオン）
├── contact.html        # CONTACT — お問い合わせフォーム
├── privacy.html        # PRIVACY POLICY
├── vercel.json         # Vercel設定（cleanURL・キャッシュ・セキュリティヘッダー）
├── css/
│   └── style.css       # 全ページ共通スタイル（CSS変数・レスポンシブ対応）
├── js/
│   └── main.js         # 全機能JS（ハンバーガー・FAQ・スライダー・アニメ）
└── images/
    ├── hero-bg.mp4         ← ヒーロー背景動画
    ├── profile.jpg         ← 顔写真（about.html / index.html）差し替え用
    └── works/
        ├── works-01.jpg    ← 集客LP制作
        ├── works-02.jpg    ← 事業者向けHP
        ├── works-03.jpg    ← コーポレートサイト
        ├── works-04.jpg    ← SNS運用サポート
        ├── works-05.jpg    ← バナー制作
        └── works-06.jpg    ← チラシ・名刺制作
```

---

## ✅ v0.1 実装済み機能

| 機能 | 詳細 |
|------|------|
| レスポンシブ対応 | SP（480px〜）/ タブレット（768px〜）/ PC（1024px〜）完全対応 |
| ヒーロー背景動画 | `images/hero-bg.mp4` を autoplay/muted/loop/playsinline で表示、藍色オーバーレイ付き |
| ハンバーガーメニュー | スムーズなモバイルナビ（Escape・背景クリックで閉じる） |
| FAQアコーディオン | 全ページで動作 |
| Worksスライダー | TOPページ横スクロール＋ドット・矢印コントロール |
| Worksフィルター | WORKSページのカテゴリ絞り込みフィルター |
| スクロールアニメーション | IntersectionObserver による fade-up / fade-in |
| お問い合わせフォーム | クライアントバリデーション＋Formspree対応 |
| SVGラインアイコン | 絵文字を全廃・統一SVGアイコン化（各セクション） |
| モバイル改行制御 | `.pc-br` / `.sp-br` / `.sp-hide` クラスで改行を精密制御 |
| SEO基本設定 | title/meta description/OGP/canonical 全ページ設定済み |
| セキュリティヘッダー | vercel.json でX-Frame-Options等設定済み |
| クリーンURL | `/about` → `about.html` 等のリライト設定済み |

---

## 📄 v0.4 変更ログ（2026-03-31）

### 独自ドメイン公開
- `ymd-kikaku.net` でサイト公開完了
- お名前.comのネームサーバー設定を修正して反映
- GitHub Pages の CNAME ファイル設定済み

### 英字アニメーション（ambient-copy）3箇所固定化
- ambient-copy を2本→3本に増加（upper・middle・lower）
- JSで各セクション上部に正確にピン留め：
  - upper → `#services`（サービスセクション上部）
  - middle → `#works`（制作実績セクション上部）
  - lower → `#about-teaser`（Aboutセクション上部）
- どの画面サイズでも同じ位置に表示されるようリサイズ時も再計算
- アニメ方向：upper 左→右 / middle 右→左 / lower 左→右

---

## 📄 v0.3 変更ログ（2026-03-27）

### v0.3 変更内容
- **スマホ版 ambient-copy lower を `top: 52%` に変更**（サービスセクション頭付近に移動）
- **「営業コンサル」→「企業コンサル」に全ファイル統一**（index.html ヒーロー・フッター、service.html フッター）
- **FAQ「After Support（納品後のサポート）」セクションに上余白 `margin-top: 2.5rem` を追加**
- **各ファイルの修正適用状況を再確認**（全箇所正常適用済みを確認）

---

## 📄 v0.2 変更ログ（2026-03-27）

### SEO対応（全ページ）
- canonical URLを `ymdesign.example.com` → `ymd-kikaku.net` に更新
- title表記を「企業コンサル」に統一（「営業コンサル」を廃止）
- `og:url` を全ページに追加
- `og:image` を `https://ymd-kikaku.net/images/ogp.png` に設定
- Twitter Card（`summary_large_image`）を全ページに追加
- `og:site_name`・`og:locale` を全ページに追加
- JSON-LD ProfessionalService スキーマを index.html に追加
- ロゴ `alt` 属性を `"YMデザイン企画"` に全ページ設定
- `sitemap.xml` 作成（7ページ・優先度設定）
- `robots.txt` 作成（クロール許可・privacy.html noindex・sitemap パス設定）
- OGP画像 `images/ogp.png` 取得・配置

### デザイン・アニメーション
- ambient-copy（英字テキスト）の不透明度をスマホで増加（upper: 0.38、lower: 0.32）
- ambient-orb 4〜7番をスマホで表示（`display:none` → 個別サイズ・位置設定）
- ambient-copy lower の PC位置を `top: 27%`（悩み／サービス境界線上）に移動
- ambient-copy lower の PC/スマホのフォントサイズを拡大

### flow.htmlレイアウト
- 各ステップの border を削除
- アイコンをタイトル左横に横並び配置
- ナンバリングフォントサイズを拡大（元の2倍相当）
- CTA セクションの改行を削除（1行表示）

---

## 📄 v0.1 変更ログ（累積）

### コンテンツ・文言
- 全ページのサービス文言を統一：`Web制作・SNS運用サポート・企業コンサルティングまで。`
- ヒーローサブテキスト：「Web制作・SNS運用サポート・企業コンサルまで。お客様の想いに寄り添いながら、新しい未来の創造をサポートしていきます。」
- サービスカード「デザイン制作」説明文：`ブランドの雰囲気` → `ブランド雰囲気`（「の」削除・1行化）
- サービスカード3枚目：「Instagram運用サポート」→「SNS運用サポート」
- サービスカード4枚目：「販促・集客サポート」→「企業コンサル」
- service.html Instagram：「フォロワーを増やしてお客様につなげたい」→「フォロワーを増やして集客につなげたい」
- service.html 企業コンサル：「発信・広告・SEOなど何から取り組むべきか」→「〜悩んでいる」追記
- service.html LP制作カード：「（ランディングページ）」をPC表示で小文字補足表示・1行化
- service.html トップサブテキスト：改行位置調整（PC：「まで。」後で改行 / モバイル：1行固定）
- works.html 実績説明文：「業種や目的に合わせて、」→「業種や目的に合わせ、」
- works.html ポートフォリオセクション本文：「その他の制作実績は、ポートフォリオサイトからもご覧いただけます。」に統一・2文目を削除
- index.html サービスセクション見出し：`<br>` 削除して1行化
- index.html 制作実績リード：「業種や目的に合わせ、」に統一
- index.html フロー02番：「オンラインまたはメールなどでも対応いたします。」に変更
- index.html フロー04番：「随時」削除
- index.html お客様の声サブテキスト：`white-space: nowrap` でモバイル1行固定
- flow.html トップサブテキスト：「一緒に整理しながら、」→「一緒に整理しながら」（読点削除）
- flow.html 07番：「（ドメイン・サーバーの設定など）」を改行して独立表示
- flow.html 08番：「なんでもご相談ください。」に変更
- flow.html 04番見出し：`white-space: nowrap` でモバイル1行固定
- about.html プロフィール引用：`profile-quote p br` の非表示ルールを削除→PC・モバイルとも改行を復元
- about.html プロフィール引用：モバイルのみ `font-size: 0.88rem`・`line-height: 1.75`・`<br>` 非表示で自然折り返しに
- about.html Values「新しい未来を、一緒に楽しみながら」：モバイルのみ `font-size: 0.82rem` + `white-space: nowrap` で1行固定
- FAQから「ノーコードツール（STUDIOなど）」の項目を削除
- service.html・index.html から「ノーコード対応」記述を全削除
- flow.html CTA 見出しを改行なし1行に統一
- flow.html サブテキスト：モバイルで「まだ」を `.sp-hide` で非表示

### デザイン・レイアウト
- ヒーローセクションを Canvas アニメから動画背景に変更
- ヒーロー CTAボタン：スマホで中央揃え・幅 280px・gap 0.9rem
- ヒーロー SCROLL インジケーター：スマホで非表示
- 悩みカードを5枚→6枚（3×2グリッド）に拡張
- 悩みカード内：`align-items: center` でアイコン・テキストを上下中央揃え
- サービスカード4枚をPC横一列レイアウトに統一（Flexbox縦伸び）
- flow.html ナンバリング（01〜08）フォントサイズ拡大（1.45rem → 2rem）
- flow.html 各ステップのアイコンをタイトル横に横並び配置
- index.html 強みセクションのナンバリングを拡大（3.8rem → 5.5rem）
- works.html ポートフォリオボタン：モバイルで全幅・2行表示（外部サイト）小文字
- works.html ポートフォリオ見出しサイズ：`1.15rem → 1.35rem`・`font-weight: 700`・`letter-spacing: 0.08em`
- works.html ポートフォリオ見出しのメールアイコンを全レスポンシブで削除
- about.html プロフィールセクション：画像列 `380px → 240px`・gap `5rem → 2.5rem`（PC表示でテキスト幅を拡大）

### クリーンアップ
- 全ページの「お問い合わせはこちら」ボタン直下のメールアドレス表示を削除
- contact.html サイドバーカードの「📬」アイコン削除
- service.html の Instagram セクションタイトルの `<br>` 削除（1行化）
- 全ページのモバイル改行を精査・修正（`section-lead br` / `page-header__desc br` 等を CSS で制御）
- FAQの「After Support」セクション前の余白崩れを修正

---

## 🚀 デプロイ手順

**Publishタブ** からワンクリックでデプロイできます。

### Vercel CLI を使う場合
```bash
npm i -g vercel
vercel --prod
```

### GitHub連携（推奨）
1. GitHubリポジトリにpush
2. [vercel.com](https://vercel.com) で「Add New Project」→ リポジトリ選択
3. フレームワーク：**Other**（静的サイト）
4. 「Deploy」→ 完了

---

## 📧 お問い合わせフォームの設定

### Formspree（無料プランあり）
1. [formspree.io](https://formspree.io) でフォームIDを取得
2. `contact.html` の `action` を変更：
   ```html
   action="https://formspree.io/f/xabcdefg"
   ```

---

## 🖼 画像の差し替え

| ファイルパス | 推奨サイズ | 用途 |
|---|---|---|
| `images/profile.jpg` | 600×800px | プロフィール写真 |
| `images/works/works-01.jpg` | 800×500px | 集客LP制作 |
| `images/works/works-02.jpg` | 800×500px | 事業者向けHP |
| `images/works/works-03.jpg` | 800×500px | コーポレートサイト |
| `images/works/works-04.jpg` | 800×500px | SNS運用サポート |
| `images/hero-bg.mp4` | — | ヒーロー背景動画 |

---

## 🎨 カラー変数（css/style.css）

```css
--color-primary:       #1a3a5c   /* 藍色（深）— メインカラー */
--color-primary-mid:   #2a5298   /* 藍色（中） */
--color-primary-light: #4a7ab5   /* 藍色（淡） */
--color-primary-pale:  #d6e4f0   /* 藍色（極淡）— 背景・装飾 */
--color-off-white:     #f8f7f4   /* ベージュ寄りホワイト */
--color-gray-light:    #f0eeea   /* 淡いグレー */
--color-accent:        #c8915a   /* テラコッタ（控えめアクセント） */
```

---

## 📝 v0.4 以降の推奨作業

- [ ] Formspree によるメール送信設定
- [ ] Googleアナリティクス（GA4）設置
- [ ] Googleサーチコンソール登録・sitemap.xml 送信
- [ ] favicon.ico / apple-touch-icon 設置
- [ ] NEWS / BLOG ページの追加（将来的に）

---

## 📌 連絡先

- 事業者：YMデザイン企画 / 金沢 由紀
- メール：ymdesign.kikaku@gmail.com

---

&copy; 2025 YMデザイン企画 / YM Design & Co.
