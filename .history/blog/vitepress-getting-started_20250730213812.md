# VitePress 入门指南

::: info 文章信息
- 发布时间: 2024-01-20
- 分类: 技术
- 标签: VitePress, Vue, 静态站点
:::

VitePress 是一个基于 Vite 和 Vue 的静态站点生成器，专为文档和博客而设计。它提供了出色的开发体验和优秀的性能。

## 什么是 VitePress？

VitePress 是 VuePress 的精神继承者，它基于 Vite 构建，提供了：

- **极快的开发服务器** - 基于 Vite 的热重载
- **优化的构建** - 生产环境的性能优化
- **Vue 3 支持** - 使用最新的 Vue 3 特性
- **Markdown 增强** - 丰富的 Markdown 扩展
- **主题系统** - 灵活的主题定制

## 快速开始

### 安装

使用 pnpm 创建新项目：

```bash
# 创建项目目录
mkdir my-blog && cd my-blog

# 初始化项目
pnpm init

# 安装 VitePress
pnpm add -D vitepress
```

### 项目结构

创建基本的项目结构：

```
my-blog/
├── .vitepress/
│   └── config.ts          # 配置文件
├── blog/
│   ├── index.md           # 博客首页
│   └── my-first-post.md   # 博客文章
├── index.md               # 网站首页
└── package.json
```

### 配置文件

创建 `.vitepress/config.ts`：

```typescript
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '我的博客',
  description: '一个使用 VitePress 构建的博客',

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '博客', link: '/blog/' }
    ],

    sidebar: {
      '/blog/': [
        {
          text: '文章',
          items: [
            { text: '我的第一篇文章', link: '/blog/my-first-post' }
          ]
        }
      ]
    }
  }
})
```

## 核心功能

### 1. Markdown 增强

VitePress 提供了丰富的 Markdown 扩展：

#### 代码块高亮

```javascript
// 支持语法高亮
function hello() {
  console.log('Hello VitePress!')
}
```

#### 自定义容器

::: tip 提示
这是一个提示容器
:::

::: warning 警告
这是一个警告容器
:::

::: danger 危险
这是一个危险容器
:::

#### 表格支持

| 特性 | VitePress | 其他工具 |
|------|-----------|----------|
| 速度 | ⚡ 极快 | 🐌 较慢 |
| Vue 支持 | ✅ 原生 | ❌ 需要插件 |
| 主题 | 🎨 灵活 | 🔧 复杂 |

### 2. 主题配置

#### 导航栏配置

```typescript
themeConfig: {
  nav: [
    { text: '首页', link: '/' },
    { text: '指南', link: '/guide/' },
    {
      text: '更多',
      items: [
        { text: 'GitHub', link: 'https://github.com' },
        { text: '关于', link: '/about' }
      ]
    }
  ]
}
```

#### 侧边栏配置

```typescript
sidebar: {
  '/guide/': [
    {
      text: '基础',
      items: [
        { text: '介绍', link: '/guide/introduction' },
        { text: '快速开始', link: '/guide/getting-started' }
      ]
    },
    {
      text: '进阶',
      items: [
        { text: '配置', link: '/guide/configuration' },
        { text: '主题', link: '/guide/theming' }
      ]
    }
  ]
}
```

### 3. 搜索功能

启用本地搜索：

```typescript
export default defineConfig({
  themeConfig: {
    search: {
      provider: 'local'
    }
  }
})
```

### 4. 社交链接

```typescript
socialLinks: [
  { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
  { icon: 'twitter', link: '...' },
  { icon: 'discord', link: '...' }
]
```

## 高级特性

### 1. 自定义主题

创建自定义主题：

```typescript
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件
  }
}
```

### 2. Vue 组件

在 Markdown 中使用 Vue 组件：

```vue
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button @click="count++">
    点击次数: {{ count }}
  </button>
</template>
```

### 3. 构建钩子

```typescript
export default defineConfig({
  buildEnd(siteConfig) {
    // 构建完成后的钩子
  }
})
```

## 部署

### Vercel 部署

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 设置构建命令：`pnpm build`
4. 设置输出目录：`.vitepress/dist`

### Netlify 部署

1. 连接 GitHub 仓库
2. 构建命令：`pnpm build`
3. 发布目录：`.vitepress/dist`

### GitHub Pages

```yaml
# .github/workflows/deploy.yml
name: Deploy
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
      - run: pnpm install
      - run: pnpm build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: .vitepress/dist
```

## 性能优化

### 1. 图片优化

```markdown
![图片描述](./image.jpg)
<!-- 或使用 HTML -->
<img src="./image.jpg" alt="图片描述" loading="lazy">
```

### 2. 代码分割

VitePress 自动进行代码分割，无需额外配置。

### 3. 预加载

```typescript
export default defineConfig({
  head: [
    ['link', { rel: 'preload', href: '/font.woff2', as: 'font', type: 'font/woff2', crossorigin: '' }]
  ]
})
```

## 最佳实践

### 1. 文件组织

```
docs/
├── .vitepress/
├── guide/
│   ├── index.md
│   └── getting-started.md
├── blog/
│   ├── index.md
│   └── posts/
└── public/
    └── images/
```

### 2. SEO 优化

```typescript
export default defineConfig({
  head: [
    ['meta', { name: 'keywords', content: 'VitePress, Vue, 博客' }],
    ['meta', { property: 'og:title', content: '我的博客' }],
    ['meta', { property: 'og:description', content: '博客描述' }]
  ]
})
```

### 3. 国际化

```typescript
export default defineConfig({
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN'
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/'
    }
  }
})
```

## 总结

VitePress 是一个功能强大且易于使用的静态站点生成器，特别适合：

- 📚 **技术文档** - 清晰的结构和导航
- 📝 **个人博客** - 专注内容的写作体验
- 🏢 **团队知识库** - 协作友好的 Markdown 格式
- 🎓 **教程网站** - 丰富的 Markdown 扩展

通过本文的介绍，你应该已经掌握了 VitePress 的基本使用方法。在下一篇文章中，我将分享更多高级技巧和实战经验。

---

*如果你在使用 VitePress 过程中遇到问题，欢迎在评论区讨论！*
