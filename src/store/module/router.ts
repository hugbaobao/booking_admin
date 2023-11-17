import { defineStore } from 'pinia'

import router from '@/router/router';

export const useMyRouter = defineStore('router', {
    state: () => {
        return {
          curruntpath:{
            path:'',
            name:'',
            group:''
          },
          tagslist:[] as any[],
          menurow:[''],
          wxid:''
        }
    },
    // 相当于计算属性
    getters: {
        // doubleCount: (state) => {
        //     return state.count * 2
        // },
    },
    actions: {
        // 跳转,预留 当组件引入了router状态想要跳转时使用，可以不用额外单独引入路由文件
        routerpush(path: string): void{
          router.push(path)
        },

        // 更新当前路由
        refreshPath(val: any): void{
          
          const { path, breadcrumbName, group } = val
          this.curruntpath.path = path
          this.curruntpath.name = breadcrumbName
          this.curruntpath.group = group
          this.tagsPush(path, breadcrumbName)
        },
        
        // 追加tags
        tagsPush(value: string, breadcrumbName: string): void{
          let isExist = this.tagslist.some(item => item.path === value)
          if(!isExist){
            const newCurruntpath = {
              path:value,
              name:breadcrumbName
            }
            this.tagslist.push(newCurruntpath)
          }
        },

        // 删除tags
        tagsDel(value: string, num: number): void {
          const flag = value === this.curruntpath.path
          this.tagslist = this.tagslist.filter(item=>item.path !== value)
          if(flag){
            if(num === 0) {
              router.push(this.tagslist[0].path)
            }else {
              router.push(this.tagslist[num - 1].path)
            }
          }
        },

        setWxid(params: string): void {
          this.wxid = params
        }
    },
    
    persist: {
      enabled: true // true 表示开启持久化保存
    }
})  