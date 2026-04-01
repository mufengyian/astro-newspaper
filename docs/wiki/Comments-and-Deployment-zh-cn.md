# 评论与部署

[English](Comments-and-Deployment-en) · [返回 Wiki 首页](Home)

## Waline 评论

主题使用 [Waline](https://waline.js.org/) 作为可选评论系统。

### 启用方式

在 `.env` 中配置：

```bash
PUBLIC_WALINE_SERVER_URL="https://your-waline-server.vercel.app"
```

### 当前默认配置位置

评论默认配置位于：

- [`src/config/site.ts`](../../../src/config/site.ts)

当前关键字段：

- `meta`: `["nick", "mail", "link"]`
- `requiredMeta`: `["nick", "mail"]`
- `login`: `"enable"`
- `commentSorting`: `"latest"`
- `pageSize`: `10`
- `reaction`: `false`

### 默认行为

- 未配置 `PUBLIC_WALINE_SERVER_URL`
  不渲染评论区
- 已配置 `PUBLIC_WALINE_SERVER_URL`
  文章页自动挂载 Waline

### 单篇文章关闭评论

```yaml
comments: false
```

## 部署前一定要检查 `PUBLIC_SITE_URL`

它会影响：

- canonical
- sitemap
- RSS
- Open Graph / Twitter Card
- `hreflang`
- `robots.txt`

未配置时：

- 站点仍然可以构建
- 但 `robots.txt` 会返回 `Disallow: /`
- sitemap 不启用
- RSS 页面会输出不可用状态，而不是错误订阅地址

## 推荐部署前清单

1. `PUBLIC_SITE_URL` 已配置为真实公开地址
2. `npm run check` 已通过
3. `npm run build` 已通过
4. 示例文章与示例封面已替换
5. 站点标题、作者名、关于页内容与中英文文案都已替换为真实内容
6. 如果启用了 Waline，已经检查评论区挂载、切页销毁和主题切换样式

## 适合的部署平台

`newspaper` 是静态站点，适合：

- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages
- 其他任意静态托管平台

## 一个实用建议

如果你在本地开发阶段还没有最终域名，可以先不配 `PUBLIC_SITE_URL`。
等生产地址稳定后，再统一补上并做一轮 `build` 验证，这样更安全。
