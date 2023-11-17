<template>
  <div class="clearfix">
    <a-upload
      v-model:file-list="myfileList"
      name="avatar"
      list-type="picture-card"
      class="avatar-uploader"
      :show-upload-list="false"
      :before-upload="beforeUpload"
      @change="handleChange"
    >
      <img v-if="imageUrl" :src="imageUrl" alt="avatar" class="png" />
      <div v-else>
        <loading-outlined v-if="loading"></loading-outlined>
        <plus-outlined v-else></plus-outlined>
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>
  </div>
</template>
<script setup lang="ts">
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { ref, watchEffect, PropType } from 'vue';
import { message } from 'ant-design-vue';
import type { SWITCH } from '@/types/img'
import type { UploadChangeParam, UploadProps } from 'ant-design-vue';

const myfileList = ref<SWITCH[]>([]);
const loading = ref<boolean>(false);
const imageUrl = ref<string>('');

const props = defineProps({
    fileList: {
        type: Object as unknown as PropType<SWITCH>,
    }
})

const emits = defineEmits(['imgFresh'])

watchEffect(()=> {
  myfileList.value = [props.fileList]
  imageUrl.value = props.fileList.url  
})

// 图片转base64
function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
}

// 图片改变时
const handleChange = (info: UploadChangeParam) => {
  if (info.file.status === 'uploading') {
    loading.value = true;
    return;
  }
  if (info.file.status === 'done') {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, (base64Url: string) => {
      imageUrl.value = base64Url;
      loading.value = false;
    });
  }
  if (info.file.status === 'error') {
    loading.value = false;
    message.error('upload error');
  }
}

// 自定义上传
const beforeUpload = (file: any) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只允许上传jpg与png格式文件!');
  }
  const isLt3k = file.size / 1024 < 500;
  if (!isLt3k) {
    message.error('上传图片不建议超过500k!, 请重新上传!');
  }
  // return isJpgOrPng && isLt3k;

  emits('imgFresh', file)
  return false  // 不自动上传
}

</script>
<style>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

.png {
  width: 128px;
  /* height: 128px; */
}
</style>
  