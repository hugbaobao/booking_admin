<template>
  <div class="users">
    <div class="add">
      <div class="left"></div>
      <div class="right"></div>
    </div>

    <a-table :columns="columns" :data-source="data" bordered :pagination="false">
  
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'Shop.cover'">
          <img :src="record.Shop.cover[0]" alt="" class="mycover">
        </template>

        <template v-if="column.key === 'type'">
          <span v-if="record.type === 4">
            <a-tag color="green">家用家居</a-tag>
          </span>
          <span v-else-if="record.type === 2">
            <a-tag color="blue">特产类</a-tag>
          </span>
          <span v-else-if="record.type === 3">
            <a-tag color="cyan">出行穿戴</a-tag>
          </span>
          <span v-else>
            <a-tag color="red">热销商品</a-tag>
          </span>
        </template>

        <template v-if="column.key === 'User.name'">
          <div>
            {{ record.User.name }}
          </div>
        </template>

        <template v-if="column.key === 'User.address'">
          <div>
            {{ record.User.address }}
          </div>
        </template>
        <template v-if="column.key === 'User.phone'">
          <div>
            {{ record.User.phone }}
          </div>
        </template>
        <template v-if="column.key === 'Shop.name'">
          <div>
            {{ record.Shop.name }}
          </div>
        </template>
        <template v-if="column.key === 'Shop.price'">
          <a>
            {{ record.Shop.price }}
          </a>
        </template>
        <template v-if="column.key === 'state'">
          <a-select
            ref="select"
            v-model:value="record.state"
            @change="handleChange($event, record.id)"
          >
            <a-select-option :value="2">待发货</a-select-option>
            <a-select-option :value="3">已发货</a-select-option>
            <a-select-option :value="4">待评价</a-select-option>
          </a-select>
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
import { message } from 'ant-design-vue';
import { h } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue'
import MyAddProduct from '@/components/add/Form.vue'
import { SHOP } from '@/types/form'


const columns = [
  {
    title: '买家昵称',
    dataIndex: 'User.name',
    key: 'User.name'
  },
  {
    title: '收件地址',
    dataIndex: 'User.address',
    key: 'User.address',
    ellipsis: true
  },
  {
    title: '手机号码',
    dataIndex: 'User.phone',
    key: 'User.phone',
    width: 120
  },
  {
    title: '商品名',
    dataIndex: 'Shop.name',
    key: 'Shop.name',
    width: 120
  },
  {
    title: '商品封面',
    dataIndex: 'Shop.cover',
    key: 'Shop.cover',
    width: '120'
  },
  {
    title: '商品单价',
    dataIndex: 'Shop.price',
    key: 'Shop.price',
    width: 100
  },
  {
    title: '购买数量',
    dataIndex: 'count',
    key: 'count',
    width: 100
  },
  {
    title: '修改订单状态',
    dataIndex: 'state',
    key: 'state',
    width: 150
  }
];

const data = ref([])  // 商品列表

const current = ref(1)  // 当前页码
const counts = ref(0)  // 总条数


// 分页
const onChange = (page: number) => {
  getUserList(page)
};

const handleChange = (e, value: number) => {
  statusChange(value, e)
}


// 获取列表
const getUserList = async (val) => {
  const { data:res } = await API.pngGetApi(val) as any
  counts.value = res.count
  data.value = res.data.map((item: any) => {
    return {
      ...item,
      Shop: {
        ...item.Shop,
        cover: JSON.parse(item.Shop.cover)
      }
    }
  })
}

// 状态改变
const statusChange = async (id: number, val: number) => {
  const res = await API.stateChangeApi(id, val) as any
  console.log(res);
  
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
