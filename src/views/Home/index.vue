<template>
  <div>
    <!-- 顶部导航！ -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button
          icon="search"
          round
          type="info"
          class="search-btn"
          @click="$router.push('/search')"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>

    <!-- tab切换栏-->
    <van-tabs v-model="active">
      <van-tab v-for="item in MyChannes" :key="item.id" :title="item.name">
        <!-- 将请求到的数据传递给子组件 -->
        <!-- 需要将请求到的数据传递给子组件 -->
        <!-- channlId是自定义的传值属性 -->
        <article-list :channelId="item.id"></article-list>
      </van-tab>
      <span class="toutiao toutiao-gengduo" @click="isShowEdit = true"></span>
    </van-tabs>

    <!-- 频道弹出层 -->
    <van-popup
      v-model="isShowEdit"
      position="bottom"
      :style="{ height: '100%', width: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <!-- 子组件弹出内容展示区 -->
      <!-- 把数据传递给子组件 -->
      <edit-popup
        :my-channels="MyChannes"
        @updata-active=";[(active = $event), (isShowEdit = false)]"
        @delete-channel="delMyChannel"
        @add-channel="addMyChannel"
      ></edit-popup>
    </van-popup>
  </div>
</template>

<script>
// 导入请求频道方法
// 按需引入！
import { delMyChannelAPI, getChannelAPl, addMyChannelAPI } from '@/api'
// 导入复用子组件
import ArticleList from './components/ArticleList'

// 导入弹出内容展出子组件
import EditPopup from './components/EditPopup'

// 引入token,用来判断用户是否登录
// 用户如果登录就用用户数据库里的数据,如果没登录就使用本地存储的数据!
// 导入本地存储的 mutations() 方法

import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      active: 0,
      MyChannes: [], // channes数据
      // 是否展示弹出层
      isShowEdit: false
    }
  },
  components: {
    ArticleList,
    EditPopup
  },

  created() {
    // 一进入页面立即调用频道函数！
    this.getMyChannes()
    // 初始化登录!  根据用户登录与未登录使用本地存储还是数据库里的数据!
    this.initMyChannels()
  },
  computed: {
    // 映射koken令牌
    ...mapGetters(['isLogin'])
  },

  methods: {
    ...mapMutations(['Set_MY_CHANNELS']),
    async initMyChannels() {
      // 判断是否登录
      if (this.isLogin) {
        this.getMyChannes()
      } else {
        // 如果未登录就用本地存储
        const { myChannels } = this.$store.state
        if (myChannels.length > 0) {
          this.myChannels = myChannels
        } else {
          this.getMyChannes()
          this.Set_MY_CHANNELS(this.MyChannes)
        }
      }
    },

    // 再次封装请求频道函数！
    async getMyChannes() {
      try {
        const { data } = await getChannelAPl()
        // 一定要看返回的数据结构层级,要一层一层的去解构并获取数据！
        this.MyChannes = data.data.channels
        console.log(data)
      } catch (error) {
        throw error
      }
    },
    // 删除频道
    async delMyChannel(id) {
      try {
        this.$toast.loading({
          message: '正在删除频道',
          forbidClick: true
        })

        const newChannels = this.MyChannes.filter((item) => item.id !== id)

        if (this.isLogin) {
          await delMyChannelAPI(id)
        } else {
          // 未登录,将删除好的频道存到本地存储
          this.Set_MY_CHANNELS(newChannels)
        }
        this.MyChannes = newChannels
        // 提示删除成功
        this.$toast.success('删除频道成功')
      } catch (error) {
        this.$toast.fail('删除频道失败')
      }
    },

    // 添加频道
    async addMyChannel(myChannel) {
      try {
        this.$toast.loading({
          message: '正在删除频道...',
          forbidClick: 'true'
        })

        if (this.isLogin) {
          await addMyChannelAPI(myChannel.id, this.MyChannes.length)
        } else {
          // 未登录,将删除好的频道存到本地存储
          this.SET_MY_CHANNELS([...this.MyChannes, myChannel])
        }
        // MyChannes
        this.MyChannes.push(myChannel)
        this.$toast.success('添加频道成功')
      } catch (error) {
        this.$toast.fail('添加频道失败')
      }
    }
  }
}
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
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/fonts/images/gradient-gray-line.png');
  }
}
</style>
