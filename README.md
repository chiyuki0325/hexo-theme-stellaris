<h1 align="middle"> Stellaris </h1>
<h2 align="middle"> 强大、优雅、现代的 Hexo 主题 </h2>

> [!CAUTION]
> 本主题目前已不再活跃维护，并不再同步 Stellar 的新功能特性。如对追新有需求，请使用上游 Stellar 主题，或在 [issue](https://github.com/chiyuki0325/hexo-theme-stellaris/issues/6) 中提交需要使用的新功能。

## ✨ 简介
Stellaris 是一款 Hexo 博客主题，派生自 [Stellar](https://github.com/xaoxuu/hexo-theme-stellar) 1.12.0 版本，基于 [hexo-renderer-jsx](https://github.com/hexojs/hexo-renderer-jsx)，支持丰富的标签和动态数据组件，帮助您简单从容地应对各种表达需求。

本主题的样式主要参考了微软 Fluent Design 2 设计语言，当然，主题也提供很大的自定义空间，助您构建符合心意的博客。

> [!NOTE]
> Stellaris 仅为作者为个人博客而开发，稳定性和泛用型远未达到 “production-ready” 水平，因此部分原主题的功能可能并未支持，或存在 bug。

### ↔️ 与原 Stellar 主题的区别
- 样式: 使用 Fluent Design 设计风格重新设计样式。
- 代码: 使用 JSX 重写所有模板，并且对前端 JS 也进行了重写和优化。
- 性能优化: 使用 InstantClick 进行页面加载优化，把加载速度放在首位。
- 功能: 增加了文章过期提示等实用功能和组件。

### 📄 文档

[点此查看](https://blog.chyk.ink/wiki/stellaris/) Stellaris 主题文档。**文档正在绝赞施工中，欢迎提交贡献**。

也可以适当参考 [原主题文档](https://xaoxuu.com/wiki/stellar/)，或对照配置文件的注释，但是需要注意部分原主题的功能可能并未支持，或存在 bug。

## 📥 安装

- 🤔 环境需求
  ```
  建议的 Hexo 版本: 6.0.0 ~ 最新
  hexo-cli: 4.3.0 ~ 最新
  node.js: 18.0.0 ~ 24.13.0
  你喜欢的 Node.js 包管理工具（如自带的 npm 或第三方的 yarn、pnpm。）
  ```

### 📥 使用 Git 安装

- 📥 安装依赖
  ``` bash
  npm install react react-dom hexo-renderer-jsx html-react-parser --save
  ```
  依赖相关的版本可以查看 `package.json`
- 📥 将主题安装为子模块
  ``` bash
  git submodule add https://github.com/chiyuki0325/hexo-theme-stellaris.git themes/stellaris
  ```

### 📥 使用 npm 安装

```bash
npm install hexo-theme-stellaris --save
```

安装好后，在 `config.yml` 中添加 `theme: stellaris`。

## 🔄 更新

### 🔄 使用 Git 更新

```bash
git submodule update --remote --merge
```

### 🔄 使用 npm 更新

```bash
npm update hexo-theme-stellaris
```

## ✈️ Telegram Instant View

本主题编写了模板以适配 Telegram Instant View。

你可以在此[获取模板](https://blog.chyk.ink/2023/07/15/stellaris-instant-view-template/)，并且查阅[官方文档](https://instantview.telegram.org/)以了解如何在你的博客中使用。
