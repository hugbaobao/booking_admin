<template>
  <div class="users">
    <div class="tips">
      <a-alert message="当审核状态开启时才会显示在小程序端，新发布的内容默认不开启审核状态" type="success" />
    </div>

    <a-table :columns="columns" :data-source="data" bordered :pagination="false">
  
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'img'">
          <img :src="record.img[0]" alt="" class="mycover">
        </template>

        <template v-if="column.key === 'createtime'">
          <a>
            {{ record.createtime }}
          </a>
        </template>

        <template v-if="column.key === 'state'">
          <div>
            <a-switch v-model:checked="record.state" @change="statusChange(record.id, $event)" checked-children="通过" un-checked-children="拒绝" />
          </div>
        </template>

      </template>
    </a-table>

    <div class="pages">
      <a-pagination v-model:current="current" @change="onChange" :total="counts" show-less-items />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import * as API from '@/https/examine/index'
import { message } from 'ant-design-vue';


const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 80
  },
  {
    title: '封面',
    dataIndex: 'img',
    key: 'img',
  },
  {
    title: '创建日期',
    dataIndex: 'createtime',
    key: 'createtime',
    width: 120
  },
  {
    title: '点赞数量',
    dataIndex: 'zan',
    key: 'zan',
    width: 100
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: '详情介绍',
    dataIndex: 'content',
    key: 'content'
  },
  {
    title: '审核状态',
    dataIndex: 'state',
    key: 'state',
    width: 120
  }
];

const data = ref([])  // 商品列表

const current = ref(1)  // 当前页码
const counts = ref(0)  // 总条数


// 分页
const onChange = (page: number) => {
  getUserList(page)
};


// 获取列表
const getUserList = async (val: number) => {
  const { data:res } = await API.tripListApi(val) as any
  
  data.value = res.data.map(item => {
    return {
      ...item,
      state: item.state === 1 ? true : false
    }
  })
}
// 状态改变
const statusChange = async (id: number, e: boolean) => {
  const res = await API.tripStatusApi({
    id,
    state: e ? 1 : 0
  }) as any
  if (res.code === 200) {
    message.success('修改成功')
  }
}

onMounted(() => {
  getUserList(1)
})
</script>

<style lang="scss" scoped>
.users {
  padding: 20px;
  background-color: #fff;
  .add {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }
  .mycover {
    width: 80px;
    height: 80px;
    display: block;
  }
  .pages {
    margin-top: 20px;
  }
}
</style>
