# `newspaper` 主题规范化、图标重做、README/Wiki 重构计划

## Summary

把当前仓库整理成一个适合公开维护与分发的 Astro 博客主题 starter，并对齐 Astro 官方的主题/包发布习惯。  
这次工作聚焦四件事：主题规范检查与补齐、报纸风格 favicon 重做、README 全量重写、Wiki 双份交付（仓库内 + GitHub Wiki）。  
文档内容将完全按最终用户视角重写，不引用我们这次对话过程；语气参考 [Paper](https://github.com/nanxiaobei/hugo-paper) 和 [PaperMod](https://github.com/adityatelange/hugo-PaperMod) 的克制与清晰，并明确致敬它们。

## Key Changes

### 1. Astro 主题规范对齐

- 采用“开源 starter 主题仓库”定位，不扩展到 `astro add` 集成或完整 npm 组件库封装。
- 对齐 Astro 官方 [发布到 npm](https://docs.astro.build/zh-cn/reference/publish-to-npm/) 的基础要求与 [Themes 目录](https://astro.build/themes/) 的公开展示习惯。
- 更新 `package.json`
  - 去掉 `private: true`
  - 补齐 `license`、`repository`、`homepage`、`keywords`、`author`
  - `keywords` 至少包含 `astro-component` 或 `withastro`、`blog`、`theme`、`seo`、`i18n`、`mdx`
  - 保持当前 starter 结构可运行，不新增复杂构建步骤
- 仓库卫生整理
  - 删除或排除本地工作流与临时文件：例如 `.vscode/`、日志、缓存说明类文件
  - 检查并清理无引用资源、历史残留配置、无效占位信息
  - 保留真正有价值的示例文章与示例素材
- 默认配置安全化
  - 继续保持未配置 `PUBLIC_SITE_URL` 时的安全 SEO 默认
  - 未配置 `PUBLIC_WALINE_SERVER_URL` 时不显示评论区
  - 不在默认页面或文档中保留 `username`、`yourmail` 这类伪正式占位值

### 2. favicon 重做

- 重做浏览器标签图标，方向定为“优雅的报纸形象”
  - 极简报纸折页/分栏/版头语义
  - 小尺寸 16px / 32px 下仍可辨识
  - 亮暗背景都清晰
  - 不做卡通、拟物、复杂渐变
- 产出物
  - 替换 `public/favicon.svg`
  - 重新生成 `public/favicon.ico`
- 风格目标
  - 与当前主题的 Paper / PaperMod / astro-paper 气质一致
  - 比现有图标更克制、更有出版物感

### 3. README 全量重写

- README 直接重写，不做局部修补。
- 写作要求
  - 严谨、有人味儿、信息密度高但不啰嗦
  - 面向第一次接触主题的人也能直接上手
  - 不根据我们这次对话写“过程痕迹”
- README 结构定稿
  - 项目简介
  - 设计目标与适用场景
  - 致敬 [Paper](https://github.com/nanxiaobei/hugo-paper) 与 [PaperMod](https://github.com/adityatelange/hugo-PaperMod)
  - 功能概览
  - 快速开始
  - 开发与构建流程
  - 目录结构
  - 站点配置教程
  - 内容写作教程
  - MD / MDX 使用
  - `astro:assets` 与图片教程
  - i18n 使用方式
  - 评论系统配置（Waline）
  - 部署说明
  - FAQ
  - License / Acknowledgements
- README 必须包含
  - 指向 Astro 官方文档的超链接
  - 指向 Paper、PaperMod 的超链接
  - 清晰的 `.env`、站点地址、SEO、评论配置教程
  - “开箱后第一步要改什么”
  - “哪些内容是示例，哪些是生产必须修改”
  - 当前默认行为说明，例如未配置 `PUBLIC_SITE_URL` / `PUBLIC_WALINE_SERVER_URL` 的表现
- README 需要修正现状中的不一致
  - 文档内实际行为与当前代码一致
  - 字体、评论、主题模式、社交链接、分页、构建说明不再留旧描述

### 4. License 与致敬

- 开源协议定为 `MIT`
  - 与 [Paper](https://github.com/nanxiaobei/hugo-paper/blob/main/LICENSE) 和 [PaperMod](https://github.com/adityatelange/hugo-PaperMod/blob/master/LICENSE) 保持一致
- 新增根目录 `LICENSE`
- README 中单独加入致敬段落
  - 说明灵感来源于 Paper、PaperMod、astro-paper、fuwari
  - 不写成模糊归属或“衍生声明”
- 检查第三方资源
  - 字体来源与许可说明保留
  - 图标与示例资源若有额外来源，单独写清

### 5. Wiki 双份交付

- 仓库内新增 `docs/wiki/`，作为版本化文档主来源
- GitHub Wiki 同步一份同主题内容
- 仓库内 Wiki 结构定稿
  - `docs/wiki/Home.md`
  - `docs/wiki/Quick-Start.md`
  - `docs/wiki/Configuration.md`
  - `docs/wiki/Content-and-MDX.md`
  - `docs/wiki/Images-and-Assets.md`
  - `docs/wiki/i18n.md`
  - `docs/wiki/Comments-and-Deployment.md`
  - `docs/wiki/FAQ.md`
- GitHub Wiki 同步策略
  - 内容以 `docs/wiki/` 为真源
  - GitHub Wiki 仅做镜像展示，不反向维护
- README 中增加两类入口
  - 仓库内文档入口
  - GitHub Wiki 入口

## Important Interface / Metadata Changes

- `package.json`
  - 从私有 starter 调整为可公开分发的主题仓库元数据
  - 不引入 breaking runtime API，但会改变包的发布属性
- 根目录新增
  - `LICENSE`
  - `docs/wiki/`
- 资源替换
  - `public/favicon.svg`
  - `public/favicon.ico`
- 文档入口变化
  - README 目录与链接会重排
  - 新增 Wiki 入口
- 保持不变的行为
  - 当前主题运行方式、路由结构、评论启用条件、内容 schema 不因这次工作发生 breaking change

## Test Plan

- 基础验证
  - `npm run check`
  - `npm run build`
- 主题规范与开源准备检查
  - `package.json` 元数据完整
  - `.gitignore` 不会提交构建产物、缓存、日志、本地工作流文件
  - 根目录无无意义临时文件
- 文档检查
  - README 目录锚点可跳转
  - 外部链接可访问
  - 仓库内 Wiki 与 GitHub Wiki 链接互通
  - README 中说明与当前代码行为一致
- 视觉检查
  - favicon 在浏览器标签页 16px / 32px 下可辨识
  - 亮暗模式下 favicon 与主题不冲突
- 用户上手检查
  - 按 README 从 clone 到本地运行可走通
  - 按 README 配置站点地址、评论、i18n、MDX、图片的步骤完整
- 开源前内容检查
  - 无私人占位社交链接与邮箱出现在默认正式展示中
  - `MIT` 许可证存在并与 README 一致
  - 致敬段落带正确超链接

## Assumptions

- 以仓库根目录现有的 `PLAN.md` 为方向参考，但执行时仍以当前代码和官方文档为准。
- “符合 Astro 主题规范”按以下理解执行
  - 符合 Astro 官方公开主题/包发布的基础元数据要求
  - 符合公开 starter 仓库应有的 README、License、示例、文档和清洁目录要求
  - 不扩展到实现 `astro add` 集成
- README 必须完全按最终用户视角重写，不引用我们这次协作过程。
- Wiki 采用“仓库内为真源，GitHub Wiki 为镜像展示”。
- 开源协议固定为 `MIT`。
- 这次工作不重构核心功能，只围绕规范、图标、文档、许可与仓库整洁度做整理。
