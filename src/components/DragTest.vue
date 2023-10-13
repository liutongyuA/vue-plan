<template>
  <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" node-key="id">
    <template #default="{ node, data }">
      <span class="custom-tree-node">
        <span>{{ node.label }}</span>
      </span>  
    </template>
  </el-tree>

</template>
<script>
  export default {
    data() {
      return {
        data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            },{
              label: '三级 1-1-2'
            },{
              label: '三级 1-1-3'
            },{
              label: '三级 1-1-4'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        arr:[]
      };
    },
    methods: {
      handleNodeClick(data,node) {
        let event_ = window.event || arguments.callee.caller.arguments[0];
        let shiftKeyDowned = event_.shiftKey;
        let ctrlKeyDowned = event_.ctrlKey;
        // console.log(data,node,shiftKeyDowned); //
        //选中的节点
        console.log(this.arr)
        if(ctrlKeyDowned){
          this.arr.push(node)
            // 取消选中
            // props.node[tree.selectedKey] = false
            // this.arr.splice(this.arr.length, 1)
            console.log(this.arr)
            this.arr[this.arr.length - 2].isCurrent = true
            // 选中
            // props.node[tree.selectedKey] = true
          

        }
      }
    }
  };
</script>
<style>
 .el-tree-node.is-current > .el-tree-node__content {
    background-color: #b0caff !important;
  }
  .is-highlight .el-tree-node__content {
    background-color: #b0caff !important;
  }
  </style>