<template>
  <!-- 频道弹出内容展示子组件 -->
  <div class="edit-popup">
    <!-- 我的频道 -->
    <!-- van-cell默认有两边的插槽 -->
    <van-cell title="我的频道">
      <van-button
        size="small"
        round
        class="edit-btn"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>

    <!-- 频道 -->
    <div class="my-pannel">
      <van-grid :border="false">
        <van-grid-item
          v-for="(item, index) in myChannels"
          :key="index"
          :text="item.name"
          :class="{ active: constantChannels.includes(item.name) }"
          @click="onMyChannel(item)"
        >
          <!-- 点击把整个对象传递下去 -->
          <template #icon>
            <van-icon
              v-if="isEdit && !constantChannels.includes(item.name)"
              name="cross"
            />
          </template>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 推荐频道 -->
    <!--标题 -->
    <van-cell title="我的频道" />
    <div class="recommend-pannel">
      <van-grid :border="false">
        <van-grid-item
          v-for="item in recommendChannels"
          :key="item.id"
          :text="item.name"
          @click="$emit('add-channel', item)"
        >
          <template #icon>
            <van-icon name="plus" />
          </template>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
// 导入所有频道的请求函数
import { getAllChannelsAPI } from '@/api'

export default {
  // 接收父组件的数组传值的配置
  props: {
    myChannels: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      // 默认不展示编辑状态
      isEdit: false, // 是否展示编辑状态

      // 编辑配置表！
      constantChannels: ['推荐'],
      AllChannels: [] // 保存所有频道的数据！
    }
  },

  created() {
    // 进入页面立即调用二次封装的所有频道请求函数
    this.getAllChannels()
  },

  methods: {
    // 对所有频道请求函数进行二次封装
    async getAllChannels() {
      const { data } = await getAllChannelsAPI()
      console.log(data)
      this.AllChannels = data.data.channels
      console.log(this.AllChannels)
    },

    onMyChannel({ id, name }, index) {
      if (this.isEdit) {
        if (!this.constantChannels.includes(name)) {
          this.$emit('delete-channel', id)
        }
      } else {
        this.$emit('updata-active', index)
      }
    }
  },

  computed: {
    // 计算属性,条件渲染这个计算属性的结果
    // 查找id区分筛选返回结果的特定数组!
    // 方式一：
    // recommendChannels() {
    //   const isIncludeInMyChannels = (id) =>
    //     !!this.myChannels.find((item) => item.id === id)

    //   return this.AllChannels.filter((item) => !isIncludeInMyChannels(item.id))
    // },

    // 方式二:通过筛选所欲数组,在通过查找当前数组有没有这个id,如果有就去除！
    recommendChannels() {
      return this.AllChannels.filter(
        (item) => !this.myChannels.find((items) => items === item.id)
      )
    }
  }
}
</script>

<style scoped lang="less">
.active {
  :deep(.van-grid-item__text) {
    color: red;
  }
}

.edit-popup {
  padding-top: 1.3333333rem;
}
.edit-btn {
  border-color: red;
  color: red;
  width: 1.38667rem;
  height: 0.64rem;
}

:deep(.van-grid-item__content) {
  width: 175px;
  height: 86px;
  margin: 0 auto 10px;
  background-color: #f4f5f6;
}
.my-pannel {
  // 编辑按钮
  .editBtn {
    width: 104px;
    height: 48px;
    border-color: red;
    color: red;
  }

  // 编辑按钮居中
  .van-cell__value {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  // 关闭按钮样式
  :deep(.van-grid-item__content) {
    position: relative;

    .van-grid-item__icon-wrapper {
      position: absolute;
      top: 0;
      right: 0;

      .van-icon-cross {
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(20%, -35%);
        border: 0.02667rem solid #000;
        border-radius: 50%;
        font-size: 30px;
        color: pink;
        border-color: pink;
        text-align: center;
        line-height: 0.32rem;
      }
    }
  }
}
// 推荐频道
.recommend-pannel {
  // 推荐频道加号样式
  :deep(.van-grid-item__content) {
    flex-direction: row;

    .van-grid-item__icon {
      font-size: 0.5rem;
    }

    .van-grid-item__text {
      margin-top: 0;
    }
  }
}
</style>
