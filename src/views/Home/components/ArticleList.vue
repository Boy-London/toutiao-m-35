<template>
  <div class="aritlce-list">
    <!-- 使用子组件文章列表 -->
    <van-pull-refresh
      v-model="refreshLoading"
      @refresh="getNexPageArticle"
      success-text="刷新成功"
    >
      <van-list
        @load="getNexPageArticle"
        :immediate-check="false"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <!-- loading 事件用与检测是否处于加载中！ -->
        <article-item
          v-for="item in articles"
          :key="item.art_id"
          :aritcleInfo="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// list组件的属性
// load事件：距离底部小于offser=300px时触发
// 0ffset:距离底部多少距离触发load事件，默认300px
// -imditae-check:true : 是否首次加载后立即就触发load事件！

// 导入请求函数
import { getArticlesAPI } from '@/api'

// getChannelAPl

// 导入文章列表子组件,实现文件嵌套.,代码不会冗余!a-b-c
import ArticleItem from './ArticleItem.vue' // 导入组件是全部导入整个组件,而不是{...}按需导入

export default {
  // 组件名称
  name: 'ArticleList',
  data() {
    return {
      articles: [], // 保存文章数组.
      // 每次请求数据,都会返回一个时间戳！
      preTimestamp: '', // 保存上一页的时间戳！
      loading: false, // 默认手机关闭loding 监听变量！
      finished: false,
      error: false,
      refreshLoading: false
    }
  },

  // 注册子组件!
  components: {
    ArticleItem
  },

  // 子组件需要接收父级home/index 的传值,因为时父组件在法请求！
  props: {
    // 接收的值为字符串或者数字
    channelId: [Number, String]
  },
  created() {
    // 调用请求文章函数!
    this.getFirstPageArticle()
  },

  methods: {
    // 请求函数必须用async 和await 去修饰,不然无法调用!
    async getFirstPageArticle() {
      try {
        // 调用这个函数,传递两个参数
        const { data } = await getArticlesAPI(this.channelId, +new Date())
        // 层级解构获取当前的数据!
        this.articles = data.data.results // 保存获取到的数据!
        // console.log(this.articles)

        // 必须保留当前的时间戳！为下一页的频道的获取提供参考！
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        // 可选链操作符!
        if (error.response?.status === 400) {
          this.$toast.fail(error.response.data.message)
        } else {
          // JS引起的错误上抛!
          throw error
        }
      }
    },
    async getNexPageArticle() {
      // 1,发送请求
      // id,和时间戳作为参数
      const { data } = await getArticlesAPI(this.channelId, this.preTimestamp)

      // 2, 添加数据
      const results = data.data.results

      if (this.loading) {
        this.articles = [...this.articles, ...results] // 方式二合并数组
      } else {
        this.articles = [...results, ...this.articles]
      }

      //  3,更新时间戳
      this.preTimestamp = data.data.pre_timestamp

      // pre_timestamp

      // 4,判断是否加载完毕
      if (data.data.pre_timestamp === null) {
        this.finished = true // 没有数据关闭提示！
      }

      // 4，手动关闭loding时间
      // 当请求下一页的数据的时候,就手动关闭loding 加载事件
      // 1,绑定loadig 2,手动将loding改为false
      this.loading = false
      this.refreshLoading = false
    }
  }
}
</script>

<style scoped lang="less">
/* less & 连接符代表父级元素的选择器,指向父级 */

//如何给一个盒子设置滚动条！
.aritlce-list {
  /* 100vh表示当前视口的100份！  */
  /* 条件1，：设置高度
     条件2：手动设置滚动条！
  */
  height: calc(100vh - 100px - 92px - 83px);
  overflow: auto;

  /* 滚动槽的样式 */
  &::-webkit-scrollbar {
    width: 10px;
    background-color: pink;
  }
  /* 滚动条，滑块的样式！ */
  &::-webkit-scrollbar-thumb {
    background-color: skyblue;
    border-radius: 10px;
  }
}
</style>
