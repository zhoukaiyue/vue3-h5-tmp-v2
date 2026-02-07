<!--
 * @Descripttion: demo 页 - 开发者中心
 * @version: 1.0.0
 -->
<template>
  <frame-view class="dev text-[30px] bg-[#fff]">
    <div>
      <van-tag>vue3-h5-tmp-v2</van-tag>
      基于 Vue3 + TypeScript + Vite + Pinia + Vant4 + Sass + TailwindCSS + PostCSS(Rem)
      等构建的移动端模板，开箱即用。
    </div>
    <div class="pt-[12px] pb-[12px]">下面是一些基础组件的使用 demo，可以点进去试一试</div>
    <div class="mt-[20px]">
      <div
        v-for="(item, index) in findRouterList"
        :key="index"
        class="nav-card"
        @click="goPage(item.path)"
      >
        <span>{{ item.label }}</span>
        <van-icon name="arrow" size="1em" color="#B6C3D2" />
      </div>
    </div>
  </frame-view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { RouteInfo } from './type'

const findRouterList = ref<RouteInfo[]>([
  { path: '/dev/layOut', label: 'layOut 布局组件的使用' },
  { path: '/dev/tabbar', label: 'tabbar 底部标签栏' },
  { path: '/dev/pinia', label: 'pinia 状态管理的使用' },
  { path: '/dev/request', label: '请求库 request 使用 demo' },
  { path: '/dev/tool', label: '脚手架已集成的工具库' },
])

const router = useRouter()

function goPage(path: string) {
  router.push(path)
}
</script>

<style scoped lang="scss">
.dev {
  :deep(.frame-view-content) {
    padding: 46px 20px 20px;

    .nav-card {
      @apply flex flex-nowrap justify-between items-center mb-[24px] pl-[40px] pr-[40px] text-[#323233] font-bold text-[28px] h-[80px] leading-[80px] bg-[#f7f8fa] rounded-[99px];
    }
  }
}
</style>
