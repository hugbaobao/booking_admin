<script setup lang="ts">
import { BellOutlined } from '@ant-design/icons-vue'
</script>

<template>
  <div>
    <a-popover title="Title">
        <template #content>
          <p>通知消息</p>
          <p>通知消息</p>
        </template>
        <div class="box">
          <bell-outlined />
        </div>
      </a-popover>
  </div>
</template>

<style lang="scss" scoped>
.box {
  padding: 0 10px;
}
</style>
