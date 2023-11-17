<template>
  <a-form
    ref="formRef" 
    :model="formState" 
    :rules="rules"
    name="normal_login"
    class="login-form"
    @finish="onFinish"
    @finishFailed="onFinishFailed" 
  >
    <a-form-item
      has-feedback 
      label="用户"
      name="username" 
    >
      <a-input v-model:value.trim="formState.username">
        <template #prefix>
          <UserOutlined class="site-form-item-icon" />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item 
      label="密码"
      name="password"  
    >
      <a-input-password v-model:value.trim="formState.password">
        <template #prefix>
          <LockOutlined class="site-form-item-icon" />
        </template>
      </a-input-password>
    </a-form-item>

    <a-form-item>
      <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
        添加
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { ref, defineComponent, reactive, computed, onMounted } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import type { Rule } from 'ant-design-vue/es/form';
import type { FormInstance } from 'ant-design-vue';
import { message } from 'ant-design-vue';
import { registerApi } from '@/https/admin/index'
interface FormState {
  username: string;
  password: string;
}

const formRef = ref<FormInstance>();
const formState = reactive<FormState>({
  username: '',
  password: ''
});
// 是否锁定提交按钮
const disabled = computed(() => {
  return !(formState.username && formState.password);
});
// 验证用户名
let validateName = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('用户名不得为空');
  } else {
    if(value.length < 3 || value.length > 20) {
      return Promise.reject('用户名为3到20个字符');
    }
    return Promise.resolve();
  }
};
// 验证密码
let validatePass = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('密码不得为空');
  } else {
    if(value.length < 5 || value.length > 20) {
      return Promise.reject('用户名为5到20个字符');
    }
    return Promise.resolve();
  }
};
  const rules: Record<string, Rule[]> = {
    username: [{ required: true, validator: validateName, trigger: 'blur' }],
    password: [{ required: true, validator: validatePass, trigger: 'blur' }]
  };
  // 提交表单且数据验证成功
  const onFinish = async (values: any) => {
    const { data:res } = await registerApi(values)
    if(res.code === 200) {
        message.success('添加成功！')
    } else if (res.code === 202) {
        message.warning('用户名已存在！')
    } else {
        message.error('未知错误')
    }
    
  };
  // 数据验证失败
  const onFinishFailed = (errorInfo: any) => {
    message.error(errorInfo);
  };
</script>
<style>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>