import DefaultTheme from 'vitepress/theme'
import './custom.css'
import MouseFollower from './components/MouseFollower.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('MouseFollower', MouseFollower)
  }
}
