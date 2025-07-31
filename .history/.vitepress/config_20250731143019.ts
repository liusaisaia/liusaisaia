import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '我的博客',
  description: '一个使用 VitePress 构建的个人博客',

  // GitHub Pages 部署配置
  // 如果你的仓库名不是 <username>.github.io，需要设置 base
  // base: '/your-repo-name/',

  // 主题配置
  themeConfig: {
    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '博客', link: '/blog/' },
      { text: '关于', link: '/about' }
    ],

    // 侧边栏
    sidebar: {
      '/blog/': [
        {
          text: '最新文章',
          items: [
            { text: 'Hello World - 我的第一篇博客', link: '/blog/hello-world' },
            { text: 'VitePress 入门指南', link: '/blog/vitepress-getting-started' },
            { text: 'Vue 3 Composition API 深入解析', link: '/blog/vue3-composition-api' }
          ]
        }
      ]
    },

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/[your-username]' }
    ],

    // 页脚
    footer: {
      message: '基于 VitePress 构建',
      copyright: 'Copyright © 2024 我的博客'
    },

    // 搜索
    search: {
      provider: 'local'
    },

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/[your-username]/[your-repo]/edit/main/:path',
      text: '在 GitHub 上编辑此页'
    },

    // 最后更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    }
  },

  // 头部配置
  head: [
    ['meta', { name: 'theme-color', content: '#3c82f6' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  // Markdown 配置
  markdown: {
    theme: 'github-dark',
    lineNumbers: true
  },

  // 站点地图
  sitemap: {
    hostname: 'https://your-username.github.io'
  },

  // 清理 URL
  cleanUrls: true
})
