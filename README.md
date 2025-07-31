# VitePress 博客

一个使用 VitePress 构建的现代化个人博客。

## 🚀 特性

- ⚡️ **VitePress** - 基于 Vite 和 Vue 3 的静态站点生成器
- 📝 **Markdown** - 使用 Markdown 编写内容，专注创作
- 🎨 **现代化设计** - 简洁美观的界面设计
- 🔍 **全文搜索** - 内置搜索功能，快速找到内容
- 📱 **响应式** - 完美适配各种设备
- ⚡️ **极速加载** - 静态站点生成，CDN 友好
- 🛠️ **TypeScript** - 完整的类型支持
- 🎯 **SEO 优化** - 搜索引擎友好

## 📦 安装

```bash
# 克隆项目
git clone <repository-url>
cd vitepress-blog

# 安装依赖
pnpm install
```

## 🛠️ 开发

```bash
# 启动开发服务器
pnpm dev

# 构建项目
pnpm build

# 预览构建结果
pnpm preview

# 代码检查
pnpm lint

# 自动修复代码格式
pnpm lint:fix
```

## 📁 项目结构

```
vitepress-blog/
├── .vitepress/
│   ├── config.ts          # VitePress 配置
│   └── theme/             # 自定义主题
├── blog/                  # 博客文章
│   ├── index.md          # 博客首页
│   ├── hello-world.md    # 示例文章
│   └── ...
├── public/                # 静态资源
├── index.md               # 网站首页
├── about.md               # 关于页面
└── package.json
```

## ✍️ 写作

### 创建新文章

在 `blog/` 目录下创建新的 `.md` 文件：

```markdown
# 文章标题

::: info 文章信息
- **发布时间**: 2024-01-30
- **分类**: 技术
- **标签**: Vue.js, VitePress
:::

文章内容...
```

### Markdown 增强功能

VitePress 提供了丰富的 Markdown 扩展：

#### 容器

```markdown
::: info 信息
这是一个信息提示
:::

::: tip 提示
这是一个小贴士
:::

::: warning 警告
这是一个警告
:::

::: danger 危险
这是一个危险警告
:::
```

#### 代码块高亮

```markdown
\`\`\`javascript{1,3-5}
// 高亮第1行和第3-5行
function hello() {
  console.log('Hello')
  console.log('VitePress')
  console.log('World')
}
\`\`\`
```

## 🎨 自定义

### 修改配置

编辑 `.vitepress/config.ts` 文件来自定义网站配置：

```typescript
export default defineConfig({
  title: '你的博客名称',
  description: '你的博客描述',

  themeConfig: {
    nav: [
      // 自定义导航
    ],
    sidebar: {
      // 自定义侧边栏
    }
  }
})
```

### 自定义主题

在 `.vitepress/theme/` 目录下可以自定义主题样式和组件。

## 🚀 部署

### Vercel 部署

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 设置构建命令：`pnpm build`
4. 设置输出目录：`.vitepress/dist`

### Netlify 部署

1. 将代码推送到 GitHub
2. 在 Netlify 中连接仓库
3. 设置构建命令：`pnpm build`
4. 设置发布目录：`.vitepress/dist`

### GitHub Pages 部署

本项目已配置自动部署到 GitHub Pages。按以下步骤操作：

#### 1. 推送代码到 GitHub

```bash
# 初始化 git 仓库（如果还没有）
git init
git add .
git commit -m "Initial commit"

# 添加远程仓库并推送
git branch -M main
git remote add origin https://github.com/[your-username]/[your-repo].git
git push -u origin main
```

#### 2. 启用 GitHub Pages

1. 进入你的 GitHub 仓库
2. 点击 **Settings** 标签
3. 在左侧菜单中找到 **Pages**
4. 在 **Source** 部分选择 **GitHub Actions**
5. 保存设置

#### 3. 配置仓库名称（重要）

如果你的仓库名不是 `<username>.github.io`，需要在 `.vitepress/config.ts` 中设置 base 路径：

```typescript
export default defineConfig({
  // 设置为你的仓库名
  base: '/your-repo-name/',
  // ... 其他配置
})
```

#### 4. 自动部署

推送代码到 `main` 分支后，GitHub Actions 会自动：
- 安装依赖
- 构建项目
- 部署到 GitHub Pages

你的网站将在以下地址可访问：
- 如果仓库名是 `<username>.github.io`：`https://<username>.github.io`
- 其他仓库名：`https://<username>.github.io/<repo-name>`

## 📚 文档

- [VitePress 官方文档](https://vitepress.dev/)
- [Vue 3 文档](https://vuejs.org/)
- [Markdown 语法指南](https://www.markdownguide.org/)

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**开始你的博客之旅吧！** 🎉
