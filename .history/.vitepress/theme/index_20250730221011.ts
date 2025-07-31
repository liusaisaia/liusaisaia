import DefaultTheme from 'vitepress/theme'
import './custom.css'
import GradientBackground from './components/GradientBackground.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('GradientBackground', GradientBackground)
  }
}
