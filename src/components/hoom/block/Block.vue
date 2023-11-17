<script setup lang="ts">
import { ref, onMounted } from "vue"
import type { COVER } from "@/types/img"
import MyCover from "@/components/hoom/block/Cover.vue"
import MyPageList from '@/components/important/Pagelist.vue'
import * as API from "@/https/main/home"
import { uploadImg } from '@/https/upload/index'
import { message } from 'ant-design-vue';

const coverone = ref<COVER>({
  url: '',
  page: ''
})
const covertwo = ref<COVER>({
  url: '',
  page: ''
})

// 更新页面
const pageChange = (val: string) => {
  coverone.value.page = val
  pathUpdate('coverone', coverone.value)
}

const pageChangebtm = (val: string) => {
  covertwo.value.page = val
  pathUpdate('covertwo', covertwo.value)
}

// 更新图片
const freshImg = async (e: any) => {
  const formData = new FormData();
  formData.append('img', e);
  const { data: res } = await uploadImg(formData) as any;
  if(res.errno === 0) {
    let newDress = `https://php.ryxq.com.cn${res.data.url}`  //返回的图片地址
    let oldDress = coverone.value.url
    // 保存图片到数据库
    coverone.value.url = newDress
    // api ... 
    imgUpdate('coverone', oldDress, coverone.value)
  } else {
    message.error('上传失败...');
  }
}

const freshImgbtm = async (e: any) => {
  const formData = new FormData();
  formData.append('img', e);
  const { data: res } = await uploadImg(formData) as any;
  if(res.errno === 0) {
    let newDress = `https://php.ryxq.com.cn${res.data.url}`  //返回的图片地址
    let oldDress = covertwo.value.url
    // 保存图片到数据库
    covertwo.value.url = newDress
    // api ... 
    imgUpdate('covertwo', oldDress, covertwo.value)
  } else {
    message.error('上传失败...');
  }
}

// API 
const getCover = async () => {
  const res = await API.bannerTopGetApi() as any
  coverone.value = res.data.coverone
  covertwo.value = res.data.covertwo
}

// 更新路径
const pathUpdate = async (key: string, data: COVER) => {
  const res = await API.coverPathApi({
    key,
    data
  }) as any
  if(res.code === 200) {
    message.success('修改成功！')
  }else {
    message.error(res.message)
  }
}
// 更新图片
const imgUpdate = async (key: string, olddress: string, data: COVER) => {
  const res = await API.coverImgApi({
    key,
    olddress,
    data
  }) as any
  if(res.code === 200) {
    message.success('修改成功！')
  }else {
    message.error(res.message)
  }
}

onMounted(() => {
  getCover()
})

</script>

<template>
  <div>
    <global-block :setMargin="'0 0 15px'">

    <template #default>下方区域商品封面</template>
    
    <template #content>
      <div class="cover">
        <a-row>
        <a-col :sm="24" :xl="12">
          <div class="container">
            <my-cover :fileList="coverone" @imgFresh="freshImg"  uploadHeight="200px"></my-cover>
            <my-page-list :value="coverone.page" @change="pageChange"></my-page-list>
          </div>
        </a-col>
        <a-col :sm="24" :xl="12">
          <div class="container">
            <my-cover :fileList="covertwo" @imgFresh="freshImgbtm"  uploadHeight="200px"></my-cover>
            <my-page-list :value="coverone.page" @change="pageChangebtm"></my-page-list>
          </div>
        </a-col>
      </a-row>
      </div>
    </template>

    </global-block>
  </div>
</template>

<style lang="scss" scoped>
.cover {
  padding: 15px;
  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
