<script setup lang="ts">
import MyScrollyBox from '@/components/container/Scrowybox.vue'
</script>

<template>
  <div class="mycontent">
    <my-scrolly-box>

      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>

    </my-scrolly-box>
  </div>
</template>

<style lang="scss" scoped>
.mycontent {
  height: 100%;
  overflow-y: hidden;
  .common-content {
    min-height: 100%;
    padding: 15px 15px 60px;
  }
}

.fade-enter-active {
  transition: all 0.3s ease-out;
}

.fade-leave-active {
  transition: all 0.6s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
