<script setup lang="ts">

// 通知小组件
import MyNotice from '@/components/layout/nav/utils/Notice.vue'
// 头像
import MyHeader from '@/components/layout/nav/utils/Header.vue'
// 抽屉
import MyDrawer from '@/components/layout/nav/utils/Drawer.vue'
</script>

<template>
  <div class="handleup">
    
    <div class="headerbtn">
      <my-notice></my-notice>
    </div>

    <div class="headerbtn">
      <my-header></my-header>
    </div>

    <div class="headerbtn">
      <my-drawer></my-drawer>
    </div>
    
  </div>
</template>

<style lang="scss" scoped>
.handleup {
  display: flex;
  align-items:center;
  .headerbtn {
    height: 48px;
    line-height: 48px;
    &:hover {
      background: #f0f0f0;
    }
    &:nth-child(1){
      padding: 0;
    }
  }
}
</style>
