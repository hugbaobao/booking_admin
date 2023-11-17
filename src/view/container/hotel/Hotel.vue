<template>
  <div class="users">
    <div class="add">
      <div class="left"></div>
      <div class="right"></div>
    </div>

    <a-table :columns="columns" :data-source="data" bordered :pagination="false">
  
      <template #bodyCell="{ column, record }">

        <template v-if="column.key === 'state'">
          <span v-if="record.state === 1">
            <a-tag color="green">已支付</a-tag>
          </span>
          <span v-else>
            <a-tag color="red">未支付</a-tag>
          </span>
        </template>
        <template v-if="column.key === 'idcardtype'">
          <span v-if="record.idcardtype === 'C01'">
            <a-tag color="green">身份证</a-tag>
          </span>
          <span v-else-if="record.idcardtype === 'C53'">
            <a-tag color="red">护照</a-tag>
          </span>
          <span v-else-if="record.idcardtype === 'C55'">
            <a-tag color="cyan">台湾居民来往大陆通行证</a-tag>
          </span>
          <span v-else>
            <a-tag color="blue">港澳居民来往内地通行证</a-tag>
          </span>
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
import * as API from '@/https/order/index'


const columns = [
  {
    title: '订单号',
    dataIndex: 'orderid',
    key: 'orderid'
  },
  {
    title: '订单价格',
    dataIndex: 'price',
    key: 'price',
    ellipsis: true
  },
  {
    title: '入住人姓名',
    dataIndex: 'name',
    key: 'name',
    width: 120
  },
  {
    title: '入住人手机号',
    dataIndex: 'phone',
    key: 'phone'
  },
  {
    title: '证件类型',
    dataIndex: 'idcardtype',
    key: 'idcardtype'
  },
  {
    title: '证件号',
    dataIndex: 'idcard',
    key: 'idcard'
  },
  {
    title: '下单时间',
    dataIndex: 'addtime',
    key: 'addtime',
    width: 120
  },
  {
    title: '订单状态',
    dataIndex: 'state',
    key: 'state',
    width: 100
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
const getUserList = async (val) => {
  const { data: res } = await API.orderGetApi(val) as any
  counts.value = res.count
  data.value = res.data
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
