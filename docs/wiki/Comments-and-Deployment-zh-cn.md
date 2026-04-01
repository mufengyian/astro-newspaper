# 评论与部署

[English](Comments-and-Deployment-en) · [返回 Wiki 首页](Home)

## Waline 评论

主题支持可选 Waline 评论系统。

### 环境变量

```bash
PUBLIC_WALINE_SERVER_URL="https://your-waline-server.vercel.app"
```

### 单篇文章关闭评论

```yaml
comments: false
```

### 默认配置位置

[`src/config/site.ts`](../../../src/config/site.ts) 中的 `comments` 字段：

- `meta`
- `requiredMeta`
- `login`
- `commentSorting`
- `pageSize`
- `reaction`

## 部署检查项

- `PUBLIC_SITE_URL` 已配置
- `npm run check` 已通过
- `npm run build` 已通过
- 示例文章、封面与作者信息已替换

## 静态部署说明

主题可部署到任意静态托管平台，包括：

- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages
