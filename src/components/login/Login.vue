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
        <a-form-item name="remember" no-style>
          <a-checkbox v-model:checked="formState.remember">记住用户</a-checkbox>
        </a-form-item>
        <a class="login-form-forgot" href="javascript:void(0);">忘记密码</a>
      </a-form-item>
  
      <a-form-item>
        <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
          登录
        </a-button>
        或
        <a href="javascript:void(0);" @click="toregister">去注册!</a>
      </a-form-item>
    </a-form>
  </template>
  <script lang="ts">
  import { ref, defineComponent, reactive, computed, onMounted } from 'vue';
  import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
  import type { Rule } from 'ant-design-vue/es/form';
  import type { FormInstance } from 'ant-design-vue';
  import { message } from 'ant-design-vue';
  import router from '@/router/router';
  import { loginApi } from '@/https/admin/index'
  import { useUser } from '@/store/user'

  interface FormState {
    username: string;
    password: string;
    remember: boolean;
  }
  export default defineComponent({
    components: {
      UserOutlined,
      LockOutlined,
    },
    setup() {
      const formRef = ref<FormInstance>();

      const formState = reactive<FormState>({
        username: '',
        password: '',
        remember: true,
      });

      onMounted(()=>{
        if(localStorage.getItem('savenamepass')) {
          let savednamepass = JSON.parse(localStorage.getItem('savenamepass') as string)
          formState.username = savednamepass.name
          formState.password = savednamepass.pass
        }
      })

      // 是否锁定提交按钮
      const disabled = computed(() => {
        return !(formState.username && formState.password);
      });

      const user = useUser()

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
        const { data: res } = await loginApi(values)
        console.log(res);
        if(res.code !== 200) {
         return message.error(res.message);
        }
        message.success(res.message)
        user.saveInfo(res.data)
        router.push('/home')

        // 记住密码
        if(formState.remember) {
          let saveinfo = JSON.stringify({
            name:formState.username,
            pass:formState.password
          })
          localStorage.setItem('savenamepass', saveinfo)
        }else {
          localStorage.removeItem('savenamepass')
        }
      };
  
      // 数据验证失败
      const onFinishFailed = (errorInfo: any) => {
        message.error(errorInfo);
      };

      // 任一表单项被校验后触发
      // const handleValidate = (...args: any[]) => {
      // console.log(args);
      // };

      // 注册按钮
      const toregister = () => {
        message.warning('不开放注册功能！')
      }

      return {
        formState,
        formRef,
        onFinish,
        onFinishFailed,
        toregister,
        disabled,
        rules,
      };
    },
  });
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
  @/store/user