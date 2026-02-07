<!--
 * @Descripttion: tabbar 底部导航
 * @version: 1.0.0
 -->
<template>
  <van-tabbar route :fixed="true" class="frame-view-tabbar" :placeholder="true">
    <van-tabbar-item v-for="(item, index) in tabs" :key="index" :to="item.router" :icon="item.icon">
      {{ item.label }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
const tabs = [
  { label: '首页', icon: 'wap-home-o', router: { path: '/index' } },
  { label: '开发者中心', icon: 'question-o', router: { path: '/dev' } },
]
</script>

<style scoped lang="scss">
.frame-view-tabbar {
  box-sizing: content-box;
}
</style>
