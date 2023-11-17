<template>
  <a-modal v-model:visible="open" title="Title" width="35%" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="modelcancel" :destroyOnClose="true" cancelText="取消" okText="提交">

    <div class="container">
      <div class="form">
      <a-form
        :model="formState" 
        :label-col="labelCol" 
        :rules="rules" 
        autocomplete="off" 
        ref="formRef"
      >
        <a-form-item
          label="优惠券名称"
          name="name"
        >
          <a-input v-model:value.trim="formState.name" />
        </a-form-item>
      
        <a-form-item
          label="优惠金额"
          name="amount" 
        >
          <a-input v-model:value.trim.number="formState.amount" prefix="￥" suffix="RMB" type="number" />
        </a-form-item>

        <a-form-item
          label="门槛金额"
          name="cill" 
        >
          <a-input v-model:value.trim.number="formState.cill" prefix="￥" suffix="RMB" type="number" />
        </a-form-item>
    
        <a-form-item
          label="过期日期"
          name="expiration"
        >
        <a-date-picker v-model:value="formState.expiration" :format="dateFormat" />
        </a-form-item>

      </a-form>
      </div>
    </div>

  </a-modal>
</template>


<script setup lang="ts">
import { ref, watchEffect, PropType } from 'vue'
import dayjs, { Dayjs } from 'dayjs'
import type { Rule } from 'ant-design-vue/es/form';

// 父组件传来的值决定是否弹出
const props = defineProps({
  ifshow: {
    type: Boolean,
    required: true
  }
})

const formRef = ref();
const confirmLoading = ref<boolean>(false); // 确认按钮
const open = ref<boolean>(false); // 弹窗
const dateFormat = 'YYYY-MM-DD';

// 表单相关
const labelCol = { style: { width: '100px' } }
const formState = ref({
  name: '',
  amount: 0,
  cill: 0,
  expiration: null,
  count: 1
})

const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: '优惠券名必填', trigger: 'blur' }],
  amount: [{ required: true, message: '优惠金额必填', trigger: 'blur' }],
  cill: [{ required: true, message: '优惠金额必填', trigger: 'blur' }],
  expiration: [{ required: true, message: '过期日期必填', trigger: 'blur' }],
  count: [{ required: true, message: '领取数量', trigger: 'blur' }],
}

// 弹窗
const handleOk = async () => {
  formRef.value
    .validate()
    .then(() => {
      open.value = false;
      formState.value.expiration = dayjs(formState.value.expiration).format(dateFormat)
      emits('saveForm', formState.value)
    })
    .catch(error => {
      console.log('error', error);
    });
}
const modelcancel = () => {
  open.value = false;
  emits('close')
}

const emits = defineEmits(['close', 'saveForm'])


watchEffect(() => {
  open.value = props.ifshow
})

// 每次关闭清空数据
watchEffect(() => {
  if(!open.value) {
    formState.value = {
      name: '',
      amount: 0,
      cill: 0,
      expiration: null,
      count: 1
    }
  }
})

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