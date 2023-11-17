<script setup lang="ts">
import { Ref, ref } from 'vue'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import useStore from '@/store/index'
// 面包屑
import MyBreadcrumb from '@/components/layout/nav/Breadcrumb.vue'
// 右侧按钮
import MyHandleup from '@/components/layout/nav/Handleup.vue'
const { toggle } = useStore()
</script>

<template>
  <div class="navup">
    <div class="upleft">
      <div class="toggle" @click="() => toggle.togAside()">
        <menu-unfold-outlined v-if="toggle.asidebtn" class="trigger" />
        <menu-fold-outlined v-else class="trigger" />
      </div>
      <my-breadcrumb></my-breadcrumb>
    </div>

    <div class="upright">
      <my-handleup></my-handleup>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navup {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  z-index: 1;
  .upleft,
  .upright {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .toggle {
    height: 48px;
    line-height: 48px;
    cursor: pointer;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background: #f0f0f0;
      .trigger {
        color: #1890ff;
      }
    }
    .trigger {
      font-size: 18px;
    }
  }
}
</style>
