<template>
  <div>
    <a-modal
      v-model:visible="visible"
      title="修改当前项轮播图"
      cancelText="取消保存" 
      okText="保存" 
      :confirm-loading="confirmLoading" 
      :ok-button-props="{ disabled: submitBanner === null }" 
      @ok="handleOk" 
      @cancel="closeble"
    >
      <div class="upload" :key="random">
        <my-upload @imgFresh="freshImg" @update:removepng="submitBanner = null"></my-upload>
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
  import { ref, watchEffect, inject } from 'vue'
  import MyUpload from './Upload.vue'

  const submitBanner = ref(null)  // 提交的图片
  const visible = ref<boolean>(false);        // 弹出框是否显示
const confirmLoading = ref<boolean>(false); // 确定按钮

const funUpdate = inject('preToupdate') as (val: any) => void
  
  const props = defineProps({
    isvisible: {
        require: true,
        default: false,
        type: Boolean
    }
  })

const random = ref()

// 暂存待上传图片
const freshImg = (val: any) => { 
  submitBanner.value = val
}

  watchEffect(()=>{
      visible.value = props.isvisible
      if(visible.value) {
        random.value = ''
      } else {
        random.value = Math.random()
      }
  })

const emits = defineEmits(['close'])
  
const handleOk = () => {
  // 上传 banner
  funUpdate(submitBanner.value)
  emits('close')
};
const closeble = () => {
  emits('close')
}
  
</script>
  
  