# VitePress 入门指南

::: info 文章信息
- **发布时间**: 2024-01-20
- **分类**: 技术
- **标签**: VitePress, 博客搭建, 静态站点
:::

VitePress 是一个基于 Vite 和 Vue 3 的静态站点生成器，专为技术文档和博客而设计。它提供了出色的开发体验和优秀的性能表现。

## 什么是 VitePress？

VitePress 是 VuePress 的精神继承者，它具有以下特点：

### 核心优势

::: tip VitePress 的优势
- **极速开发** - 基于 Vite，提供闪电般的热重载
- **Vue 3 驱动** - 使用最新的 Vue 3 Composition API
- **Markdown 优先** - 专注于内容创作，使用 Markdown 编写
- **主题系统** - 灵活的主题定制能力
- **SEO 友好** - 静态站点生成，搜索引擎优化良好
:::

### 适用场景

- 📚 **技术文档** - API 文档、使用指南
- 📝 **个人博客** - 技术博客、学习笔记
- 🏢 **团队知识库** - 内部文档、最佳实践
- 🎓 **教程网站** - 在线课程、学习资源

## 快速开始

### 1. 创建项目

```bash
# 使用 pnpm 创建项目
mkdir my-vitepress-blog
cd my-vitepress-blog
pnpm init

# 安装 VitePress
pnpm add -D vitepress
```

### 2. 初始化配置

```bash
# 运行初始化向导
npx vitepress init
```

### 3. 项目结构

```
my-vitepress-blog/
├── .vitepress/
│   ├── config.ts          # 配置文件
│   └── theme/             # 自定义主题
├── blog/                  # 博客文章
├── public/                # 静态资源
├── index.md               # 首页
└── package.json
```

## 配置详解

### 基础配置

```typescript
// .vitepress/config.ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '我的博客',
  description: '一个技术博客',

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '博客', link: '/blog/' },
      { text: '关于', link: '/about' }
    ],

    sidebar: {
      '/blog/': [
        {
          text: '文章列表',
          items: [
            { text: '文章1', link: '/blog/article1' },
            { text: '文章2', link: '/blog/article2' }
          ]
        }
      ]
    }
  }
})
```

### 高级配置

```typescript
export default defineConfig({
  // 头部配置
  head: [
    ['meta', { name: 'theme-color', content: '#3c82f6' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  // Markdown 配置
  markdown: {
    theme: 'github-dark',
    lineNumbers: true,
    config: (md) => {
      // 添加自定义 markdown 插件
    }
  },

  // 构建配置
  build: {
    outDir: 'dist'
  }
})
```

## Markdown 增强功能

VitePress 提供了丰富的 Markdown 扩展功能：

### 1. 容器

::: info 信息提示
这是一个信息提示框
:::

::: tip 小贴士
这是一个小贴士
:::

::: warning 警告
这是一个警告信息
:::

::: danger 危险
这是一个危险警告
:::

### 2. 代码块增强

```javascript{1,3-5}
// 高亮特定行
function hello() {
  console.log('Hello VitePress!')
  console.log('这些行会被高亮')
  console.log('非常实用的功能')
}
```

### 3. 表格

| 特性 | VitePress | VuePress | Docusaurus |
|------|-----------|----------|------------|
| 构建速度 | ⚡ 极快 | 🐌 较慢 | 🚀 快 |
| Vue 版本 | Vue 3 | Vue 2/3 | React |
| 学习成本 | 低 | 中 | 中 |

### 4. 数学公式

支持 LaTeX 数学公式：

$$
E = mc^2
$$

## 主题定制

### 1. 自定义样式

```css
/* .vitepress/theme/custom.css */
:root {
  --vp-c-brand: #3c82f6;
  --vp-c-brand-light: #60a5fa;
  --vp-c-brand-lighter: #93c5fd;
}
```

### 2. 自定义组件

```vue
<!-- .vitepress/theme/components/MyComponent.vue -->
<template>
  <div class="my-component">
    <h3>自定义组件</h3>
    <p>这是一个自定义的 Vue 组件</p>
  </div>
</template>
```

### 3. 扩展默认主题

```typescript
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import MyComponent from './components/MyComponent.vue'
import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('MyComponent', MyComponent)
  }
}
```

## 部署指南

### 1. GitHub Pages

```yaml
# .github/workflows/deploy.yml
name: Deploy VitePress site to Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: actions/deploy-pages@v2
        with:
          artifact_name: github-pages
          folder: .vitepress/dist
```

### 2. Vercel 部署

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".vitepress/dist"
}
```

### 3. Netlify 部署

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".vitepress/dist"
```

## 性能优化

### 1. 图片优化

```markdown
<!-- 使用 WebP 格式 -->
![图片描述](./image.webp)

<!-- 响应式图片 -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="图片描述">
</picture>
```

### 2. 代码分割

```typescript
// 动态导入组件
const HeavyComponent = () => import('./HeavyComponent.vue')
```

### 3. 预加载优化

```typescript
export default defineConfig({
  head: [
    ['link', { rel: 'preload', href: '/fonts/font.woff2', as: 'font', type: 'font/woff2', crossorigin: '' }]
  ]
})
```

## 最佳实践

### 1. 文件组织

```
blog/
├── frontend/
│   ├── vue/
│   └── react/
├── backend/
│   ├── nodejs/
│   └── python/
└── tools/
    ├── vscode/
    └── git/
```

### 2. 内容规范

- 使用有意义的文件名
- 添加适当的元数据
- 保持一致的写作风格
- 定期更新和维护内容

### 3. SEO 优化

```markdown
---
title: 文章标题
description: 文章描述
head:
  - - meta
    - name: keywords
      content: 关键词1, 关键词2
---
```

## 总结

VitePress 是一个优秀的静态站点生成器，特别适合创建技术博客和文档网站。它的主要优势包括：

- 🚀 **极速开发体验**
- 📝 **专注内容创作**
- 🎨 **灵活的定制能力**
- 📱 **优秀的移动端体验**
- 🔍 **良好的 SEO 支持**

通过本文的介绍，你应该已经掌握了 VitePress 的基本使用方法。在下一篇文章中，我将分享更多高级技巧和实战经验。

---

*相关文章推荐：*
- [Vue 3 Composition API 深入解析](/blog/vue3-composition-api)
- [现代前端工具链完全指南](/blog/modern-frontend-toolchain)
