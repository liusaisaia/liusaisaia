# 🚀 GitHub Pages 部署检查清单

在部署之前，请确保完成以下步骤：

## ✅ 部署前检查

- [ ] **创建 GitHub 仓库**
  - 仓库设置为 Public
  - 记录仓库名称

- [ ] **配置 VitePress**
  - [ ] 如果仓库名不是 `<username>.github.io`，在 `.vitepress/config.ts` 中设置正确的 `base` 路径
  - [ ] 更新 `socialLinks` 中的 GitHub 链接
  - [ ] 更新 `editLink` 中的仓库路径
  - [ ] 更新 `sitemap.hostname` 为你的 GitHub Pages 地址

- [ ] **本地测试**
  - [ ] 运行 `pnpm dev` 确保开发服务器正常
  - [ ] 运行 `pnpm build` 确保构建成功
  - [ ] 运行 `pnpm preview` 预览构建结果

## 🔧 配置示例

### 如果仓库名是 `my-blog`，用户名是 `john`：

```typescript
// .vitepress/config.ts
export default defineConfig({
  base: '/my-blog/',

  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/john' }
    ],

    editLink: {
      pattern: 'https://github.com/john/my-blog/edit/main/:path',
      text: '在 GitHub 上编辑此页'
    }
  },

  sitemap: {
    hostname: 'https://john.github.io'
  }
})
```

### 如果仓库名是 `john.github.io`：

```typescript
// .vitepress/config.ts
export default defineConfig({
  // 不需要设置 base，或者注释掉
  // base: '/my-blog/',

  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/john' }
    ],

    editLink: {
      pattern: 'https://github.com/john/john.github.io/edit/main/:path',
      text: '在 GitHub 上编辑此页'
    }
  },

  sitemap: {
    hostname: 'https://john.github.io'
  }
})
```

## 📤 部署步骤

1. **推送代码**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

2. **启用 GitHub Pages**
   - 进入仓库 Settings > Pages
   - Source 选择 "GitHub Actions"

3. **等待部署完成**
   - 查看 Actions 标签页的部署进度
   - 首次部署需要 2-5 分钟

## 🌐 访问地址

- **仓库名为 `<username>.github.io`**: `https://username.github.io`
- **其他仓库名**: `https://username.github.io/repo-name`

## 🔍 常见问题

- **404 错误**: 检查 `base` 配置是否正确
- **样式丢失**: 通常也是 `base` 路径问题
- **构建失败**: 查看 Actions 日志，确保本地构建成功

---

完成所有检查项后，你的博客就可以成功部署了！🎉
