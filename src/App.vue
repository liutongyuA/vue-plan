
<template>
  <el-button @click="com = !com">切换组件</el-button>
  <Plan v-if="com"/>
  <!-- <Drag v-else /> -->
  <DragTest v-else />
</template>

<script setup lang="ts">
  import Plan from './components/Plan.vue'
  // import Drag from './components/Drag.vue'
  import DragTest from './components/DragTest.vue'
  import {ref} from 'vue'
  const com = ref(true)
</script>

<style scoped>

</style>
