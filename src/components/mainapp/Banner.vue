<template>
  <div class="banner">
    <a-carousel arrows dots-class="slick-dots slick-thumb">
      <template #customPaging="props">
        <a>
          <img :src="savelist![props.i].url" @click="changeImg(props.i)" />
        </a>
      </template>
      <div v-for="(item, index) in savelist" :key="item.name">
        <img 
        :src="item.url" 
        @click="toUpload(item)" 
        class="hover" />
      </div>
    </a-carousel>

    <!-- 弹出框 -->
    <my-modal :isvisible="visible" @close="visible = false"></my-modal>
  </div>
</template>
<script lang="ts" setup>
import { PropType, ref, watchEffect } from 'vue';
import MyModal from '@/components/mainapp/Modal.vue'
import type { BANNER } from '@/types/img'


let curruntImg = ref<BANNER>()  // 当前选择的图片
const savelist = ref<BANNER[]>([])  // 当前图片列表
const visible = ref<boolean>(false);     // 弹出框

const emits = defineEmits(['imgSelect'])

// 选中图片
const changeImg = (val: number) => {
  curruntImg.value = savelist.value[val]
  emits('imgSelect', val)
}
// 打开弹出框
const toUpload = (val: BANNER) => {
  curruntImg.value = val
  visible.value = true
}

const props = defineProps({
  // 轮播图列表
  images: {
    type: Array as unknown as PropType<BANNER[]>
  },
})

watchEffect(()=>{
  savelist.value = props.images
})

</script>
<style scoped>
.banner {
  .hover {
    cursor: pointer;
    width: 100%;
    /* 给图片一个合适的高度，当图片为空时仍可以撑起盒子 */
    height: 350px;
    object-fit: cover;
    object-position: center;
  }
}
/* For demo */
.ant-carousel :deep(.slick-dots) {
  position: relative;
  height: auto;
}
.ant-carousel :deep(.slick-slide img) {
  border: 5px solid #fff;
  display: block;
  margin: auto;
  max-width: 80%;
}
.ant-carousel :deep(.slick-arrow) {
  display: none !important;
}
.ant-carousel :deep(.slick-thumb) {
  bottom: 0px;
}
.ant-carousel :deep(.slick-thumb li) {
  width: 60px;
  height: 45px;
}
.ant-carousel :deep(.slick-thumb li img) {
  width: 100%;
  height: 100%;
  filter: grayscale(100%);
  display: block;
}
.ant-carousel :deep .slick-thumb li.slick-active img {
  filter: grayscale(0%);
}

</style>

  