<template>
  <div>
    <van-list
      class="search-result"
      @load="getResults"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多的搜索结果啦"
      :error.sync="error"
      error-text="请求失败,点击重新加载"
    >
      <van-cell v-for="item in results" :key="item.art_id" :title="item.title">
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getResultAPI } from '@/api'

export default {
  data() {
    return {
      results: [], // 接收请求到的数据
      page: 1, // 页码数
      loading: false, // 监测触底事件
      finished: false, // 关闭加载事件
      error: false // 关闭报错信息
    }
  },

  methods: {
    async getResults() {
      try {
        // 1.发请求获取数据
        const { data } = await getResultAPI(this.$parent.keywords, this.page++)
        console.log(data)

        // 添加数据
        this.results.push(...data.data.results)
        // 关闭loading触底事件！

        // 判断是否还有数据
        if (data.data.results.length === 0) {
          this.finished = true
        }
      } catch (error) {
        this.error = true
      } finally {
        // 在loding加载中关闭
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search-result {
  height: calc(100vh - 108px);
  overflow: auto;
}
</style>
