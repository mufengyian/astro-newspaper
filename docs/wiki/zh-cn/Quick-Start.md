# 快速开始

[English](../en/Quick-Start.md) · [返回 Wiki 首页](./Home.md)

## 环境要求

- Node.js `>= 22.12.0`
- npm `>= 10`

## 安装步骤

### 1. 获取项目

推荐直接 clone 仓库，或者使用 GitHub 的 “Use this template”。

### 2. 安装依赖

```bash
npm install
```

### 3. 复制环境变量

将仓库里的 [`.env.example`](../../../.env.example) 复制为 `.env`，然后填写真实值：

```bash
PUBLIC_SITE_URL="https://your-domain.com"
PUBLIC_WALINE_SERVER_URL="https://your-waline-server.vercel.app"
```

说明：

- `PUBLIC_SITE_URL` 对生产环境非常重要
- `PUBLIC_WALINE_SERVER_URL` 可选，不填就不显示评论区

### 4. 启动开发

```bash
npm run dev
```

打开：

```text
http://localhost:4321
```

## 第一次上手先改什么

建议按下面顺序替换示例内容：

1. [`src/config.ts`](../../../src/config.ts) 的站点标题、作者、字体、分页
2. [`src/utils/i18n.ts`](../../../src/utils/i18n.ts) 的中英文文案
3. [`src/content/posts`](../../../src/content/posts) 的示例文章
4. [`src/assets/covers`](../../../src/assets/covers) 的示例封面
5. `.env` 里的真实站点地址与评论服务地址

## 常用命令

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 本地开发 |
| `npm run check` | 类型检查 |
| `npm run build` | 生产构建 |
| `npm run preview` | 预览构建产物 |
| `npm run sync` | 同步内容集合类型 |

## 推荐的首轮验收

第一次接手主题时，至少验证这些页面：

- `/`
- `/archive/`
- `/tags/`
- `/search/`
- `/about/`
- `/posts/...`
- `/en/`
- `/en/posts/...`

这样可以尽早发现 i18n、分页、封面图和评论配置是否正常。
