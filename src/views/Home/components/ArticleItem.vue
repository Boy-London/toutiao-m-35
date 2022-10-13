<template>
  <div>
    <!-- 没有图片 -->
    <van-cell v-if="type === 0" :title="aritcleInfo.title" :label="lable"/>

    <!-- 一张图片 -->
    <van-cell v-if="type === 1" :title="aritcleInfo.title" :label="lable">
      <van-image width="100" height="100"  :src="aritcleInfo.cover?.images[0]"></van-image>

      
    </van-cell>


    <!-- 三张图片 -->
     <van-cell  v-else  :title="aritcleInfo.title" >
       <template #label>
    <van-image width="100" height="100"  v-for="(item,index) in aritcleInfo.cover?.images"
       :key="index"
       :src="item"
    />
       </template>
  
    </van-cell>
    <!-- 底下文本 -->
    <span>{{lable}}</span>




  </div>
</template>

<script>
export default {
  // 接收父级传递的数据,数组   :aritcleInfo='item'
  props: {
    aritcleInfo: {
      type: Object,
      // 复杂数据类型,以函数的返回值返回
      // 解决返回undfied 空对象的问题!
      default: () => ({}),
    },
  },
  computed: {
    // 将对象进行结构!并return导出
    type() {
      return this.aritcleInfo.cover?.type;
    },
    // 封装lable文本!
    lable() {
      const { aut_name, comm_count, pubdate } = this.aritcleInfo;
      return ` ${aut_name} ${comm_count}评论 ${pubdate}`;
    },
  },
};
</script>

<style></style>
