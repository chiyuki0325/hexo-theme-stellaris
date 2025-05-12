# 贡献指南

感谢您对 hexo-theme-stellaris 的关注！我们欢迎各种形式的贡献，无论是新功能、bug修复还是文档改进。

## 如何贡献

1. **Fork 仓库**：首先 Fork 本仓库到您的 GitHub 账户。

2. **克隆仓库**：将您的 Fork 克隆到本地进行开发。
   ```bash
   git clone https://github.com/YOUR_USERNAME/hexo-theme-stellaris.git
   cd hexo-theme-stellaris
   ```

3. **创建分支**：为您的工作创建一个新分支。
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **安装依赖**：
   ```bash
   npm install
   ```

5. **进行更改**：实现您的功能或修复 bug。

6. **测试更改**：确保您的更改不会破坏现有功能。
   ```bash
   npm test
   ```

7. **代码格式化**：提交前格式化代码。
   ```bash
   npm run lint
   ```

8. **提交代码**：
   ```bash
   git add .
   git commit -m "feat: 添加新功能描述"
   ```
   我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范。

9. **推送分支**：
   ```bash
   git push origin feature/your-feature-name
   ```

10. **创建 Pull Request**：在 GitHub 上创建一个从您的分支到主仓库的 Pull Request。

## 开发指南

### 项目结构

```
hexo-theme-stellaris/
├── layout/            # JSX 布局文件
├── scripts/           # 主题脚本文件
├── source/            # 主题资源文件
│   ├── css/           # 样式文件
│   ├── js/            # JavaScript 文件
│   └── images/        # 图片资源
├── _config.yml        # 主题默认配置
└── tests/             # 测试文件
```

### 代码规范

- **JavaScript/JSX**：遵循 ESLint 配置
- **CSS/Stylus**：使用 2 空格缩进
- **提交信息**：遵循 Conventional Commits

### Pull Request 准则

- 每个 PR 应该专注于单一功能或 bug 修复
- 包含对您所做更改的清晰描述
- 如果添加新功能，请更新相关文档
- 确保所有测试通过

## 问题报告

如果您发现了 bug 或有功能请求，请在 [GitHub Issues](https://github.com/chiyuki0325/hexo-theme-stellaris/issues) 中创建新的 Issue。

## 许可证

通过贡献，您同意您的贡献将在 [MIT 许可证](LICENSE) 下发布。 