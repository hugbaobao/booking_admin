<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { SelectProps } from 'ant-design-vue'

const props = defineProps({
  value: {
    type: String,
    default: ''
  }
})
const value = ref('')

const options = ref<SelectProps['options']>([
  {
    label: '暂不选择',
    options: [
      {
        value: '',
        label: '暂不选择',
      }
    ],
  },
  {
    label: 'tabbar页面',
    options: [
      {
        value: '/pages/tabbar/room',
        label: '房间预定',
      },{
        value: '/pages/tabbar/trip',
        label: '行程助手',
      },{
        value: '/pages/tabbar/home',
        label: '首页',
      },{
        value: '/pages/tabbar/shop',
        label: '商城',
      },{
        value: '/pages/tabbar/personal',
        label: '个人中心',
      },
    ],
  },
  {
    label: '非tabbar页面',
    options: [{
        value: '/pages/order/order',
        label: '全部订单',
      },{
        value: '/pages/switch/item/culture',
        label: '共创中心',
      },{
        value: '/pages/switch/item/trip',
        label: '旅行攻略',
      },{
        value: '/pages/search/index',
        label: '搜索',
      },{
        value: '/pages/order/car',
        label: '购物车',
      },{
        value: '/pages/personal/wallet',
        label: '我的余额',
      },{
        value: '/pages/personal/coupon',
        label: '领券中心',
      },{
        value: '/pages/personal/mycoupon',
        label: '我的优惠券',
      },{
        value: '/pages/personal/vip',
        label: '会员中心',
      },{
        value: '/pages/personal/jifen',
        label: '我的银两',
      },{
        value: '/pages/switch/item/addtrip',
        label: '添加旅行攻略',
      },{
        value: '/pages/switch/item/addcenter',
        label: '添加创意',
      },{
        value: '/pages/login/setmymsg',
        label: '个人信息',
      }
    ],
  },
])

const emits = defineEmits(['change'])

const handleChange = (value: string) => {
  emits('change', value)
}

watchEffect(()=>{
  value.value = props.value
})
</script>

<template>
  <div>
    <a-select
      v-model:value="value"
      :options="options" 
      style="width: 200px"
      @change="handleChange"
    ></a-select>
  </div>
</template>

<style lang="scss" scoped>
</style>
