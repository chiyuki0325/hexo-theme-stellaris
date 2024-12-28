# 📑 Stellaris - 强大、优雅、现代的 Hexo 主题

hexo-theme-stellaris 分叉自 [hexo-theme-stellar](https://github.com/xaoxuu/hexo-theme-stellar)，基于[hexo-renderer-jsx](https://github.com/hexojs/hexo-renderer-jsx)，支持丰富的标签和动态数据组件。

本主题目前已不再活跃维护，并不再同步 Stellar 的新功能特性。如对追新有需求，请使用上游 Stellar 主题，或在 [issue](https://github.com/chiyuki0325/hexo-theme-stellaris/issues/6) 中提交需要使用的新功能。

### 安装

- 环境需求
  ```
  Hexo: 5.4.0 ~ 6.3.0
  hexo-cli: 4.3.0 ~ latest
  node.js: 14.17.3 ~ 18.12.0
  npm: 6.14.13 ~ 8.19.2
  ```

#### 使用 Git 安装

- 安装依赖
  ```bash
  npm install react react-dom hexo-renderer-jsx html-react-parser --save
  ```
  ```bash
  npm install node-fetch@2 --save
  // bilicard 插件所需
  ```
- 将主题安装为子模块

  ```bash
  git submodule add https://github.com/chiyuki0325/hexo-theme-stellaris.git themes/stellaris
  ```

#### 使用 npm 安装

```bash
npm install hexo-theme-stellaris --save
```

安装好后，在 `config.yml` 中添加 `theme: stellaris`。

### 更新

#### 使用 Git

```bash
git submodule update --remote --merge
```

#### 使用 npm

```bash
npm update hexo-theme-stellaris
```

### 文档

[点此查看](https://blog.chyk.ink/wiki/stellaris/) Stellaris 主题文档。

也可以适当参考 [原主题文档](https://xaoxuu.com/wiki/stellar/)，或对照配置文件的注释。

#### Telegram Instant View

本主题编写了模板以适配 Telegram Instant View。

你可以在此[获取模板](https://blog.chyk.ink/2023/07/15/stellaris-instant-view-template/)，并且查阅[官方文档](https://instantview.telegram.org/)以了解如何在你的博客中使用。
