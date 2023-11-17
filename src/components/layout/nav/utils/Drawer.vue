<template>
  <div @click="showDrawer" class="btn">
    <setting-outlined />
  </div>
  <a-drawer
    v-model:visible="visible"
    class="custom-class"
    style="color: red"
    title="Basic Drawer"
    placement="right"
    @after-visible-change="afterVisibleChange" 
    width="300px"
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-drawer>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
// icon图标
import { SettingOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  setup() {
    const visible = ref<boolean>(false);

    const afterVisibleChange = (bool: boolean) => {
      console.log('visible', bool);
    };

    const showDrawer = () => {
      visible.value = true;
    };

    return {
      visible,
      afterVisibleChange,
      showDrawer
    };
  },
  components: {
    SettingOutlined
  }
});
</script>

<style lang="scss" scoped>
.btn {
  padding: 0 10px;
}
</style>