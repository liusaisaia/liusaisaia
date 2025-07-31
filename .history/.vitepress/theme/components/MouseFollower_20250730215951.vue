<template>
  <div
    ref="followerRef"
    class="mouse-follower"
    :style="{
      transform: `translate(${x}px, ${y}px)`,
      opacity: isVisible ? 1 : 0
    }"
  />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const followerRef = ref()
const x = ref(0)
const y = ref(0)
const isVisible = ref(false)

let animationId = null

const updatePosition = (clientX, clientY) => {
  const targetX = clientX - 20
  const targetY = clientY - 20

  const lerp = (start, end, factor) => start + (end - start) * factor

  const animate = () => {
    x.value = lerp(x.value, targetX, 0.1)
    y.value = lerp(y.value, targetY, 0.1)

    if (Math.abs(x.value - targetX) > 0.1 || Math.abs(y.value - targetY) > 0.1) {
      animationId = requestAnimationFrame(animate)
    }
  }

  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  animate()
}

const handleMouseMove = (e) => {
  updatePosition(e.clientX, e.clientY)
}

const handleMouseEnter = () => {
  isVisible.value = true
}

const handleMouseLeave = () => {
  isVisible.value = false
}

onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseenter', handleMouseEnter)
  document.addEventListener('mouseleave', handleMouseLeave)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseenter', handleMouseEnter)
  document.removeEventListener('mouseleave', handleMouseLeave)
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<style scoped>
.mouse-follower {
  position: fixed;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transition: opacity 0.3s ease;
  mix-blend-mode: multiply;
}

@media (max-width: 768px) {
  .mouse-follower {
    display: none;
  }
}
</style>
