<script setup lang="ts">
import { ref } from 'vue'
import { useUser } from '@/store/user'
import avatarSrc from '@/assets/png/avatar.jpg'
import router from '@/router/router';

const User = useUser()
const nickname = ref<string>('')
const avatar = ref<string>('')
nickname.value = User.info.name
// avatar.value = User.info.avator
avatar.value = avatarSrc

const logOut = () => {
  User.logOut()
  router.push('/login')
}

</script>

<template>
  <a-popover title="Title" trigger="click">
        <template #content>
          <a-button @click="logOut">退出登录</a-button>
        </template>
        <div class="box">
          <a-avatar :src="avatar" />
          <span>{{ nickname }}</span>
        </div>
      </a-popover>
</template>

<style lang="scss" scoped>
.box {
  padding-right: 10px;
  span {
    margin-left: 10px;
  }
}
</style>
