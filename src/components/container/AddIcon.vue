<template>
    <div class="add" @click="show = true">
      <a-tooltip placement="top" color="blue">
        <template #title>
          <span>{{ title }}</span>
        </template>
        <plus-circle-filled />
      </a-tooltip>
    </div>

    <a-modal
      v-model:visible="show" 
      ok-text="确认" 
      cancel-text="取消" 
      width="35%" 
      :title="title"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
    >
      <slot>
        <p>默认内容</p>
      </slot>
    </a-modal>
</template>

<script setup lang="ts">
    import { PlusCircleFilled } from '@ant-design/icons-vue'
    import { ref, watchEffect } from 'vue'

    const props = defineProps({
        title: {
            default: 'Title',
            type: String
        },
        close: {
          type: Boolean
        }
    })
    const emits = defineEmits(['handleOk'])

    watchEffect(() => {
      if(props.close) {
        confirmLoading.value = false
        show.value = false
      }
    })

    const show = ref<boolean>(false)
    const confirmLoading = ref<boolean>(false)

    const handleOk = () => {
      confirmLoading.value = true;
      emits('handleOk')
    };

</script>

<style lang="scss" scoped>
    .add {
    position: fixed;
    right: 30px;
    bottom: 50px;
    color: #1890ff;
    font-size: 55px;
    transition: all .1s;
    &:hover {
      cursor: pointer;
      font-size: 60px;
    }
  }
</style>