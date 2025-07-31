<template>
  <div class="particle-background" ref="particleContainer">
    <canvas ref="canvas" class="particle-canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)
const particleContainer = ref(null)
let animationId = null
let particles = []

class Particle {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.size = Math.random() * 3 + 1
    this.speedX = Math.random() * 2 - 1
    this.speedY = Math.random() * 2 - 1
    this.opacity = Math.random() * 0.5 + 0.2
    this.life = Math.random() * 100 + 50
    this.maxLife = this.life
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY
    this.life--
    this.opacity = (this.life / this.maxLife) * 0.5

    if (this.life <= 0) {
      this.reset()
    }
  }

  reset() {
    this.x = Math.random() * canvas.value.width
    this.y = Math.random() * canvas.value.height
    this.life = this.maxLife
    this.opacity = Math.random() * 0.5 + 0.2
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

const initParticles = () => {
  particles = []
  const particleCount = Math.min(50, Math.floor((canvas.value.width * canvas.value.height) / 10000))

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(
      Math.random() * canvas.value.width,
      Math.random() * canvas.value.height
    ))
  }
}

const animate = () => {
  const ctx = canvas.value.getContext('2d')
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  particles.forEach(particle => {
    particle.update()
    particle.draw(ctx)
  })

  // 绘制连接线
  particles.forEach((particle, i) => {
    particles.slice(i + 1).forEach(otherParticle => {
      const distance = Math.sqrt(
        Math.pow(particle.x - otherParticle.x, 2) +
        Math.pow(particle.y - otherParticle.y, 2)
      )

      if (distance < 100) {
        ctx.save()
        ctx.globalAlpha = (1 - distance / 100) * 0.2
        ctx.strokeStyle = '#3c82f6'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(particle.x, particle.y)
        ctx.lineTo(otherParticle.x, otherParticle.y)
        ctx.stroke()
        ctx.restore()
      }
    })
  })

  animationId = requestAnimationFrame(animate)
}

const resizeCanvas = () => {
  if (canvas.value && particleContainer.value) {
    canvas.value.width = particleContainer.value.offsetWidth
    canvas.value.height = particleContainer.value.offsetHeight
    initParticles()
  }
}

onMounted(() => {
  resizeCanvas()
  animate()

  window.addEventListener('resize', resizeCanvas)
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
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
  z-index: -2;
  pointer-events: none;
}

.particle-canvas {
  width: 100%;
  height: 100%;
  opacity: 0.6;
}

.dark .particle-canvas {
  opacity: 0.3;
}
</style>
