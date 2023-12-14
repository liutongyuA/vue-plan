<template>
    <el-input v-model="toolParameter.latheNumber" @focus="onInputFocus('latheNumber')">
    </el-input>
    
    <input id="deviceID" class="deviceID" />
    <!-- <KeyBoard @change='change' color="#D00000" dargHandleText="在此拖拽" :blurHide="true"/> -->
    <div v-show="showKeyboard">
    <!-- <simple-keyboard ref="SimpleKeyboard" @onChange="onChangeKeyboard" /> -->
    </div>
</template>
<script>
 import  {initVk } from '../js/initVk'
//  import SimpleKeyboard from './simpleKeyboard.vue'
export default {
  name: 'Home',
//    components: {
//     SimpleKeyboard,
//    },
   data() {
    return {
        showKeyboard: false, //键盘默认隐藏
        changeIpt:'',//选择了哪个输入框
        toolParameter:{
            latheNumber:2,
            tid:2
        }
    }
   },
   mounted(){
    initVk('deviceID')
   },
   methods:{
    // inpuit获取焦点显示虚拟键盘
    onInputFocus(res) {
      this.showKeyboard = true
      this.changeIpt = res
      // 父组件调用子组件的方法
      this.$refs.SimpleKeyboard.onKeyPress('{clear}')
    },
 // 给输入框赋值
    onChangeKeyboard(input) {
      if (this.changeIpt == 'latheNumber') {
        this.toolParameter.latheNumber = input
      } else if (this.changeIpt == 'tid') {
        this.toolParameter.tid = input
      }
    },
    // 点击关闭隐藏键盘
    closekeyboard() {
      this.showKeyboard = false
    },
   }
}
</script>
<style lang="scss">

.simple-keyboard {
  position: absolute;
  bottom: 0;
  left: 5%;
  width: 90%;
  color: #000;
  z-index: 999999999;
}
 .key-board{
//   top: 0 ;
// width: 2rem !important;
}
</style>