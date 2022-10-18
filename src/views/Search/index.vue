<template>
  <div>
    <form action="/">
      <van-search
        v-model.trim="keywords"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        background="#3296fa"
        @focus="isShowResult = false"
      />
      <!-- foucse焦点事件将输入内容初始化,显示搜索建议 -->
    </form>
    <!-- 导入三个子组件 -->
    <!-- <search-history>1</search-history> -->
    <!-- <search-suggestions>2</search-suggestions> -->
    <!-- <search-result>3</search-result> -->
    <!-- 使用动态组件的方式区代替v-if v-if-else  v-else  -->
    <!-- :is="componentName" 通过计算属性的函数的结果,来确定展示那个组件-->
    <!-- 动态组件与原来的组件传值相同 -->
    <!--动态组件一次传值，多个组件都可以使用！复用所有的值！ -->
    <component
      :is="componentName"
      :keywords="keywords"
      @updata-keywords="onSearch"
    />
  </div>
</template>

<script>
// 导入存储历史记录的vuex
import { mapMutations, mapState } from 'vuex'

// 导入search 下的三个子组件
import SearchHistory from './componets/SearchHistory'
import SearchResult from './componets/SearchResult'
import SearchSuggestions from './componets/SearchSuggestions'

export default {
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestions
  },
  data() {
    return {
      keywords: '', // 输入的内容
      isShowResult: false // 记录了是否出发了搜索事件
    }
  },
  methods: {
    // 映射定义的存储历史记录数组！
    ...mapMutations(['SET_HISTORIES']),

    // 触发搜索框是否有值！
    onSearch(val) {
      // 1,搜索后把点击的结果重新赋值搜索框！
      // 把更新后的值重新赋值给input框！
      this.keywords = val
      // 2,存到vuex中
      // 合并新旧输入的数据
      let newHistorirs = [this.keywords, ...this.histories]
      // 当输入内容时,触发这个存储函数，存储到vuex

      // 3,在存储vuex之前前对数据进行去重,因为new Set 返回的是一个为数组！
      // ...展开符可以直接转为真数组, 或者使用 Array.from 方法！
      newHistorirs = [...new Set(newHistorirs)]
      this.SET_HISTORIES(newHistorirs) // 因为vuex的数据类型是一个数组！需要合并！
      // 4,展示搜索结果
      this.isShowResult = true
    },
    // 取消返回！
    onCancel() {
      if (this.keywords === '') {
        // 如果没有值点击取消返回上一页
        this.$router.go(-1)
      } else {
        // 如果有值点击取消清空输入框！
        this.keywords = ''
      }
    }
  },
  computed: {
    ...mapState(['histories']), // 映射保存的就数组变量！

    // 通过计算属性的结果来展示那个组件
    componentName() {
      // 1,如果没有输入值！
      if (this.keywords === '') {
        return 'SearchHistory'
      }
      // 2,用户输了值并回车触发了 onSeaRCH事件,展示搜索结果组件
      if (this.isShowResult) {
        return 'SearchResult'
        // 3,用户在搜索过程中,没有回车展示历史组件
      }
      return 'SearchSuggestions'
    }
  }
}
</script>

<style scoped lang="less">
.van-search__action {
  color: #fff;
}
</style>
