import DefaultTheme from 'vitepress/theme'
import './custom.css'
import MouseFollower from './components/MouseFollower.vue'
import ParticleBackground from './components/ParticleBackground.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('MouseFollower', MouseFollower)
    app.component('ParticleBackground', ParticleBackground)
  }
}
