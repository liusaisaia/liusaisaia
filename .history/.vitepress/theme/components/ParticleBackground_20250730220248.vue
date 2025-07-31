<template>
  <div class="particle-background">
    <canvas ref="canvasRef" class="particle-canvas" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref()
let animationId = null
let particles = []
let mouse = { x: 0, y: 0 }

class Particle {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.size = Math.random() * 3 + 1
    this.speedX = Math.random() * 3 - 1.5
    this.speedY = Math.random() * 3 - 1.5
    this.opacity = Math.random() * 0.5 + 0.2
    this.life = 1
    this.decay = Math.random() * 0.02 + 0.005
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY
    this.life -= this.decay
    this.opacity = this.life * 0.5

    if (this.life <= 0) {
      return false
    }
    return true
  }

  draw(ctx) {
    ctx.save()
    ctx.globalAlpha = this.opacity
    ctx.fillStyle = '#3c82f6'
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
}

const createParticle = (x, y) => {
  particles.push(new Particle(x, y))
}

const animate = (ctx, canvas) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 更新和绘制粒子
  particles = particles.filter(particle => {
    const alive = particle.update()
    if (alive) {
      particle.draw(ctx)
    }
    return alive
  })

  animationId = requestAnimationFrame(() => animate(ctx, canvas))
}

const handleMouseMove = (e) => {
  const rect = canvasRef.value.getBoundingClientRect()
  mouse.x = e.clientX - rect.left
  mouse.y = e.clientY - rect.top

  // 创建粒子
  if (Math.random() < 0.3) {
    createParticle(mouse.x, mouse.y)
  }
}

const resizeCanvas = () => {
  const canvas = canvasRef.value
  if (canvas) {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
}

onMounted(() => {
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')

  resizeCanvas()

  canvas.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('resize', resizeCanvas)

  animate(ctx, canvas)
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }

  const canvas = canvasRef.value
  if (canvas) {
    canvas.removeEventListener('mousemove', handleMouseMove)
  }
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<style scoped>
.particle-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.particle-canvas {
  width: 100%;
  height: 100%;
}

@media (max-width: 768px) {
  .particle-background {
    display: none;
  }
}
</style>
