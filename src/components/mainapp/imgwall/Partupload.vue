<template>
  <div class="clearfix">
    <a-upload
      v-model:file-list="myfileList"
      list-type="picture-card" 
      :customRequest="customUpload" 
      :before-upload="beforeUpload" 
      @preview="handlePreview" 
    >
      <div v-if="!myfileList">
        <plus-outlined />
        <div style="margin-top: 8px">Upload</div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>
<script setup lang="ts">
import { PlusOutlined } from '@ant-design/icons-vue';
import { ref, watchEffect, PropType } from 'vue';
import { uploadImg } from '@/https/upload/index';
import { message } from 'ant-design-vue';
import type { SWITCH } from '@/types/img'

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

const myfileList = ref<SWITCH>();

const props = defineProps({
    fileList: {
        type: Object as unknown as PropType<SWITCH>,
    },
    uploadHeight: {
      type: String,
      defalt: '200px'
    }
})

const emits = defineEmits(['imgFresh'])

watchEffect(()=> {
    myfileList.value = props.fileList
})

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

const customUpload = async (e: any) => {
  const formData = new FormData();
  formData.append('img', e.file);
  const { data:res } = await uploadImg(formData) as any;
  // 上传完成就应该单独保存一次，同时删除原始图片
  if(res.errno === 0) {
    let newDress = `https://moony.tyyxbyyl.com${res.data.url}`  //返回的图片地址
    emits('imgFresh', newDress)
    e.onSuccess()
  } else {
    message.error('上传失败...');
    e.onError()
  }
}

const beforeUpload = (file: any) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只允许上传jpg与png格式文件!');
  }
  const isLt3k = file.size / 1024 < 500;
  if (!isLt3k) {
    message.error('上传图片不建议超过500k!, 请重新上传!');
  }
  return isJpgOrPng && isLt3k;
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
  