<template>
  <a-layout>
    <!-- 侧边栏 -->
    <a-layout-sider v-model:collapsed="toggle.asidebtn" :trigger="null" :collapsedWidth="50" collapsible>
      <my-aside></my-aside>
    </a-layout-sider>

    <!-- 顶部导航 -->
    <a-layout :style="{ display: 'flex', flexDirection: 'column' }">
      <a-layout-header style="background: #fff; padding: 0" :style="{ background: '#fff', height: '80px' }">
        <my-nav></my-nav>
      </a-layout-header>

      <!-- 内容区域 -->
      <a-layout-content :style="{ background: '#f0f2f5', minHeight: '280px', flex: 1 }">
        <my-content></my-content>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { UserOutlined, VideoCameraOutlined, UploadOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { defineComponent, ref } from 'vue'
import { useToggle } from '@/store/module/toggle'
import MyAside from '@/components/layout/Aside.vue'
import MyNav from '@/components/layout/Nav.vue'
import MyContent from '@/components/layout/Content.vue'
export default defineComponent({
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    MyAside,
    MyNav,
    MyContent
  },
  setup() {
    const toggle = useToggle()
    return {
      collapsed: ref<boolean>(false),
      toggle
    }
  }
})
</script>
<style>
.ant-layout.ant-layout-has-sider {
  height: 100%;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
