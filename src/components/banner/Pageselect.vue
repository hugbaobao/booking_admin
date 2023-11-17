<script setup lang="ts">
import { ref, PropType, watchEffect } from 'vue'
import MyPageList from '@/components/important/Pagelist.vue'
import type { BANNER } from '@/types/img'
import { h } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import MyPartUpload from './Partupload.vue'
import { message } from 'ant-design-vue'

const props = defineProps({
// 当前图片
images: {
  type: Object as unknown as PropType<BANNER>
}
})
const emits = defineEmits(['changePage', 'delCurrent', 'imgToSave'])

const curruntImg = ref<BANNER>({
  name: '',
  url: '',
  page: ''
})  // 当前选择的图片

// 新增的文件
const newFile = ref(null)

watchEffect(()=> {
  curruntImg.value = props.images
})

// 更改页面路径
const pageChange = (val: string) => {
  curruntImg.value.page = val
}
const submitChange = () => {
  emits('changePage', curruntImg.value.page)
}

// 确定删除 
const confirm = () => {
  emits('delCurrent')
}
// 取消删除
const cancel = () => {
  // console.log('取消删除')
}

// 新增图片
const addImg = (val: BANNER) => {
  newFile.value = val
}

const saveImg = () => {
  if(!newFile.value) {
    message.error('请先选择图片...')
    return
  }
  emits('imgToSave', newFile.value)
}

</script>

<template>
  <div class="pageselect">
    <div class="li">
      <div class="tips">页面跳转</div>
      <my-page-list :value="curruntImg?.page" @change="pageChange"></my-page-list>
      <a-button type="primary" class="submit" @click="submitChange">提交修改</a-button>
    </div>

    <div class="li">
      <div class="tips">删除图片</div>
      <a-popconfirm
        title="确定删除这张图片吗?"
        ok-text="Yes"
        cancel-text="No"
        @confirm="confirm"
        @cancel="cancel"
      >
      <a-button type="primary" danger>删除当前图片</a-button>
      </a-popconfirm>
    </div>

    <div class="li">
      <div class="tips">增加图片</div>
      <my-part-upload @imgUpload="addImg" uploadHeight="200px"></my-part-upload>
      <a-button :icon="h(PlusOutlined)" @click="saveImg" style="margin-left: 15px;">确定增加</a-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pageselect {
  height: 350px;
  padding: 50px;
  display: flex;
  flex-direction: column;

  .li {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .tips {
        margin: 0 20px;
        width: 100px;
        text-align: center;
        font-weight: bold;
      }
    .submit {
      margin-left: 20px;
    }
  }
}
</style>
