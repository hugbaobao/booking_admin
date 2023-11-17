<script setup lang="ts">
import { onMounted } from 'vue'
import { ref } from 'vue'

const scrollY =ref()

const emits = defineEmits(['scroll-down'])

onMounted(()=>{
  scrollY.value.addEventListener('scroll', function() {
          const condition = scrollY.value.scrollHeight - scrollY.value.scrollTop <= scrollY.value.  clientHeight;
          if (condition) {
            emits('scroll-down')
          }
      })
})

</script>

<template>
  <div class="scrowy" ref="scrollY">
    <!-- 创建一个插槽 -->
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
// 创建一个盒子，高度超出的时候只可以上下滚动,
.scrowy {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  // 去除滚动条
  &::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
    color: transparent;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
}

</style>
