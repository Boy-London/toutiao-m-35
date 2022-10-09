<template>
  <div id="app">
    <router-view />
    <h1>黑马头条</h1>
    <!-- 必须要加一个------分隔开！！！！不能黏在一起 -->
    <i class="toutiao toutiao-wode"></i>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
