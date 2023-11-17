<template>
  <div class="mytags">
    <a-tag 
    v-for="(item,index) in tagslist" 
    :key="item" 
    :class="activetags === item.path ? 'activetag' : ''" 
    @click="changeActive(item.path)" 
    @close="closeTag(item.path,index)" 
    :closable="item.path !== unclosable && tagslist.length > 1"
    >{{ item.name.length < 20 ? item.name : `${item.name.slice(0,20)}...` }}</a-tag>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import useStore from '@/store/index'
import { storeToRefs } from 'pinia';
export default defineComponent({
  setup () {
    const { myrouter } = useStore()
    const { curruntpath, tagslist } = storeToRefs(myrouter)

    const activetags = ref<string>('')

    // 默认不可删除标签
    const unclosable = '/navigationone/option1'
    // 切换选中状态
    const changeActive = function(e: string){
      activetags.value = e
      myrouter.routerpush(e)
    }

    const closeTag = (val: string, num: number) => {
      myrouter.tagsDel(val, num)
    }

    watchEffect(()=>{
      activetags.value = curruntpath.value.path
    })

    return {
      tagslist,
      activetags,
      unclosable,
      changeActive,
      closeTag
    };
  },
});
</script>

<style lang="scss" scoped>
.mytags {
  padding: 0 10px;
}
.ant-tag{
  height: 25px;
  line-height: 25px;
  cursor: pointer;
}
.activetag {
  background-color: #0960bd;
  color: #fff;
}
</style>
