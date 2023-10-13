<template>
  <div class="container">
    <aside>
      <el-tree
        :data="data"
        ref="treeRef"
        node-key="id"
        default-expand-all
        @node-drag-start="handleDragStart"
        @node-click="handleNodeClick"
        draggable
        :allow-drop="allowDrop"
        :allow-drag="allowDrag"
      ></el-tree>
    </aside>
    <main @drop="drop"  @dragover.prevent>
      <!-- <ul>
        <li
          v-for="(item,index) in rightList"
          :key="index"
        >{{item.label}}</li>
      </ul> -->
      <el-table  :data="tableData"
      :row-key="tableRowKey"
      ref="table">
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" />
        </el-table>
    </main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2",
              children: [
                {
                  id: 11,
                  label: "三级 3-2-1"
                },
                {
                  id: 12,
                  label: "三级 3-2-2"
                },
                {
                  id: 13,
                  label: "三级 3-2-3"
                }
              ]
            }
          ]
        }
      ],
      rightList: [],
      tableData: [
        {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ],
    batchSelectTree:[]
    };
  },
  methods: {
    handleDragStart(node, ev) {
      ev.dataTransfer.setData("item", JSON.stringify(node.data));
    },
    allowDrop(draggingNode, dropNode, type) {
      return false;
    },
    allowDrag(draggingNode) {
      return true;
    },
    drop(event) {
      let data = event.dataTransfer.getData("item");
      this.tableData.push({ 
        date: '2016-05-03',
        name: 'Tom',
        address: JSON.parse(data).label})
    //   console.log('this.rightList:', this.rightList)
    },
    // node点击事件
  handleNodeClick (data, node){
    let event_ = window.event || arguments.callee.caller.arguments[0];
    let shiftKeyDowned = event_.shiftKey;
    let ctrlKeyDowned = event_.ctrlKey;
    console.log(ctrlKeyDowned,node.checked)
    if (ctrlKeyDowned == false && shiftKeyDowned == false) {
        // 都没有点击
        this.$refs.treeRef.setCheckedKeys([data.id]);
        this.batchSelectTree = [data];
    } else if (ctrlKeyDowned == true && shiftKeyDowned == false) {
        //只点击ctrl
        if (node.checked) {
            this.$refs.treeRef.setChecked(data.id, false);
            let index = this.batchSelectTree
                .map((el) => el.id)
                .indexOf(data.id);
            this.batchSelectTree.splice(index, 1);
        } else {
            this.$refs.treeRef.setChecked(data.id, true);
            this.batchSelectTree.push(data);
        }
    } else if (ctrlKeyDowned == false && shiftKeyDowned == true) {
        //只点击shift
        if (this.batchSelectTree.length == 0) return;
        let showNodes = node.parent.childNodes;
        let start = this.batchSelectTree[0]; //数值列里第一个
        let startIndex = showNodes.map((el) => el.data.id).indexOf(start.id);
        let endIndex = showNodes.map((el) => el.data.id).indexOf(data.id); //当前的node
        if (startIndex > endIndex) {
            // 往上选择
             this.cancelSelectTree();
            for (let index = startIndex; index >= endIndex; index--) {
                const el = showNodes[index];
                this.$refs.treeRef.setChecked(el.data.id, true);
                this.batchSelectTree.push(el.data);
            }
        } else {
            // 往下选择
            this.cancelSelectTree();
            for (let index = startIndex; index <= endIndex; index++) {
                const el = showNodes[index];
                this.$refs.treeRef.setChecked(el.data.id, true);
                this.batchSelectTree.push(el.data);
            }
        }
    } else {
        // 都有点击，当做都没点击处理
        this.$refs.treeRef.setCheckedKeys([data.id]);
        this.batchSelectTree = [data];
    }
  },
  // 取消原来的选中
  cancelSelectTree(){
      this.batchSelectTree.forEach((el) => {
          this.$refs.treeRef.setChecked(el.id, false);
      });
      this.batchSelectTree = [];
  }
  }
};
</script>
 
<style scoped>
*{
    margin: 0;
    padding: 0;
}
.container {
  display: flex;
  height: 500px;
  overflow: auto;
}
 
.container > aside {
  width: 300px;
  height: 100%;
  border: 1px solid royalblue;
}
 
.container > main {
  flex: 1;
  height: 100%;
  border: 1px solid red;
}
</style>