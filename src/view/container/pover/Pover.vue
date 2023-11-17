<script setup lang="ts">
import MyRegister from '@/components/login/Register.vue'
import { useUser } from '@/store/user'
import MyTable from '@/components/power/Table.vue'

const User = useUser()

</script>

<template>
  <div class="container">
    <a-row :gutter="[16,16]">
      <a-col :span="12">
        <div class="form left">
          <a-avatar style="color: #f56a00; background-color: #fde3cf" :size="64">{{ User.info.name.slice(0,1).toUpperCase() }}</a-avatar>
          <p>{{ User.info.name }}</p>
        </div>
      </a-col>
      <a-col :span="12">
        <div class="form">
          <p>添加账号</p>
          <my-register></my-register>
        </div>
      </a-col>
    </a-row>

    <div class="table">
      <p>账号列表</p>
      <my-table></my-table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 15px;
  .form {
    background-color: #fff;
    padding: 15px;
    p {
      text-align: center;
      font-weight: bold;
    }
  }
  .left {
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      margin-top: 10px;
    }
  }

  .table {
    margin-top: 15px;
    background-color: #fff;
    text-align: center;
    padding: 0 5px;
    >p {
      font-weight: bold;
      padding: 15px;
      margin-bottom: 0;
    }
  }
}
</style>
@/store/user