# 孤城

这是“孤城”的个人网站，用来记录项目实践、学习笔记、文章与日常影像。

- 网站地址：[gucheng.page](https://gucheng.page/)
- GitHub：[wenkang-yang](https://github.com/wenkang-yang)
- 技术框架：[Astro](https://astro.build/)

## 内容放在哪里

网站内容主要保存在 `src/content` 中：

- `writing/`：完整文章与思考
- `notes/`：学习记录与灵感片段
- `projects/data.json`：项目列表
- `photos/data.json`：照片列表
- `home/index.md`：首页介绍

每个内容文件夹中都附有 README，可以按照其中的示例添加内容。

## 本地运行

需要 Node.js 22.12 或更高版本，以及 pnpm。

```bash
pnpm install
pnpm dev
```

本地服务启动后，访问终端显示的地址，通常是
`http://127.0.0.1:4321/`。

## 发布前检查

```bash
pnpm lint
pnpm check
pnpm build
```

- `lint` 检查代码风格和常见问题。
- `check` 检查 Astro、TypeScript 和组件类型。
- `build` 生成真正要部署的静态网站。

## 致谢与许可

本网站基于
[Astro AntfuStyle Theme](https://github.com/lin-stephanie/astro-antfustyle-theme)
改造，感谢 Stephanie Lin 以及相关开源项目作者。

项目遵循仓库中的 [MIT License](./LICENSE)。原项目的版权声明与许可文本予以保留。
