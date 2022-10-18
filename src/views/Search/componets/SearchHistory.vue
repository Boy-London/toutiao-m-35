<template>
  <!-- 搜索历史 -->
  <div>
    <!-- 标题 -->
    <van-cell title="搜索历史">
      <!-- van-cell 插槽，vaule值是右边的值！ -->
      <van-icon name="delete-o" @click="isDel = true" v-if="!isDel" />
      <div v-else>
        <span @click="$store.commit('SET_HISTORIES', [])">全部删除</span> &nbsp;
        <span @click="isDel = false">完成</span>
      </div>
    </van-cell>

    <!-- 搜索历史 -->
    <!-- 重新渲染vue存储的数组 -->
    <!-- 因为vuex 取值有两种方法,一种是赋值函数的映射
     另一种是用$store.stare去取值里的值, $store.$commit()去调用函数!-->
    <van-cell
      v-for="item in $store.state.histories"
      :key="item"
      :title="item"
      @click="$emit('updata-keywords', item)"
    >
    <!-- 触发子传父,重新把item 的每一项展示在搜索框！ -->
      <van-icon
        name="close"
        v-if="isDel"
        @click="
          $store.commit(
            'SET_HISTORIES',
            $store.state.histores.filter((i) => i !== item)
          )
        "
      />
    </van-cell>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDel: false
    }
  }
}
</script>

<style></style>
