# 2026-03-31 发布说明

这次更新主要聚焦在多语言内容链路的正确性、客户端渲染安全性，以及主题默认资源加载策略的收紧。

## 重点更新

- 修复多语言文章路由，未翻译文章不再错误生成到次语言路径。
- 收紧 alternate 元数据输出，并统一 `hreflang` 格式。
- 将搜索结果渲染从 `innerHTML` 改为 DOM API，降低前端注入风险。
- 隔离独立 404 页面样式，避免样式泄漏到普通页面。
- 优化 `PUBLIC_SITE_URL` 缺失时的 RSS 回退行为。
- 调整字体加载策略，默认 editorial 预设下不再无条件打包 LXGW WenKai。

## 影响

- 搜索引擎将看到更干净的 canonical / alternate 关系。
- 用户不会再进入没有真实译文内容的伪多语言页面。
- 默认主题构建不会再为 editorial 预设额外打包大体积中文字体资源。
- 搜索结果渲染实现更安全，也更容易维护。

## 验证

- `npm run check`
- `PUBLIC_SITE_URL=https://example.com npm run build`
