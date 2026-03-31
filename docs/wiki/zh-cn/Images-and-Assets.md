# 图片与 astro:assets

[English](../en/Images-and-Assets.md) · [返回 Wiki 首页](./Home.md)

## 为什么主题使用 `astro:assets`

这个主题优先使用 Astro 官方的图片管线，而不是把外链图片和原图直接堆进页面。

主要好处：

- 自动生成响应式图片
- 能输出现代格式，如 `webp` / `avif`
- 构建期由 `sharp` 处理，部署后不需要额外图片服务
- 保留宽高信息，减少布局抖动

官方文档：

- [Images](https://docs.astro.build/zh-cn/guides/images/)
- [astro:assets](https://docs.astro.build/zh-cn/reference/modules/astro-assets/)

## 封面图用法

在 frontmatter 里引用本地图片：

```yaml
cover: ../../assets/covers/paper-constellation.svg
coverAlt: 深蓝色几何插图
```

这样列表页和文章页都会走统一的封面渲染逻辑。

## 在正文里使用 `Image`

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

## 在正文里使用 `Picture`

如果你希望显式输出多种格式：

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
- 正文图片尽量写清楚 `alt`
- 超大原图先人工筛选，避免构建时间过长
- 保持封面风格统一，会比频繁换风格更有主题感
