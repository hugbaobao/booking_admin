<script setup lang="ts">
import { RedoOutlined } from '@ant-design/icons-vue'

// 刷新按钮
const refresh = () => {
  window.location.reload()
}
</script>

<template>
  <div class="btn" @click="refresh">
    <redo-outlined />
  </div>
</template>

<style lang="scss" scoped>
.btn {
  padding: 0 10px;
  &:hover {
    cursor: pointer;
    background-color: #f0f0f0;
  }
}
</style>
