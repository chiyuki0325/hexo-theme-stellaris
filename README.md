# 📑 Stellaris - 强大、优雅、现代的 Hexo 主题

hexo-theme-stellaris 分叉自 [hexo-theme-stellar](https://github.com/xaoxuu/hexo-theme-stellar)，支持丰富的标签和动态数据组件。

**本主题为[一刀斩の小窝](https://blog.yidaozhan.top)专门开发，有些功能我没有用到，不保证完全可用。**


### 与原主题的区别

- 样式: 使用 Fluent Design 设计规范重新设计样式。
- 代码: 使用 React 重写所有模板。

### 安装

本主题不会上架 npm，所以请使用 git 子模块的方式安装。

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
    // or
    yarn add hexo-renderer-jsx
    ```

- 将主题安装为子模块
    ```bash
    git submodule add https://github.com/YidaozhanY/hexo-theme-stellaris.git themes/stellaris
    ```

- 在 `config.yml` 中添加 `theme: stellaris`。

### 更新

- 更新主题
    ```bash
    git submodule update --remote --merge
    ```

### 文档

[原主题文档](https://xaoxuu.com/wiki/stellar/)