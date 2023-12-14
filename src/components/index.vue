<template>
    <div class="xxx">
        
   <div class="run-view-root">
        <!-- <div class="header">
            <img class="header-title" src="./../assets/img/title.png"  />
            <div class="header-back" @click="linkToHome">
                返回首页
            </div>
        </div> -->
        <div class="container" id="container-box">
            <div id="code-container">
                <div class="code-text html-code"></div>
                <div class="code-text css-code"></div>
                <div class="code-text js-code"></div>
            </div>
            <div id="resize"></div>
            <div id="result-preview"></div>
        </div>
    </div>
</div>

</template>

<script>
export default {
    methods: {
        linkToHome() {
            this.$router.push({
                name: "Home"
            });
        },
        resizeChange() {
            // 获取dom
            let resize = document.getElementById("resize");
            let top = document.getElementById("code-container");
            let bottom = document.getElementById("result-preview");
            let box = document.getElementById("container-box");
            resize.onmousedown = (e) => {
                let startY = e.clientY;
                // 此处减去header的60px
                resize.top = resize.offsetTop - 20;
                document.onmousemove = (e) => {
                    let endY = e.clientY;

                    let moveLen = resize.top + (endY - startY);
                    let maxT = box.clientHeight - resize.offsetHeight;
                    // 保留最小200的高度
                    if (moveLen < 100) moveLen = 100;
                    if (moveLen > maxT - 100) moveLen = maxT - 100;

                    resize.style.top = moveLen;
                    top.style.height = moveLen + "px";
                    // 减去resize的高度10px
                    bottom.style.height = box.clientHeight - moveLen - 10 + "px";
                };
                document.onmouseup = (evt) => {
                    // 清除事件
                    document.onmousemove = null;
                    document.onmouseup = null;
                    // 鼠标捕获事件
                    resize.releaseCapture && resize.releaseCapture();
                };
                // 鼠标捕获事件
                resize.setCapture && resize.setCapture();
                return false;
            };
        }
    },
    mounted() {
        this.resizeChange();
    }
}
</script>

<style lang="scss" scoped>
/* 拖拽相关样式 */
/*包围div样式*/
$--run-background-color: #1e1f26;
$--run-border-color: #333642;
.xxx{
    width: 800px;
    height: 800px;
}
.run-view-root {
    min-width: 1200px;
    width: 100%;
    height: 100%;
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 60px;
        box-sizing: border-box;
        border-bottom: 1px solid $--run-border-color;
        background: $--run-background-color;
        .header-title {
            margin-left: 40px;
        }
        .header-back {
            margin-right: 40px;
            color: #fff;
            cursor: pointer;
            &:hover {
                text-decoration: underline;
            }
        }
    }
    .container {
        width: 100%;
        height: calc(100% - 60px);
        #code-container {
            display: flex;
            width: 100%;
            height: calc(50% - 5px);
            background: $--run-background-color;
            .code-text {
                width: 33.33%;
                border-right: 2px solid $--run-border-color;
                &:last-child {
                    border: 0px;
                }
            }
        }
        #resize {
            width: 100%;
            height: 9px;
            background: $--run-border-color;
            border-bottom: 1px solid black;
            box-shadow: 0 0 1px black;
            cursor: s-resize;
            z-index: 999;
        }
        #result-preview {
            width: 100%;
            height: calc(50% - 5px);
            background: radial-gradient(circle, #444857, #2c303a);
        }
    }
}
</style>