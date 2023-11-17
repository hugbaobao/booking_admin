<script lang="ts">
import { watchEffect } from 'vue'
import { defineComponent, reactive, toRefs } from 'vue'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue'
import useStore from '@/store/index'
import { storeToRefs } from 'pinia'

export default defineComponent({
  components: {
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
  },
  setup () {
    const { myrouter } = useStore()
    const { curruntpath, wxid } = storeToRefs(myrouter)

    const state = reactive({
      rootSubmenuKeys: ['sub1', 'wx4de1a8779dd95207', 'wxd32160a6c8fe2be0', 'wxdc2fd8e75579dd38', 'wxf54171eaef7ccf50', 'wx47f8708abee95f4b', 'wxa0d4df041a578d76', 'wx319bf53eac155370', 'wx42a1bd4935536cae', 'wxfd12ab5a80f5d13c', 'wxabb432ea8e4e359b'],
      openKeys: [''],
      selectedKeys: [''],
    });
    state.openKeys = JSON.parse(sessionStorage.getItem('openkey') as string) || ['']

    // 当前展开的 SubMenu 菜单项 key 数组
    const onOpenChange = (openKeys: string[]) => {
      
      const latestOpenKey = openKeys.find(key => state.openKeys.indexOf(key) === -1);
      
      if (state.rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
        state.openKeys = openKeys;
      } else {
        state.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
      sessionStorage.setItem('openkey',JSON.stringify(state.openKeys))
    };

    // 点击 MenuItem 调用此函数
    const onSelect = (e: any) => {
      state.selectedKeys = e.selectedKeys;
      // 跳转到指定地址
      myrouter.routerpush(`${state.selectedKeys[0]}`)
    };

    watchEffect(()=>{
      let splitPath = curruntpath.value.path.split('/')
      if(wxid.value) {
        state.selectedKeys = [splitPath.slice(0,3).join('/') + '/' + wxid.value]
      } else {
        state.selectedKeys = [splitPath.slice(0,4).join('/')]
      }
      // console.log(state.selectedKeys);
      
    })

    return {
      ...toRefs(state),
      onSelect,
      onOpenChange
    };
  },
});
</script>

<template>
  <div class="aside">
    <div class="logo">
      来颗柚
    </div>

    <!-- 展开菜单事件 -->
    
    <a-menu
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      :open-keys="openKeys" 
      theme="dark"
      @select="onSelect" 
      @openChange="onOpenChange"
    >
      
      <a-menu-item key="/home/charts">
        <template #icon>
          <appstore-outlined />
        </template>
        用户
      </a-menu-item>

      <a-sub-menu key="wx4de1a8779dd95207">
        <template #icon>
          <AppstoreOutlined />
        </template>
        <template #title>内容管理</template>
        <a-menu-item key="/home/content/room">房间预定</a-menu-item>
        <a-menu-item key="/home/content/home">首页</a-menu-item>
        <a-menu-item key="/home/content/shop">商城</a-menu-item>
        <a-menu-item key="/home/content/personal">其他图片</a-menu-item>
      </a-sub-menu>

      <a-sub-menu>
        <template #icon>
          <AppstoreOutlined />
        </template>
        <template #title>内容审核</template>
        <a-menu-item key="/home/examine/trip">旅行攻略</a-menu-item>
        <a-menu-item key="/home/examine/center">共创中心</a-menu-item>
      </a-sub-menu>

      <a-menu-item key="/home/order">
        <template #icon>
          <appstore-outlined />
        </template>
        订单管理
      </a-menu-item>

      <a-menu-item key="/home/hotel">
        <template #icon>
          <appstore-outlined />
        </template>
        酒店订单
      </a-menu-item>

      <a-menu-item key="/home/coupon">
        <template #icon>
          <appstore-outlined />
        </template>
        优惠券
      </a-menu-item>

        <a-menu-item key="/home/pover">
        <template #icon>
          <appstore-outlined />
        </template>
        账号管理
      </a-menu-item>

    </a-menu>
  </div>
</template>

<style lang="scss" scoped>
.aside {
  .logo {
    font-size: 25px;
    color: #fff;
    font-weight: 700;
    text-align: center;
    padding: 20px 0;
  }
}
</style>
