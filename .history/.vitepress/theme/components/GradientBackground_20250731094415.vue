<template>
  <div class="gradient-background">
    <!-- 主渐变球 -->
    <div
      class="gradient-orb primary"
      :style="{
        background: `radial-gradient(circle 800px at ${mouseX}px ${mouseY}px,
          rgba(59, 130, 246, 0.15) 0%,
          rgba(147, 51, 234, 0.1) 30%,
          rgba(236, 72, 153, 0.08) 50%,
          transparent 70%)`
      }"
    />

    <!-- 次要渐变球 -->
    <div
      class="gradient-orb secondary"
      :style="{
        background: `radial-gradient(circle 600px at ${mouseX - 300}px ${mouseY + 200}px,
          rgba(168, 85, 247, 0.12) 0%,
          rgba(59, 130, 246, 0.08) 40%,
          transparent 70%)`
      }"
    />

    <!-- 第三个渐变球 -->
    <div
      class="gradient-orb tertiary"
      :style="{
        background: `radial-gradient(circle 500px at ${mouseX + 400}px ${mouseY - 100}px,
          rgba(34, 197, 94, 0.1) 0%,
          rgba(59, 130, 246, 0.06) 50%,
          transparent 70%)`
      }"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const mouseX = ref(0)
const mouseY = ref(0)

let animationId = null
let targetX = 0
let targetY = 0

const lerp = (start, end, factor) => start + (end - start) * factor

const animate = () => {
  mouseX.value = lerp(mouseX.value, targetX, 0.03)
  mouseY.value = lerp(mouseY.value, targetY, 0.03)

  animationId = requestAnimationFrame(animate)
}

const handleMouseMove = (e) => {
  targetX = e.clientX
  targetY = e.clientY
}

onMounted(() => {
  // 初始位置设置在屏幕中央
  targetX = window.innerWidth / 2
  targetY = window.innerHeight / 2
  mouseX.value = targetX
  mouseY.value = targetY

  document.addEventListener('mousemove', handleMouseMove)
  animate()
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<style scoped>
.gradient-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.gradient-orb {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  will-change: background;
}

.gradient-orb.primary {
  opacity: 1;
}

.gradient-orb.secondary {
  opacity: 0.8;
}

.gradient-orb.tertiary {
  opacity: 0.6;
}

/* 深色模式下的效果 */
.dark .gradient-orb.primary {
  opacity: 0.7;
}

.dark .gradient-orb.secondary {
  opacity: 0.5;
}

.dark .gradient-orb.tertiary {
  opacity: 0.4;
}

@media (max-width: 768px) {
  .gradient-background {
    opacity: 0.5;
  }
}

@media (prefers-reduced-motion: reduce) {
  .gradient-background {
    display: none;
  }
}
</style>
