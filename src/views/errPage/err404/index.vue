<!--
 * @Descripttion: 404 页面
 * @version: 1.0.0
 -->
<template>
  <frame-view class="err404">
    <div class="bg mt-[300px] mx-[auto] w-[270px] h-[270px]"></div>
    <p class="mt-[15px] text-[30px] text-[#666] text-center leading-[48px]">
      抱歉，您访问的内容不存在～
    </p>
  </frame-view>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.err404 {
  :deep(.frame-view-content) {
    background-color: #fff;

    .bg {
      background-image: url('@/assets/img/base/empty.png');
      background-repeat: no-repeat;
      background-position: 100%;
      background-color: #fff;
      background-size: 100%;
    }
  }
}
</style>
