<template>
  <div class="clearfix">
    <a-upload
      v-model:file-list="myfileList"
      list-type="picture-card" 
      :before-upload="beforeUpload" 
      @preview="handlePreview" 
    >
      <div v-if="myfileList!.length < 1">
        <plus-outlined />
        <div style="margin-top: 8px">Upload</div>
      </div>
    </a-upload>

    <!-- 预览 -->
    <a-modal :visible="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>

  </div>
</template>
<script setup lang="ts">
import { PlusOutlined } from '@ant-design/icons-vue';
import { ref, watchEffect } from 'vue';
import type { PNGFILE } from '@/types/img';
import { message } from 'ant-design-vue'

function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const previewVisible = ref<boolean>(false);
const previewImage = ref<string>('');
const previewTitle = ref<string>('');
// const loading = ref<boolean>(false);

const myfileList = ref<PNGFILE[]>([]);  // 上传的图片列表

const props = defineProps({
    uploadHeight: {
      type: String,
      defalt: '200px'
    }
})

const emits = defineEmits(['imgUpload'])


//   取消预览
const handleCancel = () => {
  previewVisible.value = false;
  previewTitle.value = '';
};

//   预览
const handlePreview = async (file: any) => {
  if (!file.url && !file.preview) {
    file.preview = (await getBase64(file.originFileObj)) as string;
  }
  previewImage.value = file.url || file.preview;
  previewVisible.value = true;
  previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
};


const beforeUpload = (file: any) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只允许上传jpg与png格式文件!请重新选择图片');
    // 清空图片
    myfileList.value = []
    return false
  }
  const isLt3k = file.size / 1024 / 1024 < 2;
  if (!isLt3k) {
    message.error('上传图片不允许超过2m!请重新选择图片');
    // 清空图片
    myfileList.value = []
    return false
  }
  // return isJpgOrPng && isLt3k;
  emits('imgUpload', file)
  return false  // 不自动上传
}

</script>
<style>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

.ant-upload-list-picture-card-container {
    width: 100%;
    height: v-bind(uploadHeight);
}
.clearfix, .ant-upload-picture-card-wrapper, .ant-upload-list{
    height: v-bind(uploadHeight);
}
.ant-upload-list {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
  