# Vue 3 Composition API 深入解析

::: info 文章信息
- **发布时间**: 2024-01-25
- **分类**: 技术
- **标签**: Vue.js, Composition API, 前端开发
:::

Vue 3 引入了 Composition API，这是一个全新的 API 设计，为我们提供了更灵活的组件逻辑组织方式。本文将深入探讨 Composition API 的核心概念和实际应用。

## 什么是 Composition API？

Composition API 是 Vue 3 中的一套新的 API，它允许我们使用函数的方式来组织组件逻辑，而不是像 Options API 那样使用对象选项。

### 主要优势

::: tip Composition API 的优势
1. **更好的逻辑复用** - 通过组合函数实现逻辑复用
2. **更好的类型推导** - TypeScript 支持更好
3. **更灵活的代码组织** - 相关逻辑可以组织在一起
4. **更小的打包体积** - 支持 tree-shaking
5. **更好的性能** - 减少了实例创建的开销
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

Vue 3.2+ 提供了更简洁的语法：

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

## 响应式系统

### ref - 基本类型响应式

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

### reactive - 对象响应式

用于创建响应式的对象：

```javascript
import { reactive } from 'vue'

const state = reactive({
  count: 0,
  message: 'Hello',
  user: {
    name: 'John',
    age: 30
  }
})

// 直接访问属性
console.log(state.count) // 0
state.count = 1
state.user.name = 'Jane'
```

### ref vs reactive 选择指南

::: tip 何时使用 ref 和 reactive？

**使用 ref：**
- 基本数据类型（string, number, boolean）
- 单一值的响应式
- 需要重新赋值整个对象时

**使用 reactive：**
- 对象和数组
- 复杂的数据结构
- 不需要重新赋值整个对象时
:::

```javascript
// ✅ 推荐用法
const count = ref(0)
const name = ref('John')
const user = reactive({
  id: 1,
  profile: {
    email: 'john@example.com'
  }
})

// ❌ 不推荐
const count = reactive({ value: 0 }) // 基本类型用 ref
const name = ref({ value: 'John' })  // 对象用 reactive
```

## 计算属性

### 基本用法

```javascript
import { ref, computed } from 'vue'

const count = ref(0)
const doubleCount = computed(() => count.value * 2)

console.log(doubleCount.value) // 0
count.value = 5
console.log(doubleCount.value) // 10
```

### 可写计算属性

```javascript
const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  get() {
    return `${firstName.value} ${lastName.value}`
  },
  set(value) {
    [firstName.value, lastName.value] = value.split(' ')
  }
})

fullName.value = 'Jane Smith'
console.log(firstName.value) // 'Jane'
console.log(lastName.value)  // 'Smith'
```

## 侦听器

### watch - 侦听特定数据源

```javascript
import { ref, watch } from 'vue'

const count = ref(0)
const message = ref('Hello')

// 侦听单个 ref
watch(count, (newValue, oldValue) => {
  console.log(`count 从 ${oldValue} 变为 ${newValue}`)
})

// 侦听多个数据源
watch([count, message], ([newCount, newMessage], [oldCount, oldMessage]) => {
  console.log('count 或 message 发生了变化')
})

// 侦听响应式对象
const state = reactive({ count: 0, name: 'John' })
watch(
  () => state.count,
  (newValue, oldValue) => {
    console.log(`state.count 从 ${oldValue} 变为 ${newValue}`)
  }
)
```

### watchEffect - 自动收集依赖

```javascript
import { ref, watchEffect } from 'vue'

const count = ref(0)
const message = ref('Hello')

// 自动追踪依赖
watchEffect(() => {
  console.log(`当前计数：${count.value}`)
  console.log(`当前消息：${message.value}`)
})

// 停止侦听
const stop = watchEffect(() => {
  console.log(`count: ${count.value}`)
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
    deep: true,         // 深度侦听
    flush: 'post'       // 回调时机
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

## 组合函数（Composables）

组合函数是 Composition API 的核心优势之一，允许我们提取和复用有状态的逻辑。

### 创建组合函数

```javascript
// composables/useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)

  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue

  const isEven = computed(() => count.value % 2 === 0)
  const isPositive = computed(() => count.value > 0)

  return {
    count,
    increment,
    decrement,
    reset,
    isEven,
    isPositive
  }
}
```

### 使用组合函数

```vue
<template>
  <div>
    <p>计数: {{ count }}</p>
    <p>是偶数: {{ isEven }}</p>
    <p>是正数: {{ isPositive }}</p>

    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>
    <button @click="reset">重置</button>
  </div>
