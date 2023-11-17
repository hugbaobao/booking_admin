<script setup lang="ts">
import MyTags from '@/components/layout/nav/Tags.vue'
import MyHandle from '@/components/layout/nav/Handledown.vue'
</script>

<template>
  <div class="navdown">
    <my-tags></my-tags>
    <my-handle></my-handle>
  </div>
</template>

<style lang="scss" scoped>
.navdown {
  height: 32px;
  line-height: 32px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f0f0f0; 
}
</style>
