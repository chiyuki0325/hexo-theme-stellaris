# 📑 Stellaris - 强大、优雅、现代的 Hexo 主题

hexo-theme-stellaris 分叉自 [hexo-theme-stellar](https://github.com/xaoxuu/hexo-theme-stellar)，基于[hexo-renderer-jsx](https://github.com/hexojs/hexo-renderer-jsx)，支持丰富的标签和动态数据组件。

![Stellaris Theme](https://github.com/chiyuki0325/hexo-theme-stellaris/raw/main/screenshot.png)

## ✨ 主题特点

- 🚀 **性能优化**：减少了jQuery依赖，使用原生JavaScript实现交互
- 🎨 **主题自定义**：支持通过CSS变量轻松自定义主题颜色和样式
- 📱 **响应式设计**：完美适配各种设备尺寸
- 🌓 **暗黑模式**：支持自动和手动切换的暗黑模式
- 🔍 **SEO友好**：优化的元标签和结构化数据
- 📊 **多样化布局**：支持文章、文档、项目多种布局方式

## 安装

### 环境需求
```
Hexo: 5.4.0 ~ 6.3.0
hexo-cli: 4.3.0 ~ latest
node.js: 14.17.3 ~ 18.12.0
npm: 6.14.13 ~ 8.19.2
```

### 使用 Git 安装

- 安装依赖
  ```bash
  npm install react react-dom hexo-renderer-jsx html-react-parser --save
  ```

- 将主题安装为子模块

  ```bash
  git submodule add https://github.com/chiyuki0325/hexo-theme-stellaris.git themes/stellaris
  ```

### 使用 npm 安装

```bash
npm install hexo-theme-stellaris --save
```

安装好后，在 `config.yml` 中添加 `theme: stellaris`。

## 更新

### 使用 Git

```bash
git submodule update --remote --merge
```

### 使用 npm

```bash
npm update hexo-theme-stellaris
```

## 🎨 主题配置

Stellaris 支持通过 `_config.stellaris.yml` 自定义配置。以下是一些关键配置项：

### 颜色方案

```yaml
color_scheme:
  main: '#0068c4'        # 主题色
  background: '#f4f9ff'  # 网站背景色
  card_bg: 'white'       # 卡片背景色
  text: '#333'           # 文本色
  # 更多配置...
```

### 侧边栏

```yaml
sidebar:
  logo:
    avatar: '[config.avatar](/about/)'
    title: '[config.title](/)'
  menu:
    post: '[btn.blog](/)'
    wiki: '[btn.wiki](/wiki/)'
    # 更多菜单项...
```

### 性能优化

本主题已进行多项性能优化：

- 减少 jQuery 依赖，改用原生 JavaScript
- 优化资源加载顺序，使用 preconnect 和 preload
- 使用 CSS 变量简化样式计算
- 延迟加载非关键资源

## 🔥 主题标签插件

Stellaris 支持多种标签插件以丰富文章内容：

- `{% note %}` - 提示框
- `{% image %}` - 图片展示
- `{% link %}` - 链接卡片
- `{% bvideo %}` - B站视频嵌入
- 更多标签请查看文档

## 文档

[点此查看](https://blog.chyk.ink/wiki/stellaris/) Stellaris 主题文档。文档正在施工中，欢迎提交贡献。

也可以适当参考 [原主题文档](https://xaoxuu.com/wiki/stellar/)，或对照配置文件的注释。

## Telegram Instant View

本主题编写了模板以适配 Telegram Instant View。

你可以在此[获取模板](https://blog.chyk.ink/2023/07/15/stellaris-instant-view-template/)，并且查阅[官方文档](https://instantview.telegram.org/)以了解如何在你的博客中使用。

## 贡献

如发现问题或有功能建议，欢迎在 [GitHub Issues](https://github.com/chiyuki0325/hexo-theme-stellaris/issues) 提交。

## 许可证

本项目基于 [MIT 许可证](LICENSE) 发布。
