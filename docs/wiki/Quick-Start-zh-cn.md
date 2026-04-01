# 快速开始

[English](Quick-Start-en) · [返回 Wiki 首页](Home)

## 环境要求

- Node.js `>= 22.12.0`
- npm `>= 10`

## 安装

```bash
git clone https://github.com/mufengyian/astro-newspaper.git your-blog-name
cd your-blog-name
npm install
```

## 环境变量

复制 [`.env.example`](../../../.env.example) 为 `.env`：

```bash
cp .env.example .env
```

```bash
PUBLIC_SITE_URL="https://your-domain.com"
PUBLIC_WALINE_SERVER_URL="https://your-waline-server.vercel.app"
```

## 本地开发

```bash
npm run dev
```

## 验证命令

```bash
npm run check
npm run build
```

## 首次替换入口

1. [`src/config/site.ts`](../../../src/config/site.ts)
2. [`src/utils/i18n.ts`](../../../src/utils/i18n.ts)
3. [`src/content/posts/`](../../../src/content/posts)
4. [`src/assets/covers/`](../../../src/assets/covers)
5. [`.env.example`](../../../.env.example)
