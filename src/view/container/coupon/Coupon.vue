<template>
  <div class="users">
    <div class="add">
      <div class="left"></div>
      <div class="right">
        <a-button type="primary" :icon="h(PlusOutlined)" @click="ifshow = true">添加优惠券</a-button>
        <my-add-coupon :ifshow="ifshow" @close="ifshow = false" @saveForm="formSave">
        </my-add-coupon>
      </div>
    </div>

    <a-table :columns="columns" :data-source="data" bordered :pagination="false">
  
      <template #bodyCell="{ column, record }">

        <template v-if="column.key === 'lose'">
          <span v-if="new Date(record.expiration) <= new Date()">
            <a-tag color="yellow">已过期</a-tag>
          </span>
          <span v-else>
            <a-tag color="green">未过期</a-tag>
          </span>
        </template>

        <template v-if="column.key === 'action'">
        <span>
          <a-popconfirm
            title="确定删除这件商品吗?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="confirm(record.id)"
          >
            <a href="#">删除</a>
          </a-popconfirm>
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
import { h } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue'
import * as API from '@/https/coupon/index'
import MyAddCoupon from '@/components/add/Coupon.vue'
import { message } from 'ant-design-vue';

const columns = [
  {
    title: '券名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '优惠金额',
    dataIndex: 'amount',
    key: 'amount'
  },
  {
    title: '使用门槛',
    dataIndex: 'cill',
    key: 'cill'
  },
  {
    title: '过期日期',
    dataIndex: 'expiration',
    key: 'expiration'
  },
  {
    title: '是否过期',
    key: 'lose'
  },
  {
    title: '操作',
    key: 'action'
  }
];

const data = ref([])  // 商品列表
const ifshow = ref(false)  // 弹窗
const current = ref(1)  // 当前页码
const counts = ref(0)  // 总条数

// 删除与否
const confirm = (id: number) => {
  delShop(id)
};

// 分页
const onChange = (page: number) => {
  getUserList(page)
};

// 点击新增
const formSave = (val: any) => {
  addShop(val)
  ifshow.value = false
}

// API 
// 获取列表
const getUserList = async (val) => {
  const { data: res } = await API.couponGetApi(val) as any
  counts.value = res.count
  data.value = res.data
}
const addShop = async (val) => {
  const res = await API.couponAddApi(val) as any
  if (res.code === 200) {
    message.success('添加成功')
    getUserList(current.value)
  } else {
    message.error('添加失败')
  }
}
// 删除 
const delShop = async (id) => {
  const res = await API.couponDeleteApi(id) as any
  if (res.code === 200) {
    message.success('删除成功')
    getUserList(current.value)
  } else {
    message.error('删除失败')
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
