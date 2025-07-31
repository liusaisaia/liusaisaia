import antfu from '@antfu/eslint-config'

export default antfu({
  // 启用 Vue 支持
  vue: true,

  // 启用 TypeScript 支持
  typescript: true,

  // 启用 Markdown 支持
  markdown: true,

  // 格式化配置
  formatters: {
    css: true,
    html: true,
    markdown: 'prettier'
  },

  // 忽略文件
  ignores: [
    'dist',
    'node_modules',
    '.vitepress/dist',
    '.vitepress/cache'
  ]
}, {
  // 自定义规则
  rules: {
    // 可以在这里添加自定义规则
  }
})
