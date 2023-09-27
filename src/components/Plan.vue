<template>
  <el-button @click="addDevicePoint(selectIndex)">打点</el-button>
  <el-button @click="addAlarmPoint(25)">报警点</el-button>
  <el-button @click="startPlan" type="primary">开始布点</el-button>
  <el-button @click="endPlan" type="danger">结束布点</el-button>
  <el-button @click="movePlan" type="danger">移动布点</el-button>
   <div
     class="container"
     ref="container"
     @wheel="handleScale"
     @mousedown="handleMousedown"
     @mouseup="handleMouseup"
     @mousemove="handleMousemove"
   >
     </div>
     <!-- <div class="popover" ref="popover">
       <el-descriptions :column="1">
           <el-descriptions-item label="设施类型">{{ devicesDetail.type }}</el-descriptions-item>
           <el-descriptions-item label="地址">{{ devicesDetail.addrStr }}</el-descriptions-item>
           <el-descriptions-item label="安装位置">{{ devicesDetail.descr }}</el-descriptions-item>
           <el-descriptions-item label="状态">{{ devicesDetail.status }}</el-descriptions-item>
       </el-descriptions>
     </div> -->
 </template>
 
 <script setup lang="ts">
 import { usePixi } from "./usePixi";
 import { onUnmounted, onMounted, ref} from "vue";
//  import { getResourceUrl } from "@/api/oss";
//  import { cleanObject, stringSplit } from "@/assets/utils";
//  import { facilitiesLayout, placePlan, placeChildren} from "@/api/fire-unit";
//  import { useFacilities } from "@/cache/dict";
//  import { Icon } from "@iconify/vue";
//  import { useToggle } from "@vueuse/core";
//  import BaseCheckGroup from "@/components/form/BaseCheckGroup.vue";
 
 
 const container = ref();
 const popover = ref();
 
 const { destroy, scale, move, setLastPosition,  startPlan,addDevicePoint, addAlarmPoint,endPlan,movePlan} = usePixi(container,popover);
 
 onUnmounted(() => {
   destroy();
 });
 onMounted(()=>{
 })

 //收缩列表
//  const [placeChildrenListVisible, togglePlaceChildrenListVisible] = useToggle(true);
 // 设备详情信息
//  let devicesDetail = ref({
//    type:'',
//    addrStr:'',
//    descr:'',
//    status:''
//  })

 function handleScale(e: WheelEvent) {
   scale(e.deltaY, e.offsetX, e.offsetY);
 }
 
 function handleMousedown(e: WheelEvent) {
   setLastPosition({ x: e.offsetX, y: e.offsetY });
 }
 
 function handleMouseup() {
   setLastPosition(undefined);
 }
 
 function handleMousemove(e: WheelEvent) {
   move(e.offsetX, e.offsetY);
 }
 </script>
 
 <style lang="scss" scoped>
 .container {
  width: 1000px;
   height: 800px;
   overflow: hidden;
   position: relative;
 }
 
 // .plan-name {
 //   position: absolute;
 //   top: 6px;
 //   right: 10px;
 //   color: #ffffff;
 // }
 
 .placeholder {
   position: absolute;
   top: 50%;
   left: 50%;
   color: var(--el-color-white)
 }
 
 .facilities {
   position: absolute;
   top: 6px;
   left: 6px;
 }
 
 .place-children{
   height: 97%;
   width: 20%;
   background-color: var(--el-bg-color);
   border: var(--el-border);
   border-radius: var(--el-border-radius-base);
   padding: 0 0 var(--margin-half) var(--margin-half);
   font-size: 14px;
   position: absolute;
   top: 6px;
   right: 6px;
   .place-children-header {
     height: 24px;
     line-height: 24px;
     position: sticky;
     font-weight: bold;
     top: 0;
     z-index: 11;
     padding: var(--margin-half) 0;
     margin-right: var(--margin-half);
     margin-left: var(--margin-half);
     border-bottom: var(--el-border-style) var(--el-border-width) var(--el-border-color-lighter);
     background-color: var(--el-bg-color);
 
     // .el-icon {
     //   padding: 0 4px;
     // }
   }
   .place-children-list{
     list-style-type: none;
     margin: 0;
     padding: var(--margin-half);
     overflow: auto;
     height: calc(100% - 39px);
     .place-children-item{
       height: 35px;
       line-height: 35px;
       cursor: pointer;
       overflow: hidden;
       white-space: nowrap;
       text-overflow: ellipsis;
     }
     .place-children-item + .place-children-item{
       border-top: var(--el-border-style) var(--el-border-width) var(--el-border-color-lighter);
     }
     .active {
         background: var(--el-color-primary-light-9);
         color: var(--el-text-color-regular);
     }
    
   }
 
   .fold-button{
       position: absolute;
       left: 0;
       top: 50%;
     }
 }
 .expand-button{
   position: absolute;
   right: 0;
   top: 50%;
 }
 .popover{
   width: 250px;
   height: 130px;
   background-color: var(--el-fill-color-blank);
   color:  var(--el-color-white);
   border: var(--el-border);
   border-radius: var(--el-border-radius-base);
   position: fixed;
   top: 100px;
   left: 100px;
   z-index: 9999;
   display: none;
   &::before, &::after {
     content: '';
     display: block;
     border: 10px solid transparent;
     width: 0;
     height: 0;
     position: absolute;
     left: 50%;
     transform: translateX(-50%);
   }
   &::before {
     border-top-color: var(--el-color-white);
     top: 100%;
   }
   &::after {
     border-top-color: var(--el-fill-color-blank);
     top: calc(100% - 1px);
   }
 }
 </style>
 