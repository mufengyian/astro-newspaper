# 评论与部署

[English](../en/Comments-and-Deployment.md) · [返回 Wiki 首页](./Home.md)

## Waline 评论

主题使用 [Waline](https://waline.js.org/) 作为可选评论系统。

### 启用方式

在 `.env` 中配置：

```bash
PUBLIC_WALINE_SERVER_URL="https://your-waline-server.vercel.app"
```

### 默认行为

- 没有 `PUBLIC_WALINE_SERVER_URL`
  - 不显示评论区
- 有 `PUBLIC_WALINE_SERVER_URL`
  - 文章页自动加载评论区

### 单篇文章关闭评论

```yaml
comments: false
```

### 当前默认配置

位于 [`src/config.ts`](../../../src/config.ts)：

- `meta`: `["nick", "mail", "link"]`
- `requiredMeta`: `["nick", "mail"]`
- `login`: `"enable"`
- `commentSorting`: `"latest"`
- `pageSize`: `10`
- `reaction`: `false`

## 部署前检查

部署前建议确认：

1. `PUBLIC_SITE_URL` 已设置
2. `npm run check` 已通过
3. `npm run build` 已通过
4. 示例文章和封面已经替换
5. 作者名、站点标题、站点描述已改成真实内容

## 部署平台建议

`newspaper` 适合：

- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages
- 任何静态托管平台

## 为什么要配置 `PUBLIC_SITE_URL`

因为它影响：

- canonical
- Open Graph
- Twitter cards
- RSS
- sitemap
- `hreflang`

如果没有真实的公开地址，主题宁可不输出这些元数据，也不应该输出错误版本。
