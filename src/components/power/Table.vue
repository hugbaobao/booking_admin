<template>
  <a-table :columns="columns" :data-source="data">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span>
          <smile-outlined />
          用户名
        </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <span>
          <a-popconfirm
            title="确定删除吗?"
            ok-text="是"
            cancel-text="否"
            @confirm="confirm(record.id)"
            @cancel="cancel"
          >
          <a>删除</a>
          </a-popconfirm>
        </span>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { SmileOutlined } from '@ant-design/icons-vue';
import { ref, onMounted } from "vue";
import * as API from '@/https/admin/index'
import type { USER } from '@/types/user'
import { message } from 'ant-design-vue'

const columns = [
  {
    name: 'Name',
    dataIndex: 'username',
    key: 'name'
  },
  // {
  //   title: 'passowrd',
  //   dataIndex: 'password',
  //   key: 'password'
  // },
  {
    title: 'Action',
    key: 'action'
  }
];

const data = ref<USER[]>([])

const getUserList = async () => {
  listGet()
}

const confirm = (e: number) => {
  deleteId(e)
};
const cancel = (e: MouseEvent) => {
  message.error('已取消');
};

// API 
// 获取列表
const listGet = async () => {
  const { data: res } = await API.getListApi() as any
  data.value = res
}

// 删除账号
const deleteId = async (id: number) => {
  await API.deleteApi(id) as any
  data.value = data.value.filter((item: USER) => item.id !== id)
}

onMounted(() => {
  getUserList()
})
</script>