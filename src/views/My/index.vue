<template>
  <div class="my">
    <!-- 头部 -->
    <header>
      <!-- 已登录状态 -->
      <div class="login banner" v-if="isLogin">
        <van-row></van-row>

        <van-row>
          <van-col offset="1" span="11">
            <van-row type="flex" align="center">
              <van-image
                width="1.5rem"
                height="1.5rem"
                round
                :src="userInfo.photo"
              />

              <span
                style="color: #fff; font-size: 0.4rem; margin-left: 0.4rem"
                >{{ userInfo.name }}</span
              >
            </van-row>
          </van-col>
          <van-col
            span="6"
            offset="6"
            style="height: 100%; display: flex; ailgn-items: cneter"
          >
            <van-button
              type="default"
              size="small"
              round
              style="height: 0.42667rem"
              >编辑资料</van-button
            >
          </van-col>
        </van-row>

        <!-- 宫格展示区域 -->
        <van-row>
          <van-grid class="grid" :border="false">
            <van-grid-item text="头条">
              <!-- 使用插槽.自定义内容图标 -->
              <template #icon>{{ userInfo.art_count }}</template>
            </van-grid-item>

            <van-grid-item text="粉丝">
              <!-- 使用插槽.自定义内容图标 -->
              <template #icon>{{ userInfo.fans_count }}</template>
            </van-grid-item>

            <van-grid-item text="关注">
              <!-- 使用插槽.自定义内容图标 -->
              <template #icon>{{ userInfo.follow_count }}</template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <!-- 使用插槽.自定义内容图标 -->
              <template #icon>{{ userInfo.like_count }}</template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>

      <!-- 未登录状态 -->
      <div class="logout banner" v-else>
        <!-- 点击登录跳转 -->
        <div class="img-wrap" @click="$router.push('/login')">
          <van-image width="1.76rem" height="1.76rem" :src="imgSrc" />
          <span class="text">登录 / 注册</span>
        </div>
      </div>
    </header>
    <!-- 主体中心展示区 -->
    <main>
      <!--收藏 / 历史 -->
      <div>
        <!-- 理解: v-band 表示从一个表达式中获取到值,例如这里，:columr-num=2,读取这个值，表达式的结果！
             并作用于标签元素上！
             与{{}}插值同理,获取插值中的结果,并将结果作用元素对象！
         -->
        <van-grid class="grid-2" :border="false" :column-num="2" clickable>
          <van-grid-item text="收藏">
            <template #icon>
              <span class="toutiao toutiao-shoucang"></span>
            </template>
          </van-grid-item>

          <van-grid-item text="历史">
            <template #icon>
              <span class="toutiao toutiao-lishi"></span>
            </template>
          </van-grid-item>
        </van-grid>
      </div>

      <!-- 连接-->
      <div class="link">
        <van-cell title="消息通知" is-link></van-cell>
        <van-cell title="小智同学" is-link></van-cell>
      </div>
    </main>

    <footer>
      <!-- 点击退出删除token !  vuex原生写法，触发'SET_TOKEN'函数，传过去一个空对象实现删除 -->
      <van-button v-if="isLogin" @click="logout" block class="exit"
        >退出</van-button
      >
    </footer>
  </div>
</template>

<script>
import { getUserInfoAPI } from '@/api'

// 导入vuex！
import { mapGetters } from 'vuex'
// 使用commit语法导入图片
import imgSrc from '../../../src/assets/fonts/images/mobile.png'

export default {
  data() {
    return {
      imgSrc, // 注册该变量才能使用
      userInfo: {} // 保存用户信息资料
    }
  },

  // 如果用户登录,立即调用这个函数,将用户的token传入后台用于判断是否登录！！
  created() {
    this.getUserInfo()
    // 请求时异步任务！必须等所有的同步任务执行完，才会执行异步任务(例如请求,定时器)
    // 这里console.log是同步执行, 才会执行这个异步请求任务！
    console.log(this.userInfo) // 无法答应，请求时异步任务！
  },

  methods: {
    //  退出登录提示
    async logout() {
      try {
        await this.$dialog
          .confirm({
            title: '确认退出嘛？',
            message: '弹窗内容'
          })
          .then(() => {
            // 退出删除token即可,根据v-if 和v-else进行条件渲染！展示不同页面
            this.$store.commit('SET_TOKEN', {})
          })
          .catch(() => {
            // on cancel
          })
      } catch (error) {}
    },

    // 二级封装请求函数,用来先判断用户是否登录
    async getUserInfo() {
      // 判断用户是否登录
      if (this.isLogin) {
        const { data } = await getUserInfoAPI()
        this.userInfo = data.data // 将获取到的数据，保存在userifo变量中进行渲染页面
      }
    }
  },

  computed: {
    // 映射登录与未登录变量
    ...mapGetters(['isLogin'])
  }
}
</script>

<style lang="less" scoped>
.my {
  height: ceil(100vh - 100vh);
  background-color: #f5f7f9;
}
.link {
  margin: 10px 0;
}

.banner {
  width: 100%;
  height: 5.33333rem;
  background: url(' @/assets/fonts/images/banner.png') no-repeat 00 / cover;
}
.logout {
  display: flex;
  justify-content: center;
  flex-direction: column; //改变主轴,垂直显示
  align-items: center;
  .img-wrap {
    display: flex;
    justify-content: center;
    flex-direction: column; //改变主轴,垂直显示
    align-items: center;
  }

  .text {
    color: #fff;
    font-size: 0.4rem;
    margin-top: 0.2666rem;
  }
}

.login {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
}
.van-button {
  margin-top: 33px;
  font-size: 13px;
}

:deep(.grid) {
  border: unset;
  color: #fff;
  .van-grid-item__content {
    background-color: unset;

    .van-grid-item__text {
      color: #fff;
    }
  }
  .van-grid-item__icon-wrapper {
    font-size: 0.4rem;
  }
}
.grid-2 {
  .toutiao {
    font-size: 40px;
  }
  .toutiao-shoucang {
    color: red;
  }
  .toutiao-lishi {
    color: orange;
  }
}
.exit {
  .van-button__text {
    color: red;
  }
}
</style>
