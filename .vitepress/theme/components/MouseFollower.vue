<template>
  <div class="mouse-follower-container">
    <!-- 主跟随器 -->
    <div
      ref="mainFollowerRef"
      class="mouse-follower main"
      :style="{
        transform: `translate(${mainX}px, ${mainY}px) scale(${scale})`,
        opacity: isVisible ? 1 : 0
      }"
    />

    <!-- 延迟跟随器 -->
    <div
      ref="delayFollowerRef"
      class="mouse-follower delay"
      :style="{
        transform: `translate(${delayX}px, ${delayY}px)`,
        opacity: isVisible ? 0.6 : 0
      }"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const mainFollowerRef = ref()
const delayFollowerRef = ref()
const mainX = ref(0)
const mainY = ref(0)
const delayX = ref(0)
const delayY = ref(0)
const scale = ref(1)
const isVisible = ref(false)

let animationId = null
let targetX = 0
let targetY = 0

const lerp = (start, end, factor) => start + (end - start) * factor

const animate = () => {
  // 主跟随器快速跟随
  mainX.value = lerp(mainX.value, targetX - 15, 0.15)
  mainY.value = lerp(mainY.value, targetY - 15, 0.15)

  // 延迟跟随器慢速跟随
  delayX.value = lerp(delayX.value, targetX - 25, 0.05)
  delayY.value = lerp(delayY.value, targetY - 25, 0.05)

  animationId = requestAnimationFrame(animate)
}

const handleMouseMove = (e) => {
  targetX = e.clientX
  targetY = e.clientY

  if (!isVisible.value) {
    isVisible.value = true
  }
}

const handleMouseEnter = (e) => {
  const target = e.target

  // 检查是否悬停在可交互元素上
  if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.classList.contains('VPButton')) {
    scale.value = 1.5
  } else {
    scale.value = 1
  }
}

const handleMouseLeave = () => {
  scale.value = 1
}

const handleDocumentMouseLeave = () => {
  isVisible.value = false
}

onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseenter', handleMouseEnter, true)
  document.addEventListener('mouseleave', handleMouseLeave, true)
  document.addEventListener('mouseleave', handleDocumentMouseLeave)

  animate()
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseenter', handleMouseEnter, true)
  document.removeEventListener('mouseleave', handleMouseLeave, true)
  document.removeEventListener('mouseleave', handleDocumentMouseLeave)

  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<style scoped>
.mouse-follower-container {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
}

.mouse-follower {
  position: fixed;
  top: 0;
  left: 0;
  border-radius: 50%;
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.1s ease;
}

.mouse-follower.main {
  width: 30px;
  height: 30px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%);
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.mouse-follower.delay {
  width: 50px;
  height: 50px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%);
}

/* 深色模式适配 */
.dark .mouse-follower.main {
  background: radial-gradient(circle, rgba(96, 165, 250, 0.3) 0%, rgba(96, 165, 250, 0.15) 50%, transparent 100%);
  border: 1px solid rgba(96, 165, 250, 0.4);
}

.dark .mouse-follower.delay {
  background: radial-gradient(circle, rgba(96, 165, 250, 0.15) 0%, rgba(96, 165, 250, 0.08) 50%, transparent 100%);
}

@media (max-width: 768px) {
  .mouse-follower-container {
    display: none;
  }
}

@media (hover: none) {
  .mouse-follower-container {
    display: none;
  }
}
</style>
