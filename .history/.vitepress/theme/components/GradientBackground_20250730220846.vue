<template>
  <div class="gradient-background">
    <div
      class="gradient-orb"
      :style="{
        background: `radial-gradient(circle at ${mouseX}px ${mouseY}px,
          rgba(59, 130, 246, 0.3) 0%,
          rgba(147, 51, 234, 0.2) 25%,
          rgba(236, 72, 153, 0.15) 50%,
          transparent 70%)`
      }"
    />
    <div
      class="gradient-orb secondary"
      :style="{
        background: `radial-gradient(circle at ${mouseX + 200}px ${mouseY + 100}px,
          rgba(168, 85, 247, 0.25) 0%,
          rgba(59, 130, 246, 0.15) 40%,
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
  mouseX.value = lerp(mouseX.value, targetX, 0.05)
  mouseY.value = lerp(mouseY.value, targetY, 0.05)

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
  z-index: -1;
  overflow: hidden;
}

.gradient-orb {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: background 0.3s ease;
}

.gradient-orb.secondary {
  opacity: 0.7;
}

/* 深色模式下的效果 */
.dark .gradient-orb {
  opacity: 0.6;
}

.dark .gradient-orb.secondary {
  opacity: 0.4;
}

@media (max-width: 768px) {
  .gradient-background {
    display: none;
  }
}
</style>
