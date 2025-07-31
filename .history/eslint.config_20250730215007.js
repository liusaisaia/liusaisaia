import antfu from '@antfu/eslint-config'

export default antfu({
  // 启用 Vue 支持
  vue: true,

  // 启用 TypeScript 支持
  typescript: true,

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
    // Markdown 文件中允许重复标题
    'markdown/no-duplicate-headings': 'off'
  }
})
