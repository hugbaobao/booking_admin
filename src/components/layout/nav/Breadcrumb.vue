<template>
  <div class="mybread">
    <a-breadcrumb :routes="routers">
      <template #itemRender="{ route, paths }">    
        <!-- 这里的children是当前路由的子路由的信息，breadcrumbName是当前路由的标题，path是当前路由的路径 -->
        <!-- 当当前路由是数组最后一项时不添加跳转 -->
        <span v-if="routers.indexOf(route) === routers.length - 1">
          {{ route.breadcrumbName }}
        </span> 

        <!-- <router-link v-else-if="routers.indexOf(route) === 0" :to="`/${paths.join('/')}`" class="point">
          1{{ route.breadcrumbName }}
        </router-link> -->

        <router-link v-else :to="computpath(paths)" class="point">
          {{ route.breadcrumbName }}
        </router-link>

        <!-- **
        *  
        *  目前第二个带children的路由通过paths.join方式跳转会额外拼接路径
        *  route.path会使第一个带children的路由少路径
        *  暂时就先写死判断,有可能会出现错误
        *
        *  -->

      </template>
    </a-breadcrumb>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import useStore from '@/store/index'
const { myrouter } = useStore()

interface Route {
  path: string
  breadcrumbName: string
  group:string
  children?: Array<{
    path: string
    breadcrumbName: string
  }>
}

const route = useRoute()
let routers = ref<Route[]>([])

// 过滤不带title的路由的函数
const filterRoutes = (routes: any) => {
  return routes.filter((item: any) => item.meta.title)
}

// 生成指定格式的路由的函数
const mapRoutes = (routes: any) => {
  return routes.map((item: any) => {
    return {
      path: item.path,
      breadcrumbName: item.meta.title,
      group: item.meta?.sidegroup,
      children: item.children ? mapRoutes(item.children) : undefined
    }
  })
}

// 这里是临时使用的函数，为了删除paths的重复项，后期有可能报错
const computpath = function(val :any) {
  const filterval = val.filter((item: any,index: any)=>{
    return !val.some((otherItem: any, otherIndex: any)=>{
      if(index !== otherIndex){
        return otherItem.indexOf(item) !== -1
      }
      return false
    })
  })
  return '/' + filterval.join('/')
}

// 监听路由变化
watch(
  () => route.matched,
  newId => {
    routers.value = mapRoutes(filterRoutes(newId))
    
    myrouter.refreshPath(routers.value[routers.value.length - 1])
  },
  {immediate:true}
)

</script>

<style lang="scss" scoped>
.mybread {
  padding: 0 10px;
  display: flex;
  .point {
    &:hover{
      cursor: pointer;
    }
  }
}
</style>
