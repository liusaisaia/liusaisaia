# 部署检查指南

## 🔍 检查步骤

### 1. 确认访问地址
你的博客应该在以下地址之一可访问：
- `https://liusaisaia.github.io/` （推荐）
- `https://liusaisaia.github.io/liusaisaia/`

### 2. 检查资源加载
1. 打开浏览器开发者工具（按F12）
2. 切换到 **Network** 标签
3. 刷新页面
4. 查看是否有红色的404错误

### 3. 常见问题和解决方案

#### 问题1：CSS文件404错误
如果看到类似 `/assets/style.xxx.css` 的404错误：
- 当前配置：无base路径
- 解决方案：需要添加 `base: '/liusaisaia/'`

#### 问题2：JS文件404错误
如果看到类似 `/assets/app.xxx.js` 的404错误：
- 说明base路径配置不正确

### 4. 快速修复
根据你看到的错误，我会调整配置：

**如果访问 https://liusaisaia.github.io/ 有样式：**
- 当前配置正确

**如果访问 https://liusaisaia.github.io/liusaisaia/ 有样式：**
- 需要添加 `base: '/liusaisaia/'`

请告诉我具体的错误信息！
