<script setup lang="ts">
import MyBanner from '@/components/mainapp/Banner.vue'
import * as Api from '@/https/main/room'
import { ref, onMounted, provide } from 'vue'
import MyPageSelect from '@/components/banner/Pageselect.vue'
import type { BANNER } from '@/types/img'
import { message } from 'ant-design-vue'
import { uploadImg } from '@/https/upload/index'

const bannertop = ref<BANNER[]>([])  // 轮播图列表
const curruntImg = ref<number>()  // 当前选择的图片的位置
const state = ref<boolean>(true)  // 轮播图开关

const preTosave = ref<BANNER>(null)

// 轮播图选中了图片
const selectImg = (val: number) => {
  curruntImg.value = val
}

// 修改当前图片page
const pageChange = (val: string) => {
  bannertop.value[curruntImg.value].page = val
  // api ...
  changePage(bannertop.value)
}

// 删除当前图片
const currentDel = () => {
  // 删除bannertop的第curruntImg.value个元素
  bannertop.value.splice(curruntImg.value, 1)
  // 当删除的是最后一个元素时，curruntImg.value会减一
  if(curruntImg.value === bannertop.value.length) {
    curruntImg.value = curruntImg.value - 1
  }
  changePage(bannertop.value)
}

// 自定义上传 更新图片
const updateImg = async (e: any) => {
  const formData = new FormData();
  formData.append('img', e);
  const { data: res } = await uploadImg(formData) as any;
  if(res.errno === 0) {
    let newDress = `https://php.ryxq.com.cn${res.data.url}`  //返回的图片地址
    let oldDress = bannertop.value[curruntImg.value].url
    bannertop.value[curruntImg.value].url = newDress
    // api ... 
    updateBanner({
      data: bannertop.value,
      oldDress,
    })
  } else {
    message.error('上传失败...');
  }
}

// 自定义上传 新增图片
const customUpload = async (e: any) => {
  const formData = new FormData();
  formData.append('img', e);
  const { data: res } = await uploadImg(formData) as any;
  if(res.errno === 0) {
    let newDress = `https://php.ryxq.com.cn${res.data.url}`  //返回的图片地址
    // 保存图片到数据库
    preTosave.value = {
      name: '',
      url: newDress,
      page: ''
    }
    // api ... 
    addBanner(preTosave.value)
  } else {
    message.error('上传失败...');
  }
}

// 开关变化
const stateChange = (val: boolean) => {
  state.value = val
  changeState(val)
}

provide('preToupdate', updateImg)

onMounted(()=>{
  getBannertop()
  curruntImg.value = 0
})

// API
// 新增
const addBanner = async (files) => {
  const res = await Api.bannerAddApi(files) as any
  if(res.code === 200) {
    message.success('新增成功');
    getBannertop()
  } else {
    message.error('新增失败');
  }
}

// 获取列表
const getBannertop = async () => {
  const { data: res } = await Api.bannerGetApi() as any
  state.value = res.switch
  bannertop.value = Object.values(res.banner)
}

// 修改page
const changePage = async (list) => {
  const res = await Api.pageUpdateApi(list) as any
  if(res.code === 200) {
    message.success('修改成功');
  } else {
    message.error('修改失败');
  }
}

// 更新当前图片
const updateBanner = async (datas) => {
  const res = await Api.imgUpdateApi(datas) as any
  if(res.code === 200) {
    message.success('修改成功');
    getBannertop()
  } else {
    message.error('修改失败');
  }
}

// 修改状态
const changeState = async (value: boolean) => {
  const res = await Api.stateChangeApi(value) as any
  if(res.code === 200) {
    message.success('修改成功');
    getBannertop()
  } else {
    message.error('修改失败');
  }
}
</script>

<template>
  <!-- 轮播图 -->
  <global-block :setMargin="'0 0 15px'">

    <template #default>房间预定页顶部轮播图</template>

    <template #content>
      <a-row>
        <a-col :sm="24" :xl="12">
          <my-banner :images="bannertop" @imgSelect="selectImg"></my-banner>
        </a-col>
        <a-col :sm="24" :xl="12">
          <my-page-select :images="bannertop[curruntImg]" @changePage="pageChange" @delCurrent="currentDel" @imgToSave="customUpload"></my-page-select>
        </a-col>
      </a-row>
    </template>

    <template #icon>
      <a-switch v-model:checked="state" checked-children="开" un-checked-children="关" @change="stateChange" />
    </template>
  </global-block>

</template>

<style lang="scss" scoped>
 .tips {
  text-align: center;
  line-height: 40px;
  margin-bottom: 0;
 }
</style>
