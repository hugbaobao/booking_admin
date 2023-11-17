<script setup lang="ts">
import { Empty } from 'ant-design-vue';
const props = defineProps({
    setMargin: {
        type: String,
        default: '0 0'
    }
})

const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE
</script>

<template>
  <div class="block">
    <div class="headline">
        <div class="leftSection">
            <slot name="default">标题</slot>
        </div>
        <div class="rightSection">
            <slot name="icon"></slot>
        </div>
    </div>
    <slot name="content">
        <a-empty :image="simpleImage" />
    </slot>
  </div>
</template>

<!-- **
*   插槽：default / icon / content
*   
*   属性：setMargin String
*
* -->

<style lang="scss" scoped>
.block {
    background-color: #fff;
    margin: v-bind(setMargin);
    .headline {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #f0f0f0;
        padding: 0 24px;
        min-height: 48px;
        .leftSection {
            font-weight: 700;
            font-size: 15px;
        }
    }

}
</style>