<template>
  <div>
    <!-- 顶部导航！ -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button icon="search" round type="info" class="search-btn"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>

    <!-- tab切换栏-->
    <van-tabs v-model="active">
      <van-tab  v-for="item in MyChannes" 
        :key="item.id" 
       :title="item.name">

       <!-- 将请求到的数据传递给子组件 -->
       <!-- 需要将请求到的数据传递给子组件 -->
       <!-- channlId是自定义的传值属性 -->
       <article-list :channelId='item.id'></article-list>
      </van-tab>
     

      <span class="toutiao toutiao-gengduo"></span>
    </van-tabs>
  </div>
</template>

<script>
// 导入请求频道方法
// 按需引入！
import { getChannelAPl } from "@/api";
// 导入复用子组件
import ArticleList  from './components/ArticleList'

export default {
  name:'Home',
  data() {
    return {
      active: 0,
     MyChannes:[],

    };
  },
  components:{
  ArticleList 
  },

  created() {
    // 一进入页面立即调用频道函数！
    this.getMyChannes();
  },

  methods: {
    // 再次封装请求频道函数！
    async getMyChannes() {
      try {
        const { data } = await getChannelAPl();
        // 一定要看返回的数据结构层级,要一层一层的去解构并获取数据！
       this.MyChannes = data.data.channels
        console.log(data);
      } catch (error) {
        throw error;
      }
    },
  },
};
</script>

<style scoped lang="less">
:deep(.navbar) {
  background-color: #3296fa;
  .van-nav-bar__title {
    max-width: unset;

    .van-icon-search {
      color: #fff;
    }
  }
  .search-btn {
    width: 7.4rem;
    height: 0.83333rem;
    background-color: #5babfb;
    border: unset;
  }
}
/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url("~@/assets/fonts/images/gradient-gray-line.png");
  }
}
</style>
