# newspaper

`newspaper` 是一个基于 Astro 6 的博客主题 starter，重点放在这些事情上：

- 阅读体验要舒服
- 目录结构要清楚
- 多语言要原生
- 长期写作要省心
- 默认配置要尽量安全，不误伤生产环境 SEO

它参考了 `PaperMod` 的克制层次，也吸收了 `astro-paper` 与 `fuwari` 的轻盈感，但实现上尽量靠近 Astro 官方能力。

## 目录

- [1. 主题特性](#1-主题特性)
- [2. 快速开始](#2-快速开始)
- [3. 生产环境配置](#3-生产环境配置)
- [4. 主题配置项](#4-主题配置项)
- [5. 字体配置](#5-字体配置)
- [6. 内容组织方式](#6-内容组织方式)
- [7. MDX 是什么，为什么要用](#7-mdx-是什么为什么要用)
- [8. 如何写 MDX 文章](#8-如何写-mdx-文章)
- [9. 响应式图片：`astro:assets` + `sharp`](#9-响应式图片astroassets--sharp)
- [10. 如何在文章中使用图片](#10-如何在文章中使用图片)
- [11. 多语言写作方式](#11-多语言写作方式)
- [12. 构建与验证](#12-构建与验证)
- [13. Waline 评论](#13-waline-评论)
- [14. 常见问题](#14-常见问题)

## 1. 主题特性

- 基于 Astro 官方 `i18n` 路由能力，内置 `zh-cn` 与 `en`
- 基于 `astro:content` + `glob()` 的内容管理
- 支持 `MDX`
- 使用 `astro:assets` + `sharp` 处理本地响应式图片
- 启用 `ClientRouter`、链接预取与视图过渡
- 内建首页、文章页、分页、归档、标签、搜索、关于、404
- 内置 `Waline` 评论适配
- 暗色 / 浅色两态切换
- 代码块复制按钮支持键盘与触屏
- 默认 SEO 策略更安全：未配置公开站点地址时，不输出生产环境元数据
- 支持通过配置切换字体方案，包括 `LXGW WenKai` Web 字体

## 2. 快速开始

安装依赖：

```bash
npm install
```

启动开发：

```bash
npm run dev
```

默认地址：

```text
http://localhost:4321
```

常用命令：

| Command | Action |
| :-- | :-- |
| `npm run dev` | 启动开发服务器 |
| `npm run check` | 运行 Astro 类型检查 |
| `npm run build` | 生成生产构建 |
| `npm run preview` | 预览生产构建 |
| `npm run sync` | 同步内容与类型定义 |

## 3. 生产环境配置

主题不会把 `siteUrl` 写死在源码里，而是通过环境变量提供。

新建 `.env`：

```bash
PUBLIC_SITE_URL="https://your-domain.com"
```

为什么这么设计：

- starter 阶段如果直接写 `https://example.com`，很容易把错误的 canonical / Open Graph / RSS / robots / sitemap 带上生产
- 把公开地址放到环境变量里，默认更安全，也更适合多环境部署

未设置 `PUBLIC_SITE_URL` 时：

- 页面照常开发与构建
- 不输出 canonical、OG、Twitter、hreflang 等生产元数据
- `robots.txt` 会返回 `Disallow: /`
- `rss.xml` / `en/rss.xml` 不会生成实体文件
- `@astrojs/sitemap` 不启用

## 4. 主题配置项

主要配置在：

- [`src/config.ts`](./src/config.ts)
- [`src/utils/i18n.ts`](./src/utils/i18n.ts)

`src/config.ts` 里你最常改的是：

```ts
export const siteConfig = {
  title: "Newspaper",
  siteUrl: publicSiteUrl,
  defaultLocale: DEFAULT_LOCALE,
  locales: LOCALES,
  typography: {
    preset: "editorial",
  },
  author: {
    name: "JiU",
  },
  featuredCount: 2,
  postsPerPage: 6,
}
```

说明：

- `title`：站点标题
- `typography.preset`：字体方案
- `featuredCount`：首页优先展示的置顶文章数量
- `postsPerPage`：分页大小

`src/utils/i18n.ts` 里维护的是：

- 中英文站点描述
- 导航文案
- 按钮文案
- 搜索页提示
- 文章页相关文案

## 5. 字体配置

主题内置了两套字体方案：

- `editorial`
  - 默认方案
  - 正文使用 `Manrope`
  - 标题使用 `Newsreader`
  - 适合偏英文感、杂志感的排版
- `wenkai`
  - 使用 `@callmebill/lxgw-wenkai-web`
  - 当前接入的是 `lxgwwenkai-regular`
  - 适合中文内容更重、希望整体更温润耐读的博客

切换方式：

```ts
typography: {
  preset: "wenkai",
},
```

当前支持值：

```ts
"editorial" | "wenkai"
```

### 为什么改成 `@callmebill/lxgw-wenkai-web`

你提供的这个包更适合 Web 场景，原因很直接：

- 它已经把字体拆成了适合网页分发的 `woff2` 分片
- 浏览器只会按需加载需要的字形范围
- 比直接塞一整份本地 `ttf` 更适合线上使用
- 对仓库体积和首屏加载都更友好

当前项目里字体是这样接入的：

```css
@import "@callmebill/lxgw-wenkai-web/lxgwwenkai-regular/result.css";
```

相关来源：

- npm 包：<https://www.npmjs.com/package/@callmebill/lxgw-wenkai-web>
- GitHub 仓库：<https://github.com/CMBill/lxgw-wenkai-web>
- 上游字体项目：<https://github.com/lxgw/LxgwWenKai>

说明：

- `@callmebill/lxgw-wenkai-web` 这个 Web 包本身是 MIT
- 它封装的字体上游仍然是 `LXGW WenKai`
- 上游字体许可信息可以在包内生成的 CSS 注释里看到，来源仍然指向 `LXGW WenKai`

如果你后续希望：

- 增加 `medium` / `light`
- 给代码块接 `lxgwwenkaimono-regular`
- 再新增一套字体 preset

可以在当前实现上继续扩展

## 6. 内容组织方式

文章目录：

```text
src/content/posts
```

封面示例素材：

```text
src/assets/covers
```

主题使用 `astro:content` 管理文章，因此 frontmatter 会经过类型校验。

当前文章 schema 支持这些字段：

```yaml
title: 示例文章
excerpt: 一段摘要
publishDate: 2026-03-30
updatedDate: 2026-03-31
draft: false
featured: false
locale: zh-cn
translationKey: hello-world
category: Astro
tags:
  - i18n
  - MDX
authors:
  - JiU
comments: true
cover: ../../assets/covers/example.png
coverAlt: 封面描述
```

字段说明：

- `title`：标题
- `excerpt`：摘要，列表页与 meta 会用到
- `publishDate`：发布日期
- `updatedDate`：可选，更新日期
- `draft`：草稿
- `featured`：是否置顶
- `locale`：文章语言，支持 `zh-cn` 和 `en`
- `translationKey`：同一篇文章的多语言版本共用同一个 key 时，便于关联与回退
- `category`：分类
- `tags`：标签
- `comments`：是否显示评论区，默认 `true`
- `cover`：封面图，建议使用本地图片

## 7. MDX 是什么，为什么要用

### MDX 是什么

MDX 可以理解为：

- Markdown + JSX / 组件能力

也就是说，你既可以像写普通 Markdown 一样写：

- 标题
- 列表
- 表格
- 代码块
- 引用

也可以直接在文章里写组件，例如：

```mdx
<Callout type="info">这是一段提示。</Callout>
```

### 它适合什么场景

如果你只是写非常纯粹的文字，Markdown 已经够用。

但如果你经常需要：

- 嵌入组件
- 定制图片展示
- 加提示框、卡片、图表、对比块
- 在文章里组合交互式内容

那 MDX 会非常舒服。

### 主题为什么支持 MDX

因为博客写久了，内容很少永远只是“纯文本”。

支持 MDX 的好处是：

- 写作时保留 Markdown 的轻量感
- 需要复杂表达时不用跳出内容系统
- 后续做组件化文章模板会更容易

Astro 官方文档：

- MDX 集成指南：<https://docs.astro.build/en/guides/integrations-guide/mdx/>

## 8. 如何写 MDX 文章

### 1. 新建文章文件

在 `src/content/posts` 下创建一个 `.mdx` 文件，例如：

```text
src/content/posts/hello-mdx.mdx
```

### 2. 写 frontmatter

```mdx
---
title: Hello MDX
excerpt: 用一篇文章快速了解 MDX 在这个主题里的工作方式。
publishDate: 2026-03-30
locale: zh-cn
translationKey: hello-mdx
category: 写作
tags:
  - MDX
  - Astro
---
```

### 3. 写正文

````mdx
## 这是二级标题

你可以像普通 Markdown 一样写段落、列表和表格。

- 第一项
- 第二项

```ts
console.log("hello mdx");
```
````

### 4. 在 MDX 中导入组件或资源

你可以直接导入 Astro / JSX 组件和本地资源：

```mdx
---
import { Image } from "astro:assets";
import cover from "../../assets/covers/paper-constellation.svg";
---

<Image src={cover} alt="示例图片" width={1200} />
```

### 5. 在 MDX 中插入组件

以后如果你新增了自定义组件，例如 `Callout.astro`：

```mdx
---
import Callout from "../../components/Callout.astro";
---

<Callout>这是一条提示。</Callout>
```

### MDX 写作建议

- 常规文章优先保持 Markdown 风格
- 只有在表达需要时才引入组件
- 组件数量不要太多，否则文章会变成“拼页面”
- 一篇文章如果大量依赖组件，建议先抽一个固定模板

## 9. 响应式图片：`astro:assets` + `sharp`

### 这是什么

主题使用 Astro 官方的 `astro:assets` 图片能力，并通过 `sharp` 在构建阶段处理本地图片。

这里可以分开理解：

- `astro:assets`
  - Astro 官方提供的图片模块
  - 负责统一图片导入、尺寸推导、`srcset` 生成、`Image` / `Picture` 组件能力
- `sharp`
  - 一个高性能图片处理库
  - Astro 会用它在构建时生成不同尺寸、不同格式的优化图片

Astro 官方文档：

- 图片指南：<https://docs.astro.build/en/guides/images/>
- `astro:assets` 参考：<https://docs.astro.build/en/reference/modules/astro-assets/>

### 有什么好处

#### 1. 自动生成响应式图片

同一张源图可以生成多种尺寸，浏览器根据设备宽度选择更合适的版本。

好处：

- 手机不会下载桌面大图
- 大屏不会强行放大小图
- 节省流量，提升加载速度

#### 2. 自动生成现代格式

主题里的文章封面通过 `Picture` 输出 `avif` 和 `webp`。

好处：

- 大多数场景下体积比原始 PNG/JPG 更小
- 页面更快打开

#### 3. 自动保留宽高，减少布局抖动

Astro 能知道图片尺寸，因此可以提前在页面里保留空间。

好处：

- 页面加载时不容易“跳一下”
- 阅读更稳定
- 对 Core Web Vitals 更友好

#### 4. 构建期完成，不依赖运行时服务

图片优化在构建时完成。

好处：

- 静态部署更简单
- CDN / 对象存储 / GitHub Pages 都更容易兼容
- 不需要额外的图片处理服务

### 主题里哪里在用

主题主要在这些地方使用了 `astro:assets`：

- 文章卡片封面
- 文章详情页封面
- 你在 MDX 中手动导入并使用的图片

## 10. 如何在文章中使用图片

### 方式一：把图片作为文章封面

frontmatter 里直接写本地路径：

```yaml
cover: ../../assets/covers/paper-constellation.svg
coverAlt: 深蓝色几何插图
```

好处：

- schema 会校验图片
- 列表页和详情页会统一走主题的 `Picture` 逻辑
- 自动生成响应式图片与现代格式

### 方式二：在 MDX 正文里使用 `Image`

```mdx
---
import { Image } from "astro:assets";
import demo from "../../assets/covers/signal-grid.svg";
---

<Image
  src={demo}
  alt="一张示例图片"
  widths={[480, 720, 1080]}
  sizes="(max-width: 768px) 100vw, 720px"
/>
```

适合：

- 正文插图
- 流程图
- 局部截图

### 方式三：在 MDX 正文里使用 `Picture`

如果你希望明确输出多个格式：

```mdx
---
import { Picture } from "astro:assets";
import demo from "../../assets/covers/craft-wave.svg";
---

<Picture
  src={demo}
  alt="一张示例图片"
  formats={["avif", "webp"]}
  widths={[480, 720, 1080]}
  sizes="(max-width: 768px) 100vw, 720px"
/>
```

适合：

- 大图
- 首页视觉图
- 你明确希望浏览器优先选择更省体积格式的场景

### 图片使用建议

- 优先使用本地图片，而不是随手塞外链
- 封面图尽量保持风格统一
- 如果是正文插图，建议写清楚 `alt`
- 超大原图在导入前尽量先做一次人工筛选，避免构建时间过长

## 11. 多语言写作方式

主题当前使用 Astro 原生 i18n 路由：

- 中文首页：`/`
- 英文首页：`/en`
- 中文文章：`/posts/slug`
- 英文文章：`/en/posts/slug`

### 最简单的做法

分别写两篇文章：

```yaml
locale: zh-cn
translationKey: hello-world
```

```yaml
locale: en
translationKey: hello-world
```

### 为什么要写 `translationKey`

它的作用是：

- 把多语言版本视为“同一篇内容”的不同翻译
- 在某个语言版本缺失时，便于回退到默认语言内容
- 后续如果想做“切换到另一语言版本”的精确跳转，也更方便扩展

## 12. 构建与验证

已验证通过：

```bash
npm run check
npm run build
```

如果你改了：

- `src/config.ts`
- `src/utils/i18n.ts`
- `astro.config.mjs`
- 内容 schema
- 字体 preset

建议都跑一遍：

```bash
npm run check
npm run build
```

## 13. Waline 评论

主题已经接好了 `Waline` 评论的前端适配。

### 先看效果

只有在配置了 Waline 服务端之后，文章页才会显示评论区。

### 真正启用评论

在 `.env` 里加入：

```bash
PUBLIC_WALINE_SERVER_URL="https://your-waline-server.vercel.app"
```

示例已经写在 [`.env.example`](./.env.example)。

### 当前默认行为

- 没有 `PUBLIC_WALINE_SERVER_URL`
  - 文章页不显示评论区
- 配置了 `PUBLIC_WALINE_SERVER_URL`
  - 文章页自动切换为真实 Waline 评论区

### 内置的默认配置

配置位于 [`src/config.ts`](./src/config.ts)：

- `meta`: `["nick", "mail", "link"]`
- `requiredMeta`: `["nick", "mail"]`
- `login`: `"enable"`
- `commentSorting`: `"latest"`
- `pageSize`: `10`
- `reaction`: `false`

### 按文章关闭评论

如果某篇文章不想显示评论区：

```yaml
comments: false
```

### 说明

因为主题启用了 `ClientRouter`，评论组件已经处理了页面切换时的重新挂载；后面你从一篇文章跳到另一篇文章时，不需要再手写额外初始化逻辑。

## 14. 常见问题

### Q1：我只想写中文，还需要保留英文吗？

不一定，但建议先保留。

原因：

- 路由和字典已经接好
- 后续要加英文时成本很低
- 不会影响中文日常写作

### Q2：为什么没有配置 `PUBLIC_SITE_URL` 时看不到 RSS 文件？

这是主题刻意做的安全默认。

因为如果不知道真实站点地址，就不应该生成带错误绝对链接的 RSS / SEO 元数据。

### Q3：我可以把字体切回更传统的系统字体吗？

可以。

直接改 `src/styles/global.css` 里的 `--font-body` / `--font-heading`，或者继续扩展 `src/config.ts` 的字体 preset。

### Q4：我可以只用 Markdown，不用 MDX 吗？

当然可以。

主题的内容 loader 同时支持：

- `.md`
- `.mdx`

如果你暂时不需要组件能力，完全可以一直写普通 Markdown。
