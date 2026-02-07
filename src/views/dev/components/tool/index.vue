<template>
  <div class="page-content dev-tool h-full">
    <van-notice-bar left-icon="volume-o" text="脚手架已集成的工具库" />
    <div class="mt-[20px]">
      <div
        v-for="(item, index) in findRouterList"
        :key="index"
        class="nav-card"
        @click="goPage(item)"
      >
        <span>{{ item.label }}</span>
        <van-icon name="arrow" size="1em" color="#B6C3D2" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const findRouterList = ref([
  { path: '/dev/tool/copy', label: 'JavaScript | 文本复制工具' },
  { path: '/dev/tool/lodashjs', label: 'JavaScript | lodash 使用' },
])

const router = useRouter()

function goPage(item: { path: string; label: string }) {
  router.push(item.path)
}
</script>

<style scoped lang="scss">
.dev-tool.page-content {
  padding: 20px;
  background: #fff;

  .nav-card {
    @apply flex flex-nowrap justify-between items-center mb-[24px] pl-[40px] pr-[40px] text-[#323233] font-bold text-[28px] h-[80px] leading-[80px] bg-[#f7f8fa] rounded-[99px];
  }
}
</style>
