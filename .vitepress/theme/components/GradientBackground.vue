<template>
  <div class="gradient-background">
    <div class="gradient-layer gradient-1"></div>
    <div class="gradient-layer gradient-2"></div>
    <div class="gradient-layer gradient-3"></div>
  </div>
</template>

<script setup>
// 渐变背景组件
</script>

<style scoped>
.gradient-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.gradient-layer {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  animation: gradientShift 20s ease-in-out infinite;
}

.gradient-1 {
  background: linear-gradient(45deg,
    rgba(59, 130, 246, 0.1) 0%,
    rgba(147, 197, 253, 0.05) 25%,
    rgba(219, 234, 254, 0.02) 50%,
    rgba(59, 130, 246, 0.05) 75%,
    rgba(147, 197, 253, 0.1) 100%);
  animation-delay: 0s;
}

.gradient-2 {
  background: linear-gradient(135deg,
    rgba(147, 197, 253, 0.08) 0%,
    rgba(59, 130, 246, 0.03) 25%,
    rgba(219, 234, 254, 0.05) 50%,
    rgba(147, 197, 253, 0.02) 75%,
    rgba(59, 130, 246, 0.08) 100%);
  animation-delay: -7s;
}

.gradient-3 {
  background: linear-gradient(225deg,
    rgba(219, 234, 254, 0.06) 0%,
    rgba(59, 130, 246, 0.02) 25%,
    rgba(147, 197, 253, 0.04) 50%,
    rgba(219, 234, 254, 0.03) 75%,
    rgba(59, 130, 246, 0.06) 100%);
  animation-delay: -14s;
}

@keyframes gradientShift {
  0%, 100% {
    transform: translateX(0%) translateY(0%) rotate(0deg);
    opacity: 0.8;
  }
  25% {
    transform: translateX(5%) translateY(-5%) rotate(1deg);
    opacity: 0.6;
  }
  50% {
    transform: translateX(-3%) translateY(3%) rotate(-0.5deg);
    opacity: 0.9;
  }
  75% {
    transform: translateX(2%) translateY(-2%) rotate(0.5deg);
    opacity: 0.7;
  }
}

/* 暗色主题适配 */
.dark .gradient-1 {
  background: linear-gradient(45deg,
    rgba(59, 130, 246, 0.05) 0%,
    rgba(147, 197, 253, 0.02) 25%,
    rgba(219, 234, 254, 0.01) 50%,
    rgba(59, 130, 246, 0.03) 75%,
    rgba(147, 197, 253, 0.05) 100%);
}

.dark .gradient-2 {
  background: linear-gradient(135deg,
    rgba(147, 197, 253, 0.04) 0%,
    rgba(59, 130, 246, 0.015) 25%,
    rgba(219, 234, 254, 0.025) 50%,
    rgba(147, 197, 253, 0.01) 75%,
    rgba(59, 130, 246, 0.04) 100%);
}

.dark .gradient-3 {
  background: linear-gradient(225deg,
    rgba(219, 234, 254, 0.03) 0%,
    rgba(59, 130, 246, 0.01) 25%,
    rgba(147, 197, 253, 0.02) 50%,
    rgba(219, 234, 254, 0.015) 75%,
    rgba(59, 130, 246, 0.03) 100%);
}
</style>
