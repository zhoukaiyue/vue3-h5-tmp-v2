<!--
 * @Descripttion: frame-view 布局组件
 * @version: 1.0.0
 -->
<template>
  <div :class="[props.showTabbar ? 'h-tabbar' : '', 'frame-view w-full h-full']">
    <div class="frame-view-content w-full h-full">
      <slot />
      <tabbar v-if="props.showTabbar" class="layout-tabbar w-screen h-[100px] text-[26px]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import tabbar from '../tabbar/index.vue'

const props = defineProps({
  showTabbar: {
    type: Boolean,
    default: false,
  },
})
</script>

<script lang="ts">
export default {
  name: 'FrameView',
}
</script>

<style scoped lang="scss">
.frame-view {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  &-content {
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .layout-tabbar {
    box-sizing: content-box;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
  }

  &.h-tabbar .frame-view-content {
    height: calc(100% - 100px);
  }
}
</style>
