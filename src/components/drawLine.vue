<template>
    <div ref="canvasContainer"></div>
  </template>
  
  <script>
  import * as PIXI from 'pixi.js';
  
  export default {
    name: 'CADComponent',
    data() {
      return {
        app: null,
        graphics: null,
        isDrawing: false,
        startPoint: null,
        endPoint: null,
      };
    },
    mounted() {
      this.app = new PIXI.Application({
        width: 800,
        height: 600,
        backgroundColor: 0x000000,
        antialias: true,
      });
  
      this.$refs.canvasContainer.appendChild(this.app.view);
  
      this.graphics = new PIXI.Graphics();
      this.app.stage.addChild(this.graphics);
  
      this.app.view.addEventListener('mousedown', this.handleMouseDown);
      this.app.view.addEventListener('mousemove', this.handleMouseMove);
      this.app.view.addEventListener('mouseup', this.handleMouseUp);
      this.app.view.addEventListener('mouseout', this.handleMouseout);
    },
    beforeUnmount() {
      this.app.view.removeEventListener('mousedown', this.handleMouseDown);
      this.app.view.removeEventListener('mousemove', this.handleMouseMove);
      this.app.view.removeEventListener('mouseup', this.handleMouseUp);
  
    },
    methods: {
      handleMouseDown(event) {
        const pos = this.app.renderer.plugins.interaction.mouse.getLocalPosition(this.app.stage);
        this.startPoint = pos;
        console.log('按下',this.startPoint)
        this.isDrawing = true;
       
      },
      handleMouseMove(event) {
        if (!this.isDrawing) return;
        const pos = this.app.renderer.plugins.interaction.mouse.getLocalPosition(this.app.stage);
        this.endPoint = pos;
        this.app.ticker.add(this.drawDashLine);
      },
      handleMouseUp(event) {
        if (!this.isDrawing) return;
        this.isDrawing = false;
        this.startPoint = null
        this.endPoint = null
        this.app.ticker.remove(this.drawDashLine);
        // 在这里可以处理线条绘制完成后的逻辑
        console.log('松开')
        this.graphics.clear();
      },
      handleMouseout(event){
        console.log('移出')
        if (!this.isDrawing) return;
        this.isDrawing = false;
        this.startPoint = null
        this.endPoint = null
        this.app.ticker.remove(this.drawDashLine);
        this.graphics.clear();
      },
      drawDashLine(delta) {
        this.graphics.clear();
        this.graphics.lineStyle(2, 0xffffff, 1, 0.5, true);
        this.graphics.moveTo(this.startPoint.x, this.startPoint.y);
        this.graphics.lineTo(this.endPoint.x, this.endPoint.y);
      },
    },
  };
  </script>