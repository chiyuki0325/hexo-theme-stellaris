# 📑 Stellaris - 强大、优雅、现代的 Hexo 主题

hexo-theme-stellaris 分叉自 [hexo-theme-stellar](https://github.com/xaoxuu/hexo-theme-stellar)，基于[hexo-renderer-jsx](https://github.com/hexojs/hexo-renderer-jsx)，支持丰富的标签和动态数据组件。

**本主题为[一刀斩の小窝](https://blog.yidaozhan.top)专门开发，原主题的有些功能我没有用到（比如 Waline、Utterances 评论区等），不保证完全可用。**

### 与原主题的区别

- 样式: 使用 Fluent Design 设计规范重新设计样式。
- 代码: 使用 React 重写所有模板。
- 性能优化: 使用 InstantClick 进行页面加载优化。
- 功能: 增加了文章过期提示等实用功能。

### 安装

个人不是很喜欢 Node 生态系统，并且本主题也不是原创主题，所以不会上架 npm，所以请使用 git 子模块的方式安装。

- 环境需求
    ```
    Hexo: 5.4.0 ~ 6.3.0
    hexo-cli: 4.3.0 ~ latest
    node.js: 14.17.3 ~ 18.12.0
    npm: 6.14.13 ~ 8.19.2
    ```

- 安装依赖
    ```bash
    npm install hexo-renderer-jsx --save
    ```
    
    ```bash
    npm install node-fetch@2 --save
    // bilicard 插件所需
    ```
    
- 将主题安装为子模块
  
    ```bash
    git submodule add https://github.com/YidaozhanYa/hexo-theme-stellaris.git themes/stellaris
    ```
    
- 在 `config.yml` 中添加 `theme: stellaris`。

### 更新

- 更新主题
    ```bash
    git submodule update --remote --merge
    ```

### 文档

可以适当参考 [原主题文档](https://xaoxuu.com/wiki/stellar/)。

#### 配置

- 预加载插件改为 InstantClick。

  ```yaml
  plugins:
    instant_click:
      js: https://cdn.bootcdn.net/ajax/libs/instantclick/3.1.0/instantclick.min.js
  ```

- 颜色配置部分进行了一些修改。

- 增加了文章过期提示功能。

  ```yaml
  article:
    outdate_month: 2
  ```

  > 发布于 3 个月前，更新于 3 个月前，文章内容可能已经过时

#### 标签插件

- 原主题更名数次的 [ablock](https://xaoxuu.com/wiki/stellar/tag-plugins/container/#ablock-%E6%99%AE%E9%80%9A%E5%9D%97%E5%AE%B9%E5%99%A8) 容器标签被改回了 border。

  ```jinja2
  {% border [color:color] [child:codeblock/tabs] title %}
  body
  {% endborder %}
  ```

- 新增了行内图片标签 icon。

  ```jinja2
  {% icon source [height:1.75em] %}
  ```

  效果见[博客 about 页面](https://blog.yidaozhan.top/about#%E6%9F%A5%E6%88%90%E5%88%86)。

#### Telegram Instant View

本主题编写了模板以适配 Telegram Instant View。

你可以在此[获取模板](https://blog.yidaozhan.top/2023/07/15/stellaris-instant-view-template/)，并且查阅[官方文档](https://instantview.telegram.org/)以了解如何在你的博客中使用。