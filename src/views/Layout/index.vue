<template>
  <div>
    <!-- 二级路由展示区，底部导航区 -->
    <router-view></router-view>

    <van-tabbar route>
      <van-tabbar-item
        v-for="(item, index) in layoutTable"
        :key="index"
        :to="item.to"
      >
        <div class="tabbar-item">
          <!-- 动态class的数组形式，可以直接拼接出具体的ican图标! -->
          <span :class="['toutiao', item.icon]"> </span>
          <!-- 首先看是否在profile 我的页面,根据'profile'属性来判断， 在根据是否有token来判断渲染登录还是未登录 -->
          <p>
            {{
              item.to === "profile" ? (isLogin ? "我的" : "未登录") : item.text
            }}
          </p>
        </div>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      // 建立配置表解决代码冗余的问题,直接通过v-for渲染即可！
      layoutTable: [
        // 这里的to 属性必须与路由相匹配！！
        { icon: "toutiao-shouye", text: "首页", to: "/ " },
        { icon: "toutiao-shipin", text: "视频", to: "/video" },
        { icon: "toutiao-wenda", text: "问答", to: "/qa" },
        { icon: "toutiao-wode", text: "我的", to: "/profile" },
      ],
    };
  },

  computed: {
    ...mapGetters(["isLogin"]),
  },
};
</script>

<style scoped lang="less">
//移动端底部导航样式！
.tabbar-item {
  // 移动端需用flex布局最好
  display: flex;
  flex-direction: column; //设置主轴的方向,columun表示上下垂直的！默认水平的
  align-items: center; //垂直居中！
  justify-content: center; //水平居中
  justify-content: space-evenly; //中间与上面保留距离相等
  height: 100px;
  .toutiao {
    font-size: 40px;
  }
}
</style>
