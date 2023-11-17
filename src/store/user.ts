import { defineStore } from 'pinia'
// useMain  可以是 useUser、useCart 之类的名字
// defineStore('main',{..}) 在devtools 就使用 main 这个名
export const useUser = defineStore('user', {
  // 相当于data
  state: () => {
    return {
      // 所有这些属性都将自动推断其类型,如果推断失败可以试下 as xxx
      Token: '',
      info: {
        idCode: 0,
        name: '',
        avator: '',
        pover: 0,
      },
    }
  },
  // 相当于计算属性
  getters: {
    // doubleCount: (state) => {
    //     return state.count * 2
    // },
  },
  // 相当于vuex的 mutation + action，可以同时写同步和异步的代码
  actions: {
    saveInfo(val: any) {
      this.Token = val.Token
      const { Token, ...args } = val
      this.info = args
    },
    logOut() {
      this.Token = ''
      this.info = {
        idCode: 0,
        name: '',
        avator: '',
        pover: 0,
      }
    },
  },

  persist: {
    enabled: true, // true 表示开启持久化保存
  },
})
