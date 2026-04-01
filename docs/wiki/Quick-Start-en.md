# Quick Start

[简体中文](Quick-Start-zh-cn) · [Back to Wiki Home](Home-en)

## Requirements

- Node.js `>= 22.12.0`
- npm `>= 10`

## Install

```bash
git clone https://github.com/mufengyian/astro-newspaper.git your-blog-name
cd your-blog-name
npm install
```

## Environment Variables

Copy [`.env.example`](../../../.env.example) to `.env`:

```bash
cp .env.example .env
```

```bash
PUBLIC_SITE_URL="https://your-domain.com"
PUBLIC_WALINE_SERVER_URL="https://your-waline-server.vercel.app"
```

## Local Development

```bash
npm run dev
```

## Validation

```bash
npm run check
npm run build
```

## First Customization Entry Points

1. [`src/config/site.ts`](../../../src/config/site.ts)
2. [`src/utils/i18n.ts`](../../../src/utils/i18n.ts)
3. [`src/content/posts/`](../../../src/content/posts)
4. [`src/assets/covers/`](../../../src/assets/covers)
5. [`.env.example`](../../../.env.example)
