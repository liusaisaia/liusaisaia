# GitHub Pages 部署指南

## 🚀 快速部署步骤

### 1. 准备工作

确保你已经：
- 有一个 GitHub 账户
- 在本地安装了 Git

### 2. 创建 GitHub 仓库

1. 登录 GitHub
2. 点击右上角的 "+" 按钮，选择 "New repository"
3. 输入仓库名称（建议使用 `my-blog` 或类似名称）
4. 选择 "Public"（GitHub Pages 免费版需要公开仓库）
5. 不要初始化 README、.gitignore 或 license（因为本地已有）
6. 点击 "Create repository"

### 3. 配置项目

#### 3.1 设置 base 路径（重要）

如果你的仓库名不是 `<username>.github.io`，需要修改 `.vitepress/config.ts`：

```typescript
export default defineConfig({
  // 将 'your-repo-name' 替换为你的实际仓库名
  base: '/your-repo-name/',

  title: '我的博客',
  description: '一个使用 VitePress 构建的个人博客',
  // ... 其他配置
})
```

#### 3.2 更新链接

在 `.vitepress/config.ts` 中更新以下链接：

```typescript
// 社交链接
socialLinks: [
  { icon: 'github', link: 'https://github.com/your-username' }
],

// 编辑链接
editLink: {
  pattern: 'https://github.com/your-username/your-repo-name/edit/main/:path',
  text: '在 GitHub 上编辑此页'
},

// 站点地图
sitemap: {
  hostname: 'https://your-username.github.io'
}
```

### 4. 推送代码

在项目根目录执行：

```bash
# 初始化 git 仓库（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: VitePress blog setup"

# 设置主分支
git branch -M main

# 添加远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/your-username/your-repo-name.git

# 推送到 GitHub
git push -u origin main
```

### 5. 启用 GitHub Pages

1. 进入你的 GitHub 仓库页面
2. 点击 **Settings** 标签
3. 在左侧菜单中滚动找到 **Pages**
4. 在 **Source** 部分：
   - 选择 **Deploy from a branch** 改为 **GitHub Actions**
5. 保存设置

### 6. 等待部署

- 推送代码后，GitHub Actions 会自动开始构建
- 在仓库的 **Actions** 标签页可以查看部署进度
- 首次部署通常需要 2-5 分钟

### 7. 访问你的博客

部署完成后，你的博客将在以下地址可访问：

- **如果仓库名是 `<username>.github.io`**：
  ```
  https://your-username.github.io
  ```

- **其他仓库名**：
  ```
  https://your-username.github.io/your-repo-name
  ```

## 🔄 后续更新

每次你修改内容并推送到 `main` 分支时，GitHub Actions 会自动重新部署：

```bash
# 修改文件后
git add .
git commit -m "Update blog content"
git push
```

## 🛠️ 故障排除

### 问题 1: 页面显示 404

**原因**: base 路径配置错误

**解决方案**:
- 如果仓库名是 `username.github.io`，删除或注释掉 `base` 配置
- 如果是其他名称，确保 `base: '/repo-name/'` 中的名称与仓库名完全一致

### 问题 2: 样式或资源加载失败

**原因**: 通常也是 base 路径问题

**解决方案**: 检查浏览器开发者工具的网络标签，确认资源路径是否正确

### 问题 3: GitHub Actions 构建失败

**原因**: 依赖安装或构建错误

**解决方案**:
1. 检查 Actions 标签页的错误日志
2. 确保 `package.json` 中的脚本正确
3. 本地运行 `pnpm build` 确认构建成功

### 问题 4: 权限错误

**原因**: GitHub Actions 没有足够权限

**解决方案**:
1. 进入仓库 Settings > Actions > General
2. 在 "Workflow permissions" 部分选择 "Read and write permissions"
3. 保存设置并重新运行 workflow

## 📝 自定义域名（可选）

如果你有自己的域名：

1. 在仓库根目录创建 `public/CNAME` 文件
2. 在文件中写入你的域名（如 `blog.example.com`）
3. 在域名提供商处设置 CNAME 记录指向 `your-username.github.io`

## 🎉 完成

恭喜！你的 VitePress 博客现在已经成功部署到 GitHub Pages 了！

开始写作你的第一篇博客文章吧！ 📝
