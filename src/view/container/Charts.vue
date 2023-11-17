<template>
  <div class="users">
    <a-table :columns="columns" :data-source="data" bordered>
      <template #headerCell="{ column }">
        <template v-if="column.key === 'name'">
          <span>
            <smile-outlined />
            姓名
          </span>
        </template>
      </template>
  
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a>
            {{ record.name }}
          </a>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <!-- <a>Invite 一 {{ record.name }}</a>
            <a-divider type="vertical" />
            <a>Delete</a>
            <a-divider type="vertical" /> -->
            <a class="ant-dropdown-link">
              订单
              <right-outlined />
            </a>
          </span>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import { SmileOutlined, RightOutlined } from '@ant-design/icons-vue';
import { ref, onMounted } from "vue";
import * as API from '@/https/user/index'


const columns = [
  {
    name: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '收件地址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '注册日期',
    dataIndex: 'creattime',
    key: 'creattime',
  },
  // {
  //   title: 'Action',
  //   key: 'action',
  // },
];

const data = ref([])

// API 
const getUserList = async () => {
  const res = await API.userGetApi() as any
  data.value = res.data
}

onMounted(() => {
  getUserList()
})
</script>

<style lang="scss" scoped>
.users {
  padding: 20px;
  background-color: #fff;
}
</style>