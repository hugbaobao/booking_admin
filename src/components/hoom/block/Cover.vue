<template>
  <div class="clearfix">
    <a-upload
      v-model:file-list="myfileList"
      name="avatar"
      list-type="picture-card"
      class="avatar-uploader"
      :show-upload-list="false"
      :before-upload="beforeUpload" 
    >
      <div class="handler">
        <img v-if="myfileList[0]" :src="myfileList[0].url" alt="avatar" class="mypng" />
        <div v-else>
          <plus-outlined></plus-outlined>
          <div class="ant-upload-text">Upload</div>
        </div>
      </div>
    </a-upload>
  </div>
</template>
<script setup lang="ts">
import { ref, watchEffect, PropType } from 'vue';
import { message } from 'ant-design-vue';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import type { COVER } from "@/types/img"

// const loading = ref<boolean>(false);
const myfileList = ref<COVER[]>();

const props = defineProps({
    fileList: {
        type: Object as unknown as PropType<COVER>,
    },
    uploadHeight: {
      type: String,
      defalt: '200px'
    }
})

const emits = defineEmits(['imgFresh'])

watchEffect(()=> {
  myfileList.value = [props.fileList]
})

const beforeUpload = (file: any) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只允许上传jpg与png格式文件!');
    // 清空图片
    // myfileList.value = []
    return false
  }
  const isLt3k = file.size / 1024 / 1024 < 1;
  if (!isLt3k) {
    message.error('上传图片不建议超过1M!, 请重新上传!');
    // 清空图片
    // myfileList.value = []
    return false
  }
  emits('imgFresh', file)
  return false  // 不自动上传
}

</script>

<style lang="scss" scoped>
.clearfix {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: v-bind(uploadHeight);
  overflow: hidden;
  padding: 0 20px;
  border: 1px solid #d9d9d9;
  margin-bottom: 20px;
  .ant-upload-picture-card-wrapper {
    display: flex;
    justify-content: center;
    .ant-upload {
      width: 100%;
    }
  }
.handler {
      width: 100%;
      height: v-bind(uploadHeight);
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      overflow: hidden;
      .mypng {
        width: 100%;
        height: v-bind(uploadHeight);
        object-fit: cover;
      }
  }

}
</style>

<style>
/* .avatar-uploader > .ant-upload {
    width: 100%;
    height: 128px;
} */
</style>