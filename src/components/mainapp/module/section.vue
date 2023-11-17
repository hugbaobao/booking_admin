<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const isopen = ref({
    banner:true,
    baike:true,
    doctor:true,
    menzhen:true,
    news:true,
    pinpai:true,
    sick:true,
    yiliao:true,
    youshi:true,
    zhuanti:true,
})

const statusChange = (val: any, e: any) => {
    emits('changeStatus', val, e)
}

const props = defineProps(['status'])

const emits = defineEmits(['changeStatus'])

watchEffect(()=> {
    isopen.value = props.status
})

</script>

<template>
    <a-row>
      <a-col :xs="24" :md="8" :xl="4">
        <div class="item">
            <a-switch 
            v-model:checked="isopen.banner" 
            checked-children="开"
            un-checked-children="关" 
            @change="statusChange('banner', $event)" />
            <p class="tips">轮播图</p>
        </div>
      </a-col>
      <a-col :xs="24" :md="8" :xl="4">
        <div class="item">
            <a-switch 
            v-model:checked="isopen.news" 
            checked-children="开"
            un-checked-children="关" 
            @change="statusChange('news', $event)" />
            <p class="tips">医院新闻</p>
        </div>
      </a-col>  
      <a-col :xs="24" :md="8" :xl="4">
        <div class="item">
            <a-switch 
            v-model:checked="isopen.yiliao" 
            checked-children="开"
            un-checked-children="关" 
            @change="statusChange('yiliao', $event)" />
            <p class="tips">医疗服务</p>
        </div>
      </a-col>  
      <a-col :xs="24" :md="8" :xl="4">
        <div class="item">
            <a-switch 
            v-model:checked="isopen.doctor" 
            checked-children="开"
            un-checked-children="关" 
            @change="statusChange('doctor', $event)" />
            <p class="tips">推荐医生</p>
        </div>
      </a-col>  
      <a-col :xs="24" :md="8" :xl="4">
        <div class="item">
            <a-switch 
            v-model:checked="isopen.menzhen" 
            checked-children="开"
            un-checked-children="关" 
            @change="statusChange('menzhen', $event)" />
            <p class="tips">门诊活动</p>
        </div>
      </a-col>  
      <a-col :xs="24" :md="8" :xl="4">
        <div class="item">
            <a-switch 
            v-model:checked="isopen.sick" 
            checked-children="开"
            un-checked-children="关" 
            @change="statusChange('sick', $event)" />
            <p class="tips">疾病宣教</p>
        </div>
      </a-col>  
      <a-col :xs="24" :md="8" :xl="4">
        <div class="item">
            <a-switch 
            v-model:checked="isopen.baike" 
            checked-children="开"
            un-checked-children="关" 
            @change="statusChange('baike', $event)" />
            <p class="tips">疾病百科</p>
        </div>
      </a-col>  
      <a-col :xs="24" :md="8" :xl="4">
        <div class="item">
            <a-switch 
            v-model:checked="isopen.youshi" 
            checked-children="开"
            un-checked-children="关" 
            @change="statusChange('youshi', $event)" />
            <p class="tips">优势技术</p>
        </div>
      </a-col>  
      <a-col :xs="24" :md="8" :xl="4">
        <div class="item">
            <a-switch 
            v-model:checked="isopen.zhuanti" 
            checked-children="开"
            un-checked-children="关" 
            @change="statusChange('zhuanti', $event)" />
            <p class="tips">专题</p>
        </div>
      </a-col>  
      <a-col :xs="24" :md="8" :xl="4">
        <div class="item">
            <a-switch 
            v-model:checked="isopen.pinpai" 
            checked-children="开"
            un-checked-children="关" 
            @change="statusChange('pinpai', $event)" />
            <p class="tips">品牌专科</p>
        </div>
      </a-col>
    </a-row>
</template>

<style lang="scss" scoped>
.item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
}
</style>