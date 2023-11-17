<template>
  <a-upload-dragger
    name="file" 
    :before-upload="beforeUpload" 
    listType="picture" 
    @remove="removepng"
  >
    <p class="ant-upload-drag-icon">
      <inbox-outlined></inbox-outlined>
    </p>
    <p class="ant-upload-text">点击或拖拽文件到此处上传</p>
  </a-upload-dragger>
</template>
<script lang="ts" setup>
import { message } from 'ant-design-vue';
import { InboxOutlined } from '@ant-design/icons-vue';

const emits = defineEmits(['imgFresh','update:removepng'])

const beforeUpload = (file: any) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只允许上传jpg与png格式文件!');
    return false;
  }
  const isLt3k = file.size / 1024 < 400;
  if (!isLt3k) {
    message.error('上传图片不允许超过400k!');
    return false;
  }
  emits('imgFresh', file)
  return false;
}

// 清空待上传图片
const removepng = () => {
  emits('update:removepng')
}
</script>


  
  