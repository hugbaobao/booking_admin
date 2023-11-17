<script setup lang="ts">
import type { SWITCH } from '@/types/img'
import { ref, onMounted, watchEffect } from 'vue'
import { message } from 'ant-design-vue'
import MyItem from '@/components/hoom/switch/Item.vue'
import * as Api from '@/https/main/home' 

const switchlist = ref<SWITCH[]>([])

// 修改 
const freshCurrent = (val: SWITCH, index: number) => {
  switchlist.value[index] = val
  updateList(switchlist.value)
}

// 只修改图片
const freshOnlyImg = (index: number, val: SWITCH, oldDress: string) => {
  switchlist.value[index] = val
  // 删除旧图片
  updateImg(switchlist.value, oldDress)
}

// API 
// 获取列表
const getList = async () => {
  const { data: res } = await Api.switchGetApi() as any
  switchlist.value = res
}
// 修改名称或页面
const updateList = async (val: SWITCH[]) => {
  const res = await Api.switchUpdateApi(val) as any
  if(res.code === 200) {
    message.success('修改成功')
  } else {
    message.error('修改失败')
  }
}
// 更新并删除图片
const updateImg = async (val: SWITCH[], olddress: string) => {
  const res = await Api.imgUpdateApi({
    data: val,
    olddress: olddress
  }) as any
  if(res.code === 200) {
    message.success('修改成功')
  } else {
    message.error('修改失败')
  }
}


onMounted(()=>{
  getList()
})

</script>

<template>
  <div>
    <global-block :setMargin="'0 0 15px'">

      <template #default>轮播图下6个按钮</template>
      
      <template #content>
        <a-row>
          <a-col :xs="12" :md="8" :xl="4" v-for="(item, index) in switchlist">
            <my-item :imgone="item" :imgIndex="index" @curruntFresh="freshCurrent" @onlyImgFresh="freshOnlyImg"></my-item>
          </a-col>
        </a-row>
      </template>
      
      <!-- <template #icon>
        <a-switch v-model:checked="state" checked-children="开" un-checked-children="关" @change="stateChange" />
      </template> -->
    </global-block>
  </div>
</template>

<style lang="scss" scoped>
.part {
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
        text-align: center;
        margin: 8px 0;
    }
}
</style>
