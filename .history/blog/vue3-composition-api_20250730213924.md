# Vue 3 Composition API 深入解析

::: info 文章信息
- 发布时间: 2024-01-25
- 分类: 技术
- 标签: Vue3, Composition API, JavaScript
:::

Vue 3 引入了 Composition API，这是一个全新的 API 设计，为我们提供了更灵活的组件逻辑组织方式。

## 什么是 Composition API？

Composition API 是 Vue 3 中的一套新的 API，它允许我们使用函数的方式来组织组件逻辑，而不是像 Options API 那样使用对象选项。

### 主要优势

::: tip Composition API 的优势
1. **更好的逻辑复用** - 通过组合函数实现逻辑复用
2. **更好的类型推导** - TypeScript 支持更好
3. **更灵活的代码组织** - 相关逻辑可以组织在一起
4. **更小的打包体积** - 支持 tree-shaking
:::

## 基本用法

### setup 函数

`setup` 是 Composition API 的入口点：

```vue
<template>
  <div>
    <p>计数：{{ count }}</p>
    <button @click="increment">增加</button>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    const increment = () => {
      count.value++
    }

    return {
      count,
      increment
    }
  }
}
</script>
```

### `<script setup>` 语法糖

更简洁的写法：

```vue
<template>
  <div>
    <p>计数：{{ count }}</p>
    <button @click="increment">增加</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)

const increment = () => {
  count.value++
}
</script>
```

## 响应式数据

### ref

用于创建响应式的基本数据类型：

```javascript
import { ref } from 'vue'

const count = ref(0)
const message = ref('Hello')
const isVisible = ref(true)

// 访问值需要使用 .value
console.log(count.value) // 0
count.value = 1

// 在模板中会自动解包，不需要 .value
```

### reactive

用于创建响应式的对象：

```javascript
import { reactive } from 'vue'

const state = reactive({
  count: 0,
  message: 'Hello',
  user: {
    name: 'John',
    age: 25
  }
})

// 直接访问属性
console.log(state.count) // 0
state.count = 1
state.user.name = 'Jane'
```

### ref vs reactive

| 特性 | ref | reactive |
|------|-----|----------|
| 数据类型 | 基本类型 + 对象 | 仅对象 |
| 访问方式 | `.value` | 直接访问 |
| 解构 | 失去响应性 | 失去响应性 |
| 模板使用 | 自动解包 | 直接使用 |

### toRefs

解决 reactive 解构失去响应性的问题：

```javascript
import { reactive, toRefs } from 'vue'

const state = reactive({
  count: 0,
  message: 'Hello'
})

// 解构会失去响应性 ❌
const { count, message } = state

// 使用 toRefs 保持响应性 ✅
const { count, message } = toRefs(state)
```

## 计算属性

### computed

```javascript
import { ref, computed } from 'vue'

const count = ref(0)

// 只读计算属性
const doubleCount = computed(() => count.value * 2)

// 可写计算属性
const fullName = computed({
  get() {
    return `${firstName.value} ${lastName.value}`
  },
  set(value) {
    [firstName.value, lastName.value] = value.split(' ')
  }
})
```

### 计算属性缓存

```javascript
// 计算属性会缓存结果
const expensiveValue = computed(() => {
  console.log('计算中...') // 只在依赖变化时执行
  return someExpensiveOperation()
})

// 方法每次都会执行
const expensiveMethod = () => {
  console.log('计算中...') // 每次调用都执行
  return someExpensiveOperation()
}
```

## 侦听器

### watch

侦听一个或多个响应式数据源：

```javascript
import { ref, watch } from 'vue'

const count = ref(0)
const message = ref('hello')

// 侦听单个源
watch(count, (newValue, oldValue) => {
  console.log(`count 从 ${oldValue} 变为 ${newValue}`)
})

// 侦听多个源
watch([count, message], ([newCount, newMessage], [oldCount, oldMessage]) => {
  console.log('count 或 message 发生了变化')
})

// 侦听对象属性
const state = reactive({ count: 0 })
watch(
  () => state.count,
  (newValue, oldValue) => {
    console.log(`state.count 从 ${oldValue} 变为 ${newValue}`)
  }
)
```

### watchEffect

立即执行并自动追踪依赖：

```javascript
import { ref, watchEffect } from 'vue'

const count = ref(0)
const message = ref('hello')

watchEffect(() => {
  // 自动追踪 count 和 message
  console.log(`当前计数：${count.value}，消息：${message.value}`)
})

// 停止侦听
const stop = watchEffect(() => {
  console.log(`计数：${count.value}`)
})

// 手动停止
stop()
```