</template>

<script setup>
import { useCounter } from '@/composables/useCounter'

const { count, increment, decrement, reset, isEven, isPositive } = useCounter(10)
</script>
```

### 高级组合函数示例

```javascript
// composables/useFetch.js
import { ref, watchEffect, toValue } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  const fetchData = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(toValue(url))
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      data.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    if (toValue(url)) {
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

## 与 TypeScript 集成

### 基本类型定义

```typescript
import { ref, reactive, computed } from 'vue'

// ref 类型推导
const count = ref(0) // Ref<number>
const message = ref('hello') // Ref<string>

// 显式类型注解
const count2 = ref<number>(0)
const message2 = ref<string>('hello')

// reactive 类型推导
interface User {
  id: number
  name: string
  email: string
}

const user = reactive<User>({
  id: 1,
  name: 'John',
  email: 'john@example.com'
})

// 计算属性类型推导
const doubleCount = computed(() => count.value * 2) // ComputedRef<number>
```

### 组合函数类型定义

```typescript
// composables/useCounter.ts
import { ref, computed, Ref, ComputedRef } from 'vue'

interface UseCounterReturn {
  count: Ref<number>
  increment: () => void
  decrement: () => void
  reset: () => void
  isEven: ComputedRef<boolean>
}

export function useCounter(initialValue = 0): UseCounterReturn {
  const count = ref(initialValue)

  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue

  const isEven = computed(() => count.value % 2 === 0)

  return {
    count,
    increment,
    decrement,
    reset,
    isEven
  }
}
```

## 最佳实践

### 1. 组合函数命名

```javascript
// ✅ 使用 use 前缀
export function useCounter() { }
export function useFetch() { }
export function useLocalStorage() { }

// ❌ 避免
export function counter() { }
export function fetchData() { }
```

### 2. 返回值结构

```javascript
// ✅ 返回对象，便于解构和重命名
export function useCounter() {
  return {
    count,
    increment,
    decrement
  }
}

// 使用时可以重命名
const { count: userCount, increment: incrementUser } = useCounter()
```

### 3. 副作用清理

```javascript
export function useEventListener(target, event, handler) {
  onMounted(() => {
    target.addEventListener(event, handler)
  })

  onUnmounted(() => {
    target.removeEventListener(event, handler)
  })
}
```

### 4. 响应式参数

```javascript
// 支持响应式参数
export function useFetch(url) {
  const data = ref(null)

  watchEffect(() => {
    // toValue 可以处理 ref 和普通值
    fetch(toValue(url)).then(/* ... */)
  })

  return { data }
}

// 使用
const url = ref('/api/users')
const { data } = useFetch(url)

// 或者
const { data } = useFetch('/api/users')
```

## 迁移指南

### 从 Options API 迁移

```javascript
// Options API
export default {
  data() {
    return {
      count: 0,
      message: 'Hello'
    }
  },
  computed: {
    doubleCount() {
      return this.count * 2
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    console.log('mounted')
  }
}

// Composition API
export default {
  setup() {
    const count = ref(0)
    const message = ref('Hello')

    const doubleCount = computed(() => count.value * 2)

    const increment = () => {
      count.value++
    }

    onMounted(() => {
      console.log('mounted')
    })

    return {
      count,
      message,
      doubleCount,
      increment
    }
  }
}
```

## 总结

Composition API 为 Vue 3 带来了更强大和灵活的组件开发方式：

- **更好的逻辑复用** - 通过组合函数
- **更好的类型支持** - TypeScript 集成
- **更灵活的代码组织** - 按功能组织代码
- **更好的性能** - Tree-shaking 支持

虽然学习曲线可能比 Options API 稍陡一些，但掌握后会发现它带来的好处是巨大的。建议在新项目中优先使用 Composition API，在现有项目中可以逐步迁移。

---

*相关文章推荐：*
- [VitePress 入门指南](/blog/vitepress-getting-started)
- [Hello World - 我的第一篇博客](/blog/hello-world)
