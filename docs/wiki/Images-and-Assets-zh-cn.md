# 图片与 astro:assets

[English](Images-and-Assets-en) · [返回 Wiki 首页](Home)

## 为什么主题优先使用 `astro:assets`

这一版主题默认走 Astro 官方图片管线，而不是把原图直接塞进页面。

主要收益：

- 自动生成响应式图片
- 可输出 `avif` / `webp`
- 构建期由 `sharp` 处理，部署后无需额外图片服务
- 保留宽高信息，减少布局抖动
- 列表页与文章页都能共用统一的媒体策略

官方文档：

- [Images](https://docs.astro.build/zh-cn/guides/images/)
- [astro:assets](https://docs.astro.build/zh-cn/reference/modules/astro-assets/)

## 当前版本的图片策略

媒体预设集中在：

- [`src/config/site.ts`](../../../src/config/site.ts)

当前分为两套：

- `media.listingCover`
  用于首页、分页、列表卡片。
- `media.postCover`
  用于文章详情页头图。

如果你想统一调整封面图输出尺寸、格式或质量，优先改这里，而不是去各组件里找硬编码。

## 封面图写法

在 frontmatter 中直接引用本地资源：

```yaml
cover: ../../assets/covers/paper-constellation.svg
coverAlt: 深蓝色几何插图
```

这样列表页和文章页都会自动使用主题已有的 `Picture` 输出逻辑。

## 在正文中使用 `Image`

```mdx
---
import { Image } from "astro:assets";
import image from "../../assets/covers/signal-grid.svg";
---

<Image
  src={image}
  alt="信号网格插图"
  widths={[480, 720, 1080]}
  sizes="(max-width: 768px) 100vw, 720px"
/>
```

## 在正文中使用 `Picture`

```mdx
---
import { Picture } from "astro:assets";
import image from "../../assets/covers/craft-wave.svg";
---

<Picture
  src={image}
  alt="示例插图"
  formats={["avif", "webp"]}
  widths={[480, 720, 1080]}
  sizes="(max-width: 768px) 100vw, 720px"
/>
```

## 使用建议

- 封面图优先使用本地资源
- 正文图片尽量写清晰的 `alt`
- 如果原图极大，先手工筛选，避免拖慢构建
- 如果你想保留站点整体的编辑感，尽量让封面图风格保持统一
