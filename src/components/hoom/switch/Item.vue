<script setup lang="ts">
import { ref, onMounted, watchEffect, PropType } from 'vue'
import MyPartUpload from '@/components/hoom/switch/Partupload.vue'
import MyPageList from '@/components/important/Pagelist.vue'
import type { SWITCH } from '@/types/img'
import { uploadImg } from '@/https/upload/index'
import { message } from 'ant-design-vue'

const current = ref<SWITCH>({} as SWITCH)

const props = defineProps({
  imgone: {
    type: Object as PropType<SWITCH>
  },
  imgIndex: Number
})


watchEffect(() => {
  current.value = props.imgone
})

// 上传图片，将新旧地址传给父组件，父组件刷新数据库并决定是否删除旧图片
const freshImg = async (files: any) => {
  const formData = new FormData();
  formData.append('img', files);
  const { data: res } = await uploadImg(formData) as any;
  if(res.errno === 0) {
    let newDress = `https://php.ryxq.com.cn${res.data.url}`  //返回的图片地址
    let oldDress = current.value.url
    current.value.url = newDress
    emits('onlyImgFresh', props.imgIndex, current.value, oldDress)
  } else {
    message.error('上传失败...');
  }
}

// 更改页面路径
const pageChange = (val: string) => {
  current.value.page = val
  emits('curruntFresh', current.value, props.imgIndex)
}

// 修改名称
const nameChange = () => {
  emits('curruntFresh', current.value, props.imgIndex)
}

const emits = defineEmits(['curruntFresh','onlyImgFresh'])

// watchEffect(() => {
//   console.log(current.value.name)
// })

</script>

<template>
  <div class="part">
      <my-part-upload :fileList="current" @imgFresh="freshImg" uploadHeight="200px"></my-part-upload>

      <div class="typo">
        <!-- <a-typography-paragraph v-model:content="current.name" editable type="success" /> -->
        <a-input v-model:value.lazy="current.name" @change="nameChange" size="small" />
      </div>
      
      <my-page-list :value="current.page" @change="pageChange"></my-page-list>
  </div>
</template>

<style lang="scss" scoped>
.part {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 0;
    p {
        text-align: center;
        margin: 8px 0;
    }
    .typo {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 15px 0;
    }
}
</style>
