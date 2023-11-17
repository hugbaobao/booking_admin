import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 路由
import router from './router/router'

// 组件
import 'ant-design-vue/dist/antd.css';
// 自定义组件
import GlobalBlock from '@/components/container/Block.vue'

// pinia
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

// mitt
import mitt from 'mitt'
const Mit = mitt()


// 由于必须要拓展ComponentCustomProperties类型才能获得类型提示
declare module "vue" {
  export interface ComponentCustomProperties {
      $Bus: typeof Mit
  }
}

const pinia = createPinia()
pinia.use(piniaPersist)
const app = createApp(App)
app.use(router)
app.use(pinia)
//Vue3挂载全局API
app.config.globalProperties.$Bus = Mit

// 自定义指令
// app.directive('scroll-down', {
//   mounted(el, binding, vnode, prevVnode) {
//     const SELECTWRAP_DOM = el;
//     SELECTWRAP_DOM.addEventListener('scroll', function() {
//         const condition = SELECTWRAP_DOM.scrollHeight - SELECTWRAP_DOM.scrollTop <= SELECTWRAP_DOM.clientHeight;
//         if (condition) {
//             // binding.value();
//             console.log(111111);
            
//         }
//     })
//   }
// })

// 注册全局组件
app.component(
    // 注册的名字
    'GlobalBlock',
    // 组件的实现
    GlobalBlock
  )
app.mount('#app')