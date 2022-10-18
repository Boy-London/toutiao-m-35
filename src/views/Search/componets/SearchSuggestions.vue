<template>
  <!-- 搜索建议 -->
  <div>
    <van-cell
      icon="search"
      v-for="(item, index) in heigthLightSuggestions"
      :key="index"
      :title="item"
      @click="$emit('updata-keywords', suggestions[index])"
    >
      <!-- 可以直接把子传父的时间写在标签内！ $emIt表示子传父! -->

      <!-- 使用具名插槽,利用v-htmll让渲染的数据识别标签 -->
      <!-- 具名插槽, template ==> v-solt:title 可以简写为#title -->
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestionsAPI } from '@/api'
// 所有的库都需要下包啊，引入！
import { debounce } from 'lodash'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      // 保存获取到的建议数据
      suggestions: []
    }
  },

  // 监听输入框的变化
  watch: {
    // 监听keywords输入框的结果,发生变化调用'getSuggestions'！
    // 立即执行,当刷新页面时会立即执行handler函数
    keywords: {
      //   immediate立即调用:'getSuggestions'
      handler: 'getSuggestions',
      immediate: true
    }
  },

  computed: {
    // 处理返回的数据高亮问题！
    // 渲染时,必须更改为这个函数的处理结果！
    heigthLightSuggestions() {
      // 声明动态正则,建立匹配条件,可以用函数的处理的结果作为返回的结果
      const reg = new RegExp(this.keywords, 'ig')
      // map放回是返回一个处理过后的原数组！
      return this.suggestions.map((str) => {
        // 以函数的形式返回结果,用模板字符串的形式拼接返回,match作为处理结果！
        return str.replace(
          reg,
          (match) => `<span style= "color:red">${match}</span>`
        )
      })
    }
  },

  methods: {
    async getSuggestions() {
      clearTimeout(this.id)
      this.id = setTimeout(async () => {
        const { data } = await getSuggestionsAPI(this.keywords)
        this.suggestions = data.data.options.filter(Boolean)
      }, 300)
      // this.suggestions = data.data.options
      // 数组中去除null.等为false的值
      // 方式一：filter方法
      // this.suggestions = data.data.options.filter((item) => item !== null)
      // 方式二：调用window.boolean方法
      // this.suggestions = data.data.options.filter((item) => Boolean(item))
      // 方式三：调用window.boolean方法,返回true!并合并同类相,只接收一个参数！
    }
  }
}
</script>

<style></style>
