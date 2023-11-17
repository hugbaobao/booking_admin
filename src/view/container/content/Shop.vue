<template>
  <div class="users">
    <div class="add">
      <div class="left"></div>
      <div class="right">
        <a-button type="primary" :icon="h(PlusOutlined)" @click="addProduct">添加商品</a-button>
        <my-add-product :ifshow="ifshow" :formFather="sendTochild" @close="ifshow = false" @saveForm="formSave"></my-add-product>
      </div>
    </div>

    <a-table :columns="columns" :data-source="data" bordered :pagination="false">
      <!-- <template #headerCell="{ column }">
        <template v-if="column.key === 'name'">
          <span>
            <smile-outlined />
            姓名
          </span>
        </template>
      </template> -->
  
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'cover'">
          <img :src="record.cover[0]" alt="" class="mycover">
        </template>

        <template v-if="column.key === 'price'">
          <a>
            {{ record.price }}
          </a>
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
          <span v-else-if="record.type === 1">
            <a-tag color="red">热销商品</a-tag>
          </span>
          <span v-else>
            <a-tag color="yellow">旅行套餐</a-tag>
          </span>
        </template>

        <template v-if="column.key === 'xian'">
          <div>
            <a-switch v-model:checked="record.xian" @change="statusChange($event,record.id,'xian')" />
          </div>
        </template>
        <template v-if="column.key === 'room'">
          <div>
            <a-switch v-model:checked="record.room" @change="statusChange($event,record.id,'room')" />
          </div>
        </template>
        <template v-if="column.key === 'hometop'">
          <div>
            <a-switch v-model:checked="record.hometop" @change="statusChange($event,record.id,'hometop')" />
          </div>
        </template>
        <template v-if="column.key === 'homebtm'">
          <div>
            <a-switch v-model:checked="record.homebtm" @change="statusChange($event,record.id,'homebtm')" />
          </div>
        </template>

        <template v-else-if="column.key === 'action'">
          <span>
            <a class="ant-dropdown-link" @click="editProduct(record.id)">
              编辑
              <!-- <right-outlined /> -->
            </a>
            <a-divider type="vertical" />
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
import * as API from '@/https/shop/index'
import { message } from 'ant-design-vue';
import { h } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue'
import MyAddProduct from '@/components/add/Form.vue'
import { SHOP } from '@/types/form'


const columns = [
  {
    title: '商品封面',
    dataIndex: 'cover',
    key: 'cover',
    width: 120
  },
  {
    title: '商品名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '商品单价',
    dataIndex: 'price',
    key: 'price',
    width: 100
  },
  {
    title: '商品原价',
    dataIndex: 'original',
    key: 'original',
    width: 100
  },
  {
    title: '详细介绍',
    dataIndex: 'words',
    key: 'words',
    width: '15%',
    ellipsis: true
  },
  {
    title: '商品库存',
    dataIndex: 'count',
    key: 'count',
    width: 100
  },
  {
    title: '商品类别',
    dataIndex: 'type',
    key: 'type',
    width: 100
  },
  {
    title: '限时销售',
    dataIndex: 'xian',
    key: 'xian',
    width: 100
  },
  {
    title: '房间预定展示',
    dataIndex: 'room',
    key: 'room',
    width: 120
  },
  {
    title: '首页区域一',
    dataIndex: 'hometop',
    key: 'hometop',
    width: 120
  },
  {
    title: '首页区域二',
    dataIndex: 'homebtm',
    key: 'homebtm',
    width: 120
  },
  {
    title: '添加日期',
    dataIndex: 'createtime',
    key: 'createtime',
    width: 120
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: 140
  }
];

const data = ref([])  // 商品列表

const current = ref(1)  // 当前页码
const counts = ref(0)  // 总条数
const ifshow = ref(false)  // 弹窗
const savetype = ref('add')  // 弹窗类型
const sendTochild = ref<SHOP>({
  name: '',
  price: 0,
  original: 0,
  simple: [],
  words: '',
  cover: [],
  count: 0,
  type: 1
}) // 传递给子组件的数据

// 删除与否
const confirm = (id: number) => {
  delShop(id)
};

// 分页
const onChange = (page: number) => {
  getUserList(page)
};

// 点击新增
const addProduct = () => {
  sendTochild.value = {
  name: '',
  price: 0,
  original: 0,
  simple: [],
  words: '',
  cover: [],
  count:0,
  type: 1
}
  ifshow.value = true
  savetype.value = 'add'
}
// 编辑商品
const editProduct = (id: number) => {
  sendTochild.value = data.value.find((item: any) => item.id === id)
  ifshow.value = true
  savetype.value = 'edit'
}

const formSave = (val: SHOP) => {
  if(savetype.value === 'add') {
    addShop(val)
  } else {
    editShop(val)
  }
  ifshow.value = false
}

// API 
// 获取总条数
const getSumList = async () => {
  const res = await API.sumGetApi() as any
  counts.value = res.data
}
// 获取列表
const getUserList = async (val) => {
  const res = await API.shopGetApi(val) as any
  data.value = res.data.map((item: any) => {
    return {
      ...item,
      cover: JSON.parse(item.cover),
      simple: JSON.parse(item.simple)
    }
  })
}
// 状态改变
const statusChange = async (e: boolean, id: number, keys: string) => {
  const res = await API.shopStateApi({
    id,
    keys,
    status: e ? 1 : 0
  }) as any
  if (res.code === 200) {
    message.success('修改成功')
  }
}
// 删除商品
const delShop = async (id: number) => {
  const res = await API.shopDeleteApi({
    id
  }) as any
  if (res.code === 200) {
    counts.value -= 1
    data.value = data.value.filter((item: any) => item.id !== id)
    message.success('删除成功')
  }
}
// 新增商品
const addShop = async (val: SHOP) => {
  const res = await API.shopAddApi(val) as any
  if (res.code === 200) {
    counts.value += 1
    message.success('添加成功')
  }
}
// 编辑商品
const editShop = async (val: SHOP) => {
  const res = await API.shopEditApi(val) as any
  if (res.code === 200) {
    message.success('修改成功')
  }
}

onMounted(() => {
  getSumList()
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
