<script setup lang="ts">

</script>

<template>
  <div class="scrowx">
    <!-- 创建一个插槽 -->
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
// 创建一个盒子，高度超出的时候只可以左右滚动,
.scrowx {
  overflow-x: auto;
  overflow-y: hidden;
}
// 美化滚动条
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  width: 6px;
  background: rgba(#101F1C, 0.1);
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(144,147,153,.5);
  background-clip: padding-box;
  min-height: 28px;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
  transition: background-color .3s;
  cursor: pointer;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(144,147,153,.3);
}

</style>
