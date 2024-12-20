# Docusaurus Website Guide

本網站是使用 [Docusaurus](https://docusaurus.io/) 建立的現代靜態網站生成器。

## 目錄
1. [安裝](#安裝)
2. [專案架構](#專案架構)
3. [本地開發](#本地開發)
4. [網站建置](#網站建置)
5. [版本更新](#版本更新)
6. [Monorepos 支援](#monorepos-支援)

---

## 安裝

Docusaurus 由一組 npm 套件組成。

### 快速了解 Docusaurus
- 可以使用 **[docusaurus.new](https://docusaurus.new)** 在瀏覽器中立即測試 Docusaurus。
- 想快速瞭解 Docusaurus，請參考 **Fast Track**！

### 系統需求
- Node.js 版本 **18.0 或以上**（可透過 `node -v` 檢查）。
- 安裝 Node.js 時，建議勾選所有相關相依項目。
- 可以使用 `nvm` 管理多個 Node 版本。

### 建立專案網站
建議使用命令列工具快速生成 Docusaurus 網站：

```bash
npx create-docusaurus@latest my-website classic
```

- 建議使用 `classic` 模板，它包含 Docusaurus 1 的功能，如文件、部落格、自訂頁面及 CSS 框架（支援深色模式）。
- 可以使用 TypeScript 變體：

  ```bash
  npx create-docusaurus@latest my-website classic --typescript
  ```

- 如果您是為 **Meta 開源項目** 設置 Docusaurus 網站，請使用：

  ```bash
  scarf static-docs-bootstrap
  ```

### 其他安裝指令
檢查可用的選項與旗標：

```bash
npx create-docusaurus@latest --help
```

---

## 專案架構

假設使用 `classic` 模板建立專案 `my-website`，您會看到以下目錄結構：

```
my-website
├── blog
│   ├── 2019-05-28-hola.md
│   ├── 2019-05-29-hello-world.md
│   └── 2020-05-30-welcome.md
├── docs
│   ├── doc1.md
│   ├── doc2.md
│   ├── doc3.md
│   └── mdx.md
├── src
│   ├── css
│   │   └── custom.css
│   └── pages
│       ├── styles.module.css
│       └── index.js
├── static
│   └── img
├── docusaurus.config.js
├── package.json
├── README.md
├── sidebars.js
└── yarn.lock
```

### 專案目錄介紹
- `/blog/` - 部落格文章，若停用部落格插件可刪除該目錄。
- `/docs/` - 文件頁面，側邊欄順序可在 `sidebars.js` 中設定。
- `/src/` - 非文件相關的檔案，例如自訂 React 元件。
- `/src/pages/` - 任何 JSX/TSX/MDX 檔案將自動轉為網站頁面。
- `/static/` - 靜態檔案目錄，內容將複製到最終的建置目錄中。
- `docusaurus.config.js` - 網站設定檔。
- `package.json` - Docusaurus 網站是 React 應用程式，可自由安裝 npm 套件。
- `sidebars.js` - 用於文件的側邊欄順序設定。

---

## 本地開發

要預覽編輯內容，可以啟動本地開發伺服器：

```bash
cd my-website
npm run start
```

- 預設瀏覽器將開啟 http://localhost:3000。

---

## 網站建置

Docusaurus 是現代的靜態網站生成器，因此需要將網站建置成靜態檔案，並部署到伺服器上。

```bash
npm run build
```

建置後的檔案將生成在 `/build` 目錄中，可以上傳到 GitHub Pages、Vercel 或 Netlify 等靜態檔案託管服務。

---

## 版本更新

更新 Docusaurus 的多種方式之一是手動修改 `package.json` 中的版本號：

```json
{
  "dependencies": {
    "@docusaurus/core": "3.6.0",
    "@docusaurus/preset-classic": "3.6.0"
  }
}
```

然後執行安裝命令：

```bash
npm install
```

檢查更新是否成功：

```bash
npx docusaurus --version
```

或使用 Yarn 更新：

```bash
yarn add @docusaurus/core @docusaurus/preset-classic
```

> **提示**：`npm install` 可能會報告漏洞，可使用 `npm audit` 查看，但這些通常是無害的漏洞，可以忽略。

---

## Monorepos 支援

Docusaurus 支援 **Monorepos**，適合多專案共享相依套件。以下是一個範例結構：

```
my-monorepo
├── package-a
│   ├── src
│   └── package.json
├── website
│   ├── docs
│   ├── src
│   └── package.json
├── package.json
```

### 注意事項
- 使用 Vercel 或 Netlify 等服務時，需設定 **Base directory** 為 Docusaurus 根目錄，例如 `./website`。

### 更多資源
- [Yarn Monorepo](https://yarnpkg.com/features/workspaces)
- [Docusaurus 官方文件](https://docusaurus.io/docs)

---

希望這份指南能幫助您順利建立並管理您的 Docusaurus 網站！ 🎉# Docusaurus Website Guide

本網站是使用 [Docusaurus](https://docusaurus.io/) 建立的現代靜態網站生成器。

## 目錄
1. [安裝](#安裝)
2. [專案架構](#專案架構)
3. [本地開發](#本地開發)
4. [網站建置](#網站建置)
5. [版本更新](#版本更新)
6. [Monorepos 支援](#monorepos-支援)

---

## 安裝

Docusaurus 由一組 npm 套件組成。

### 快速了解 Docusaurus
- 可以使用 **[docusaurus.new](https://docusaurus.new)** 在瀏覽器中立即測試 Docusaurus。
- 想快速瞭解 Docusaurus，請參考 **Fast Track**！

### 系統需求
- Node.js 版本 **18.0 或以上**（可透過 `node -v` 檢查）。
- 安裝 Node.js 時，建議勾選所有相關相依項目。
- 可以使用 `nvm` 管理多個 Node 版本。

### 建立專案網站
建議使用命令列工具快速生成 Docusaurus 網站：

```bash
npx create-docusaurus@latest my-website classic
```

- 建議使用 `classic` 模板，它包含 Docusaurus 1 的功能，如文件、部落格、自訂頁面及 CSS 框架（支援深色模式）。
- 可以使用 TypeScript 變體：

  ```bash
  npx create-docusaurus@latest my-website classic --typescript
  ```

- 如果您是為 **Meta 開源項目** 設置 Docusaurus 網站，請使用：

  ```bash
  scarf static-docs-bootstrap
  ```

### 其他安裝指令
檢查可用的選項與旗標：

```bash
npx create-docusaurus@latest --help
```

---

## 專案架構

假設使用 `classic` 模板建立專案 `my-website`，您會看到以下目錄結構：

```
my-website
├── blog
│   ├── 2019-05-28-hola.md
│   ├── 2019-05-29-hello-world.md
│   └── 2020-05-30-welcome.md
├── docs
│   ├── doc1.md
│   ├── doc2.md
│   ├── doc3.md
│   └── mdx.md
├── src
│   ├── css
│   │   └── custom.css
│   └── pages
│       ├── styles.module.css
│       └── index.js
├── static
│   └── img
├── docusaurus.config.js
├── package.json
├── README.md
├── sidebars.js
└── yarn.lock
```

### 專案目錄介紹
- `/blog/` - 部落格文章，若停用部落格插件可刪除該目錄。
- `/docs/` - 文件頁面，側邊欄順序可在 `sidebars.js` 中設定。
- `/src/` - 非文件相關的檔案，例如自訂 React 元件。
- `/src/pages/` - 任何 JSX/TSX/MDX 檔案將自動轉為網站頁面。
- `/static/` - 靜態檔案目錄，內容將複製到最終的建置目錄中。
- `docusaurus.config.js` - 網站設定檔。
- `package.json` - Docusaurus 網站是 React 應用程式，可自由安裝 npm 套件。
- `sidebars.js` - 用於文件的側邊欄順序設定。

---

## 本地開發

要預覽編輯內容，可以啟動本地開發伺服器：

```bash
cd my-website
npm run start
```

- 預設瀏覽器將開啟 http://localhost:3000。

---

## 網站建置

Docusaurus 是現代的靜態網站生成器，因此需要將網站建置成靜態檔案，並部署到伺服器上。

```bash
npm run build
```

建置後的檔案將生成在 `/build` 目錄中，可以上傳到 GitHub Pages、Vercel 或 Netlify 等靜態檔案託管服務。

---

## 版本更新

更新 Docusaurus 的多種方式之一是手動修改 `package.json` 中的版本號：

```json
{
  "dependencies": {
    "@docusaurus/core": "3.6.0",
    "@docusaurus/preset-classic": "3.6.0"
  }
}
```

然後執行安裝命令：

```bash
npm install
```

檢查更新是否成功：

```bash
npx docusaurus --version
```

或使用 Yarn 更新：

```bash
yarn add @docusaurus/core @docusaurus/preset-classic
```

> **提示**：`npm install` 可能會報告漏洞，可使用 `npm audit` 查看，但這些通常是無害的漏洞，可以忽略。

---

## Monorepos 支援

Docusaurus 支援 **Monorepos**，適合多專案共享相依套件。以下是一個範例結構：

```
my-monorepo
├── package-a
│   ├── src
│   └── package.json
├── website
│   ├── docs
│   ├── src
│   └── package.json
├── package.json
```

### 注意事項
- 使用 Vercel 或 Netlify 等服務時，需設定 **Base directory** 為 Docusaurus 根目錄，例如 `./website`。

### 更多資源
- [Yarn Monorepo](https://yarnpkg.com/features/workspaces)
- [Docusaurus 官方文件](https://docusaurus.io/docs)

---

希望這份指南能幫助您順利建立並管理您的 Docusaurus 網站！ 🎉
