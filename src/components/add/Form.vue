<template>
  <a-modal v-model:visible="open" title="Title" width="35%" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="modelcancel" :destroyOnClose="true" cancelText="取消" okText="提交">

    <div class="container">
      <div class="picture">
        <div class="piclist" v-if="formState.cover.length !== 0">
          <div class="tips">当前图片:</div>
          <div class="li" v-for="(item, index) in formState.cover" :key="index">
            <img :src="item" alt="" style="width: 100px; height: 100px; margin-right: 10px;">
            <div class="cover">
              <span @click="removeCurrentImg(item)"><DeleteOutlined /></span>
            </div>
          </div>
        </div>
      
        <div class="li">
          <div class="tips">添加图片:</div>
          <my-part-upload @imgUpload="addImg" @imgRemove="removeImg"></my-part-upload>
        </div>
      </div>

      <div class="form">
      <a-form
        :model="formState" 
        :label-col="labelCol" 
        autocomplete="off" 
      >
        <a-form-item
          label="商品名称"
          name="name"
        >
          <a-input v-model:value.trim="formState.name" />
        </a-form-item>
      
        <a-form-item
          label="商品现价"
          name="price" 
        >
          <a-input v-model:value.trim="formState.price" prefix="￥" suffix="RMB" type="number" />
        </a-form-item>
    
        <a-form-item
          label="商品原价"
          name="original"
        >
          <a-input v-model:value.trim="formState.original" prefix="￥" suffix="RMB" type="number" />
        </a-form-item>

        <a-form-item label="商品分类">
          <a-select v-model:value="formState.type">
            <a-select-option :value="1">热销商品</a-select-option>
            <a-select-option :value="2">特产类</a-select-option>
            <a-select-option :value="3">出行穿戴</a-select-option>
            <a-select-option :value="4">家用家居</a-select-option>
            <a-select-option :value="5">旅行套餐</a-select-option>
          </a-select>
        </a-form-item>

        <!-- 动态表单 -->
        <a-form-item
          v-for="(domain, index) in formState.simple"
          :key="index"
          :label="`段落${index + 1}`"
          name="info"
        >
          <a-textarea :auto-size="{ minRows: 2 }" v-model:value.trim="formState.simple[index]" />
          <MinusCircleOutlined
            class="dynamic-delete-button"
            @click="removeDomain(domain)"
          />
        </a-form-item>
        <a-form-item  label="商品简介">
          <a-button type="dashed" style="width: 60%" @click="addDomain">
            <PlusOutlined />
            添加段落
          </a-button>
        </a-form-item>
    
        <a-form-item
          label="详情介绍"
          name="words"
        >
          <a-textarea :auto-size="{ minRows: 2 }" v-model:value.trim="formState.words" />
        </a-form-item>
    
        <a-form-item
          label="商品库存"
          name="count"
        >
          <a-input v-model:value.trim="formState.count" type="number" />
        </a-form-item>  
      </a-form>
      </div>
    </div>

  </a-modal>
</template>


<script setup lang="ts">
import { ref, watchEffect, PropType } from 'vue'
import { SHOP } from '@/types/form'
import { DeleteOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue'
import MyPartUpload from './Partupload.vue'
import * as API from '@/https/upload/index'

// 父组件传来的值决定是否弹出
const props = defineProps({
  ifshow: {
    type: Boolean,
    required: true
  },
  formFather: {
    type: Object as PropType<SHOP>
  }
})

const confirmLoading = ref<boolean>(false); // 确认按钮
const open = ref<boolean>(false); // 弹窗
const pretoSave = ref<any[]>([]); // 预览图片

// 表单相关
const labelCol = { style: { width: '65px' } }
const formState = ref<SHOP>()

// 弹窗
const handleOk = async () => {
  confirmLoading.value = true;
  // API ...
  if(pretoSave.value.length !== 0) {
    await uploadImgList()
  }
  confirmLoading.value = false;
  open.value = false;
  emits('saveForm', formState.value)
}
const modelcancel = () => {
  open.value = false;
  emits('close')
}

// 动态表单
const addDomain = () => {
  formState.value.simple.push('');
};
const removeDomain = (item: string) => {
  let index = formState.value.simple.indexOf(item);
  if (index !== -1) {
    formState.value.simple.splice(index, 1);
  }  
};

// 新增到待上传图片列表
const addImg = (val: any) => {
  pretoSave.value.push(val)
}
// 移除图片
const removeImg = (val: any) => {
  pretoSave.value = pretoSave.value.filter((item: any) => item.uid !== val.uid)
}
// 删除当前图片
const removeCurrentImg = (val: string) => {
  formState.value.cover = formState.value.cover.filter((item: string) => item !== val)
}

const emits = defineEmits(['close', 'saveForm'])


watchEffect(() => {
  open.value = props.ifshow
  formState.value = props.formFather
})
// 每次关闭清空数据
watchEffect(() => {
  if(!open.value) {
    formState.value = {
      name: '',
      price: 0,
      original: 0,
      simple: [],
      words: '',
      cover: [],
      count:0
    }
    pretoSave.value = []
  }
})

// API
// 上传图片列表 
const uploadImgList = async () => {
  // 遍历pretoSave.value 上传
  for (let i = 0; i < pretoSave.value.length; i++) {
    const formData = new FormData()
    formData.append('img', pretoSave.value[i])
    const { data: res } = await API.uploadImg(formData) as any
    formState.value.cover.push(`https://php.ryxq.com.cn${res.data.url}`)
  }
}
</script>

<style lang="scss" scoped>
.container {
  overflow-y: scroll;
  // 隐藏滚动条
  &::-webkit-scrollbar {
    display: none;
  }
  .picture {
        margin-bottom:10px;
        .piclist {
          display: flex;
          .tips {
            margin-right: 5px;
          }
        }
        .li {
            margin-bottom:10px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            position: relative;
            .tips {
              margin-right: 5px;
            }
            .cover {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100px;
                height: 100px;
                background-color: rgba(0, 0, 0, .5);
                color: #fff;
                position: absolute;
                top: 0;
                left: 0;
                span {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>