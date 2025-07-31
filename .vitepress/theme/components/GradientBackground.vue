<template>
  <div class="nuxt-background">
    <!-- 网格背景 -->
    <div class="grid-background"></div>

    <!-- 动态渐变光斑 -->
    <div class="gradient-orbs">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
      <div class="orb orb-4"></div>
    </div>

    <!-- 顶部渐变遮罩 -->
    <div class="gradient-overlay"></div>
  </div>
</template>

<script setup>
// Nuxt风格背景组件
</script>

<style scoped>
.nuxt-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
}

/* 网格背景 */
.grid-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.4;
  background-image:
    linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: gridMove 20s linear infinite;
}

@keyframes gridMove {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(50px, 50px);
  }
}

/* 动态渐变光斑 */
.gradient-orbs {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.6;
  animation: float 15s ease-in-out infinite;
}

.orb-1 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 197, 253, 0.2));
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(59, 130, 246, 0.2));
  top: 60%;
  right: 10%;
  animation-delay: -5s;
}

.orb-3 {
  width: 250px;
  height: 250px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.3));
  bottom: 20%;
  left: 20%;
  animation-delay: -10s;
}

.orb-4 {
  width: 350px;
  height: 350px;
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(139, 92, 246, 0.2));
  top: 30%;
  right: 30%;
  animation-delay: -7s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(30px, -30px) scale(1.1);
  }
  50% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  75% {
    transform: translate(20px, -10px) scale(1.05);
  }
}

/* 顶部渐变遮罩 */
.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(255, 255, 255, 0.4) 50%,
    rgba(255, 255, 255, 0.1) 100%
  );
  pointer-events: none;
}

/* 暗色主题适配 */
.dark .nuxt-background {
  background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
}

.dark .grid-background {
  background-image:
    linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px);
  opacity: 0.3;
}

.dark .orb-1 {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 197, 253, 0.1));
}

.dark .orb-2 {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(59, 130, 246, 0.15));
}

.dark .orb-3 {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.2));
}

.dark .orb-4 {
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(139, 92, 246, 0.15));
}

.dark .gradient-overlay {
  background: linear-gradient(
    180deg,
    rgba(15, 23, 42, 0.8) 0%,
    rgba(15, 23, 42, 0.4) 50%,
    rgba(15, 23, 42, 0.1) 100%
  );
}

/* 响应式优化 */
@media (max-width: 768px) {
  .grid-background {
    background-size: 30px 30px;
  }

  .orb {
    filter: blur(40px);
  }

  .orb-1, .orb-2, .orb-3, .orb-4 {
    width: 200px;
    height: 200px;
  }
}
</style>
