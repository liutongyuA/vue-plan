
<template>
  <el-button @click="com = !com">切换组件</el-button>
  <!-- <Plan v-if="com"/>
  <Drag v-else /> -->
  <!-- <DragTest v-else /> -->
  <home />
  <!-- <index /> -->
  <!-- <Plan ref="xx"/> -->
  <el-input v-model="xx"></el-input>

</template>

<script setup lang="ts">
  // import Plan from './components/Plan.vue'
  // import Drag from './components/Drag.vue'
  import home from './components/home.vue'
  // import index from './components/index.vue'
  // import DragTest from './components/DragTest.vue'
  import {ref} from 'vue'
  const com = ref(true)
  const xx = ref(null)
  setTimeout(()=>{console.log(xx.value)},2000)
</script>

<style scoped lang="scss">

</style>