### 侦听器选项

```javascript
watch(
  source,
  callback,
  {
    immediate: true,    // 立即执行
    deep: true,        // 深度侦听
    flush: 'post'      // 回调时机
  }
)
```

## 生命周期钩子

```javascript
import {
  onMounted,
  onUpdated,
  onUnmounted,
  onBeforeMount,
  onBeforeUpdate,
  onBeforeUnmount
} from 'vue'

export default {
  setup() {
    onBeforeMount(() => {
      console.log('组件即将挂载')
    })

    onMounted(() => {
      console.log('组件已挂载')
    })

    onBeforeUpdate(() => {
      console.log('组件即将更新')
    })

    onUpdated(() => {
      console.log('组件已更新')
    })

    onBeforeUnmount(() => {
      console.log('组件即将卸载')
    })

    onUnmounted(() => {
      console.log('组件已卸载')
    })
  }
}
```

## 组合函数

将相关的逻辑提取到可复用的组合函数中：

### 基础示例

```javascript
// composables/useCounter.js
import { ref } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)

  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue

  return {
    count,
    increment,
    decrement,
    reset
  }
}
```

在组件中使用：

```vue
<script setup>
import { useCounter } from '@/composables/useCounter'

const { count, increment, decrement, reset } = useCounter(10)
</script>

<template>
  <div>
    <p>计数：{{ count }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="reset">重置</button>
  </div>
</template>
```

### 高级示例

```javascript
// composables/useFetch.js
import { ref, watchEffect } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  const fetchData = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(url.value)
      data.value = await response.json()
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    if (url.value) {
      fetchData()
    }
  })

  return {
    data,
    error,
    loading,
    refetch: fetchData
  }
}
```

## 依赖注入

### provide / inject

```javascript
// 父组件
import { provide, ref } from 'vue'

export default {
  setup() {
    const theme = ref('dark')

    provide('theme', theme)

    return { theme }
  }
}

// 子组件
import { inject } from 'vue'

export default {
  setup() {
    const theme = inject('theme', 'light') // 默认值

    return { theme }
  }
}
```

### 响应式注入

```javascript
// 提供响应式数据
const theme = ref('dark')
const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}

provide('theme', {
  theme,
  toggleTheme
})

// 注入并使用
const { theme, toggleTheme } = inject('theme')
```

## 最佳实践

### 1. 组合函数命名

```javascript
// ✅ 使用 use 前缀
export function useCounter() {}
export function useFetch() {}
export function useLocalStorage() {}

// ❌ 避免
export function counter() {}
export function fetchData() {}
```

### 2. 返回值结构

```javascript
// ✅ 返回对象，便于选择性解构
export function useCounter() {
  return {
    count,
    increment,
    decrement,
    reset
  }
}

// ❌ 返回数组，不够灵活
export function useCounter() {
  return [count, increment, decrement, reset]
}
```

### 3. 响应式数据选择

```javascript
// ✅ 基本类型使用 ref
const count = ref(0)
const message = ref('')

// ✅ 对象使用 reactive
const state = reactive({
  user: {},
  settings: {}
})

// ✅ 需要替换整个对象时使用 ref
const user = ref({})
```

### 4. 避免在 setup 中使用 this

```javascript
// ❌ 在 setup 中不要使用 this
export default {
  setup() {
    console.log(this) // undefined
  }
}

// ✅ 使用参数获取组件实例
export default {
  setup(props, { emit, slots, attrs }) {
    // 使用 emit 触发事件
    emit('update', value)
  }
}
```

## 与 Options API 对比

| 特性 | Options API | Composition API |
|------|-------------|-----------------|
| 代码组织 | 按选项类型 | 按逻辑功能 |
| 逻辑复用 | Mixins | 组合函数 |
| TypeScript | 支持一般 | 支持更好 |
| 学习曲线 | 较平缓 | 稍陡峭 |
| 包体积 | 较大 | 支持 tree-shaking |

## 总结

Composition API 为 Vue 3 带来了更强大和灵活的组件开发方式：

- **更好的逻辑组织** - 相关逻辑可以组织在一起
- **更强的复用能力** - 通过组合函数实现逻辑复用
- **更好的 TypeScript 支持** - 类型推导更准确
- **更小的包体积** - 支持 tree-shaking

虽然学习曲线可能比 Options API 稍陡一些，但掌握后会发现它带来的好处是巨大的。建议在新项目中优先使用 Composition API。

---

*下一篇文章我们将探讨 Vue 3 的性能优化技巧，敬请期待！*
