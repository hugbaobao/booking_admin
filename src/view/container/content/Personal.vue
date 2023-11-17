<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import MyPartUpload from '@/components/personal/Partupload.vue'
import * as API from '@/https/png/index'

const myfileList = ref([])

const freshImg = async (key: string, val: string) => {
  const data = {
    key,
    val,
    olddress: myfileList.value.find((item: any) => item.key === key).url
  }
  const res = await API.pngUpdateApi(data) as any
}

// API 
const getPng = async () => {
  const { data:res } = await API.pngGetApi() as any
  myfileList.value = [
    {
      key: 'hot',
      url: res[0].hot
    },
    {
      key: 'new',
      url: res[0].new
    },
    {
      key: 'local',
      url: res[0].local
    },
    {
      key: 'wear',
      url: res[0].wear
    },
    {
      key: 'home',
      url: res[0].home
    },
    {
      key: 'tripone',
      url: res[0].tripone
    },
    {
      key: 'triptwo',
      url: res[0].triptwo
    },
    {
      key: 'center',
      url: res[0].center
    }
  ]
}

onMounted(() => {
  getPng()
})
</script>

<template>
  <div>
    <global-block :setMargin="'0 0 15px'">

   <template #default>商品分类头图</template>
   
   <template #content>
    <a-row>
      <a-col :xs="12" :md="8" :xl="4" v-for="(item, index) in myfileList" :key="item.key">
        <div class="part">
            <my-part-upload :fileList="item" :keys="item.key" @imgFresh="freshImg" uploadHeight="200px"></my-part-upload>
            <span v-if="item.key === 'hot'">热销商品</span>
            <span v-else-if="item.key === 'new'">新品上架</span>
            <span v-else-if="item.key === 'local'">本地特产</span>
            <span v-else-if="item.key === 'wear'">出行穿搭</span>
            <span v-else-if="item.key === 'tripone'">旅行攻略图一</span>
            <span v-else-if="item.key === 'triptwo'">旅行攻略图二</span>
            <span v-else-if="item.key === 'center'">共创中心头图</span>
            <span v-else>家用家居</span>
        </div>
      </a-col>
    </a-row>
   </template>

   </global-block>
  </div>
</template>

<style lang="scss" scoped>
.part {
  padding:  20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
