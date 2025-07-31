<template>
  <div class="mouse-follower" ref="follower" :style="followerStyle">
    <div class="follower-dot"></div>
    <div class="follower-ring"></div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const follower = ref(null)
const mouse = reactive({ x: 0, y: 0 })
const followerPos = reactive({ x: 0, y: 0 })
const isHovering = ref(false)

const followerStyle = reactive({
  transform: 'translate3d(0px, 0px, 0px)',
  opacity: 0
})

let animationId = null

const updateMousePosition = (e) => {
  mouse.x = e.clientX
  mouse.y = e.clientY
}

const updateFollowerPosition = () => {
  const speed = 0.15

  followerPos.x += (mouse.x - followerPos.x) * speed
  followerPos.y += (mouse.y - followerPos.y) * speed

  followerStyle.transform = `translate3d(${followerPos.x - 20}px, ${followerPos.y - 20}px, 0px)`

  animationId = requestAnimationFrame(updateFollowerPosition)
}

const handleMouseEnter = () => {
  followerStyle.opacity = 1
}

const handleMouseLeave = () => {
  followerStyle.opacity = 0
}

const handleLinkHover = (e) => {
  if (e.target.tagName === 'A' || e.target.closest('a') || e.target.closest('button')) {
    isHovering.value = true
    follower.value?.classList.add('hovering')
  } else {
    isHovering.value = false
    follower.value?.classList.remove('hovering')
  }
}

onMounted(() => {
  document.addEventListener('mousemove', updateMousePosition)
  document.addEventListener('mouseenter', handleMouseEnter)
  document.addEventListener('mouseleave', handleMouseLeave)
  document.addEventListener('mouseover', handleLinkHover)

  updateFollowerPosition()
})

onUnmounted(() => {
  document.removeEventListener('mousemove', updateMousePosition)
  document.removeEventListener('mouseenter', handleMouseEnter)
  document.removeEventListener('mouseleave', handleMouseLeave)
  document.removeEventListener('mouseover', handleLinkHover)

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
  pointer-events: none;
  z-index: 9999;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.follower-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 6px;
  height: 6px;
  background: var(--vp-c-brand);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.2s ease;
}

.follower-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  border: 2px solid var(--vp-c-brand);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.3;
  transition: all 0.3s ease;
}

.mouse-follower.hovering .follower-dot {
  transform: translate(-50%, -50%) scale(1.5);
  background: var(--vp-c-brand-light);
}

.mouse-follower.hovering .follower-ring {
  transform: translate(-50%, -50%) scale(1.5);
  opacity: 0.6;
  border-color: var(--vp-c-brand-light);
}

/* 在移动设备上隐藏 */
@media (max-width: 768px) {
  .mouse-follower {
    display: none;
  }
}

/* 暗色主题适配 */
.dark .follower-dot {
  background: var(--vp-c-brand-light);
}

.dark .follower-ring {
  border-color: var(--vp-c-brand-light);
}
</style>
