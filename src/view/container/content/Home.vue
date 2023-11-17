<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import MyTopBanner from '@/components/hoom/TopBanner.vue'
import MySwitch from '@/components/hoom/Switch.vue'
import MyBtmBanner from '@/components/hoom/BtmBanner.vue'
import MyBlock from '@/components/hoom/block/Block.vue'

</script>

<template>
  <div class="home">
    <!-- 顶部轮播图 -->
    <my-top-banner></my-top-banner>

    <!-- 6个按钮 -->
    <div class="switch">
      <my-switch></my-switch>
    </div>

    <!-- 中间轮播图 -->
    <div class="center">
      <my-btm-banner></my-btm-banner>
    </div>

    <!-- 区域一商品 -->
    <div class="myblock1">
      <my-block></my-block>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.outcontainer {
  width: 100%;
  min-height: 100%;
}

</style>
