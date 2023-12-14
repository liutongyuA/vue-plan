
import type { Container, Application, FederatedPointerEvent, ICanvas, Sprite } from "pixi.js-legacy";
import * as PIXI from "pixi.js-legacy";
import { gsap } from 'gsap'
import type { Ref } from "vue";
import { onMounted, ref } from "vue";
// import { getResourceUrl } from "@/api/oss";
// import { until,useResizeObserver } from "@vueuse/core";
// import { ElMessage } from "element-plus";
import type { EventMode } from "@pixi/events/lib/FederatedEventTarget";
import type { DisplayObject } from "@pixi/display/lib/DisplayObject";
// import { facilityDetail} from "@/api/fire-unit";
export function usePixi(domRef: Ref<HTMLElement>,popoverRef: Ref<HTMLElement>) {
let width: number;
let height: number;
const exist = ref(false);
let app: Application<ICanvas>;
let sprite: Sprite; // 底图
let spriteSrc = "";
let spriteWidthList: number[] = []; // 底图分辨率集合
let spriteWidthListIndex: number = -1; // 底图当前分辨率
let spriteEventMode: EventMode = "none";
let container: Sprite; // 布点容器
const pointCanvas = { width: 0, height: 0 }; // 布点画布大小
let x: number; //布点底图x轴距父元素（容器）距离
let y: number;
let result: {
  //布点底图的大小（通过计算比例得）
  width: number;
  height: number;
};
let increment: { x: number; y: number } = {
  //宽高上缩放的增量
  x: 0,
  y: 0,
};
let scaleBaseLine:number = 731.16;//看之前代码得，写死的倍数值
let markerRed: Sprite

const init = async () => {
  const dom = domRef.value;
  width = dom.clientWidth;
  height = dom.clientHeight;
  // Create a Pixi Application
  app = new PIXI.Application({ width:800,height:800, backgroundColor: 0x383b38 });
  // app = new PIXI.Application({ resizeTo:domRef.value, backgroundColor: 0x383b38 });
  app.stage.setTransform(0, 0, 1, 1);
  app.stage.sortableChildren = true;
  // @ts-ignore
  dom.appendChild(app.view);
  exist.value = true;
  await drawPlan('../急救中心四层FloorPlan1652233242582.svg', [800,2410,4229,7076,10800], 0, "static")
  const datas = [{
    "stat": "[]",
    "facilityType": 2,
    "icon": "../assets/04_Heat Detector.jpg",
    "placeId": 189244,
    "scale": 0.0061,
    "type": "点型光电感烟火灾探测器",
    "layoutId": 189244,
    "positionX": 680.1679,
    "positionY": 181.1583,
    "descr": "急救中心4层西南区烟感",
    "addrStr": "2机 11-22  ",
    "subFacilitiesCode": 0,
    "id": 4434937
  },{
    "stat": "[]",
    "facilityType": 2,
    "icon": "../assets/04_Heat Detector.jpg",
    "placeId": 189244,
    "scale": 0.0061,
    "type": "点型光电感烟火灾探测器",
    "layoutId": 189244,
    "positionX": 690.1679,
    "positionY": 181.1583,
    "descr": "急救中心4层西南区烟感",
    "addrStr": "2机 11-22  ",
    "subFacilitiesCode": 0,
    "id": 44349378
  }]
  setTimeout(() => {
    drawPoints(datas,[1476,695],{
      type: "",
      addrStr: "",
      descr: "",
      status: "",
    })
  }, 1000);
  // useResizeObserver(domRef,()=>{
  //   window.dispatchEvent( new Event('resize'));
  // })
};
// dom挂载后再初始化
if (domRef.value) {
  init();
} else {
  onMounted(() => {
    init();
  });
}
const drawPoints = (pointList: any[], size: number[],devicesDetail:Ref<Object>) => {
  // 删除上一次布点
  if (container) {
    container.destroy(true);
    // @ts-ignore
    container = undefined;
  }
  if (!pointList || pointList.length <= 0) {
    return;
  }
  pointCanvas.width = size[0];
  pointCanvas.height = size[1];

  container = new PIXI.Sprite();
  container.zIndex = 2
  app.stage.addChild(container);
  container.interactive = true
  
  // 新布点
  pointList.forEach((item) => {
    // const url = getResourceUrl(item.icon);
    // Assets.load(url).then()
    addPoint(container, item ,devicesDetail)
    // deviceId&&item.id == deviceId ?item.scale = 0.02 :''
  });
  resizePlanContainer();
};

const addPoint = (container: Container, item: any, devicesDetail:Ref<Object> ,icon?: DisplayObject) => {
  if (icon) {
    icon.x = item.positionX;
    icon.y = item.positionY;
  } else {
    // '/ossProxy'+item.icon
    const bunny = PIXI.Sprite.from(item.icon)
    // bunny.anchor.set(0.5);
    bunny.width = scaleBaseLine * item.scale;
    bunny.height = scaleBaseLine * item.scale;
    bunny.x = item.positionX ;
    bunny.y = item.positionY ;
    bunny.details = item
    icon = bunny;
  }
  if (spriteEventMode) {
    // 监听事件
    icon.eventMode = spriteEventMode;
    icon.cursor = "pointer";
    icon.interactive = true;
    icon.zIndex = 2;
    icon.on("mouseover", (e: FederatedPointerEvent) => {
      console.log('鼠标移入')
      // popoverRef.value.style.display = 'block'
      // // popoverRef.value.style.top = e.clientY - 224 - 150 + 'px'
      // // popoverRef.value.style.left = e.clientX - 205 - 125+ 'px'
      // popoverRef.value.style.top = e.clientY - 150 + 'px'
      // popoverRef.value.style.left = e.clientX  - 125+ 'px'
      // //获取状态
      // devicesDetail.value.type = e.currentTarget.details.type
      // devicesDetail.value.addrStr = e.currentTarget.details.addrStr
      // devicesDetail.value.descr = e.currentTarget.details.descr
      // facilityDetail({id:e.currentTarget.details.id,facilitiesCode:2}).then(res=>{
      //   devicesDetail.value.status = res.data
      // })
    });
    icon.on("mouseout", (e: FederatedPointerEvent) => {
      // popoverRef.value.style.display = 'none'
    });
  }
  container.addChild(icon);
};
//尝试再打一个点 标记选中的设备 index为选中设备在列表的索引
const addDevicePoint = (index:number) =>{
  if(index||index ===0){
    if(markerRed){
      markerRed.x = container.children[index].position.x + container.children[index].width;
      markerRed.y = container.children[index].position.y +container.children[index].height;
    }else{
      markerRed = PIXI.Sprite.from('images/icon/marker_red.png');
      markerRed.anchor.set(0.48,1); 
      markerRed.x = container.children[index].position.x + container.children[index].width;
      markerRed.y = container.children[index].position.y +container.children[index].height;
      container.addChild(markerRed)
    }
    gsap.to(markerRed, {
      y:markerRed.y-5, duration: 0.5, repeat: -1, yoyo: true,overwrite:true
    });
  }
}
const addAlarmPoint = (index:number) =>{
  if(index||index ===0){
      const w =container.children[index].position.x + container.children[index].width/2 
      const h = container.children[index].position.y + container.children[index].height /2 
      const graphics = new PIXI.Graphics();
      graphics.beginFill(0xFF0000);
      graphics.drawCircle( w,h ,8);
      graphics.endFill();
      container.addChild(graphics)
      gsap.to(graphics, {
        alpha: 0.0, duration: 0.8, repeat: -1, yoyo: true
      });
  }
}
let resizeData ={
  scale:0,
  x:0,
  y:0
}
const resizePlanContainer = () => {
  if (sprite && container) {
    // 与底图大小保持一致
    const scaleW = sprite.width / pointCanvas.width;
    const scaleH = sprite.height / pointCanvas.height;
    const scale = Math.min(scaleW, scaleH);
    container.scale.set(scale, scale);
    resizeData.scale = scale
    let x = container.x 
    let y = container.y 
    // 与底图位置保持一致
    container.x = sprite.x;
    container.y = sprite.y;
    resizeData.x += x - sprite.x
    resizeData.y += y - sprite.y
  }
};

const drawPlan = async (src: string, widthList: number[], widthListIndex = 0, eventMode: EventMode = "none") => {
  // 节流
  if (spriteSrc === src && spriteWidthListIndex == widthListIndex) {
    return;
  }
  spriteSrc = src;
  spriteWidthList = widthList;
  spriteWidthListIndex = widthListIndex;
  spriteEventMode = eventMode;
  // Start loading right away and create a promise
  let loader =  new PIXI.Loader()
  let url = '../assets/急救中心四层FloorPlan1652233242582.svg'
  PIXI.utils.clearTextureCache(); 
  // PIXI.utils.clearBaseTextureCache();
  loader.add(url).load(()=>{
  let texture = loader.resources[url].texture
  // await PIXI.Assets.load('../assets/2.png')
  //   // When the promise resolves, we have the texture!
  //   .then((texture) => {
      // create a new Sprite from the resolved loaded Texture
      const newSprite = PIXI.Sprite.from(texture);
      if (sprite && src === spriteSrc) {
        //加载不同分辨率底图
        newSprite.x = sprite.x;
        newSprite.y = sprite.y;
        const scaleH = sprite.height / texture.height;
        const scaleW = sprite.width / texture.width;
        const scale = Math.min(scaleW, scaleH);
        newSprite.scale.set(scale, scale);
      } else {
        result = getImgSize(texture.width, texture.height, app.screen.width, app.screen.height);
        newSprite.width = result.width;
        newSprite.height = result.height;
        x = (app.screen.width - result.width) * 0.5;
        y = (app.screen.height - result.height) * 0.5;
        newSprite.x = x;
        newSprite.y = y;
      }
      // 销毁老的底图
      if (sprite) {
        sprite.destroy();
        // @ts-ignore
        sprite = undefined;
      }

      sprite = newSprite;
      app.stage.addChild(newSprite);
      // if (eventMode) {
      //   // 监听事件
      //   newSprite.eventMode = eventMode;
      //   newSprite.cursor = "pointer";
      //   newSprite.on("click", (e: FederatedPointerEvent) => {
      //     printLog();
      //     // console.log({ global: e.global, client: e.client, page: e.page }, e);
      //   });
      // }
    })
};
const getImgSize = (naturalWidth: number, naturalHeigh: number, maxWidth: number, maxHeight: number) => {
  const imgRatio = naturalWidth / naturalHeigh;
  const maxRatio = maxWidth / maxHeight;
  let width, height;
  // 如果图片实际宽高比例 >= 显示宽高比例
  if (imgRatio >= maxRatio) {
    if (naturalWidth > maxWidth) {
      width = maxWidth;
      height = (maxWidth / naturalWidth) * naturalHeigh;
    } else {
      width = naturalWidth;
      height = naturalHeigh;
    }
  } else {
    if (naturalHeigh > maxHeight) {
      width = (maxHeight / naturalHeigh) * naturalWidth;
      height = maxHeight;
    } else {
      width = naturalWidth;
      height = naturalHeigh;
    }
  }
  return { width: width, height: height };
}
const scale = async (ratio: number, offsetX: number, offsetY: number) => {
  const element = sprite;
  ratio = ratio < 0 ? 1.1 : 0.9;
  const newScale = { x: element.scale.x * ratio, y: element.scale.y * ratio };
  //缩放前大小
  const scaleBeginWidth = element.width;
  const scaleBeginHeight = element.height;
  //中心点坐标
  const origin = {
    x: (ratio - 1) * result.width * 0.5,
    y: (ratio - 1) * result.height * 0.5,
  };
  //偏移量
  x -= (ratio - 1) * (offsetX - x) - origin.x;
  y -= (ratio - 1) * (offsetY - y) - origin.y;
  // 底图缩放
  element.scale.x = newScale.x;
  element.scale.y = newScale.y;
  //以左上角缩放时（此处未设置中心锚点）平移要减宽高的增量increment.x
  increment = {
    x: (element.width - scaleBeginWidth) / 2 + increment.x,
    y: (element.height - scaleBeginHeight) / 2 + increment.y,
  };
  element.x = x - increment.x;
  element.y = y - increment.y;
  // 底图分辨率自适应调整
  const currentWidth = spriteWidthList[spriteWidthListIndex];
  if (spriteWidthListIndex < spriteWidthList.length - 1 && element.width > currentWidth) {
    await drawPlan(spriteSrc, spriteWidthList, spriteWidthListIndex + 1, spriteEventMode);
  }

  // // 布点容器调整
  resizePlanContainer();
}

let lastPosition: { x: number; y: number } | undefined;

const setLastPosition = (position: { x: number; y: number } | undefined) => {
  lastPosition = position;
}

const move = (x1: number, y1: number) => {
  if (lastPosition) {
    const element = sprite;
    x += x1 - lastPosition.x;
    y += y1 - lastPosition.y;
    element.x += x1 - lastPosition.x;
    element.y += y1 - lastPosition.y;
    lastPosition = { x: x1, y: y1 };
    // 布点容器调整
    resizePlanContainer();
  }
};
//布点相关
let movePointer:any
let cross :any= null; //布点十字线
let subscript:any = null; //布点十字线下标图
/**画线相关 */
// let startPoint = null  //鼠标按下开始的位置
// let endPoint = null //鼠标按下开始的位置
// let isDrawing = false
// let graphics :any = null// 线
const startPlan = ()=>{
  cross = new PIXI.Graphics().lineStyle({ color: 0xffffff, width: 2 }).moveTo(0, -2000).lineTo(0, 2000).moveTo(-2000, 0).lineTo(2000, 0)
  subscript = PIXI.Sprite.from('../assets/04_Heat Detector.jpg');
  subscript.scale.set(0.1)
  app.stage.eventMode = 'static';
  app.stage.hitArea = app.screen;
  app.stage.interactive = true;
  app.stage.on('mousemove', (e:MouseEvent) =>{
    if(e.data.originalEvent.target != app.renderer.view){
      return
    }
    movePointer = e.data.global
    const circle = app.stage.addChild(cross);
    circle.position.copyFrom(e.data.global);
    subscript.position.x = e.data.global.x +10;
    subscript.position.y = e.data.global.y +10;
    app.stage.addChild(subscript);
    // if (!isDrawing) return;
    // endPoint = app.renderer.plugins.interaction.mouse.getLocalPosition(app.stage)
    // app.ticker.add(drawDashLine);
  });
  app.stage.on('mouseout', () =>{
      app.stage.removeChild(cross);
      app.stage.removeChild(subscript);
      // if (!isDrawing) return;
      // isDrawing = false;
      // startPoint = null
      // endPoint = null
      // app.ticker.remove(drawDashLine);
      // graphics.clear();
  });
  /**画线相关 */
  // graphics = new PIXI.Graphics();
  // app.stage.addChild(graphics);
  // app.stage.on('mousedown', () =>{
  //   startPoint = app.renderer.plugins.interaction.mouse.getLocalPosition(app.stage);
  //   console.log('按下',startPoint)
  //   isDrawing = true;
  // });
  // app.stage.on('mouseup', () =>{
  //   if (!isDrawing) return;
  //     isDrawing = false;
  //     startPoint = null
  //     endPoint = null
  //     app.ticker.remove(drawDashLine);
  //     // 在这里可以处理线条绘制完成后的逻辑
  //     console.log('松开')
  //     graphics.clear();
  // });

  //打点
  app.stage.on('click', (e:MouseEvent) =>{
    planPoint({
      x:( movePointer.x / resizeData.scale) + (resizeData.x / resizeData.scale),
      y:( movePointer.y / resizeData.scale) + (resizeData.y / resizeData.scale) 
    })
  })

}
// const drawDashLine = (delta) =>{
//   graphics.clear();
//   graphics.lineStyle(2, 0xffffff, 1, 0.5, true);
//   graphics.moveTo(startPoint.x, startPoint.y);
//   graphics.lineTo(endPoint.x, endPoint.y);
// }
const endPlan=()=>{
  app.stage.off('mousemove')
  app.stage.off('pointerout')
  app.stage.off('click')
  app.stage.off('mouseup')
  app.stage.off('mousedown')
}
const planPoint = ({x, y}:any)=>{
  const bunny = PIXI.Sprite.from('../assets/04_Heat Detector.jpg');
  bunny.scale.set(0.1)
  bunny.x = x - (bunny.width / 2)
  bunny.y = y - (bunny.height / 2) 
  container.addChild(bunny)
  // endPlan() 不能直接写 需要加判断
}

const movePlan=()=>{
  /*container 绑定事件不能取到点击的图对象，所以考虑在创建图对象时绑定事件*/
  // container.on('click',(e)=>{
  //   console.log('点击',e.data.originalEvent)
  //   // e.currentTarget.cursor = "pointer";
  //   // // startPlan()
  //   // container.removeChild(e.currentTarget)
  //   // console.log(container,e.currentTarget)
  // })
  container.children[0].on('click',(e)=>{
    startPlan()
    container.removeChild(e.currentTarget)
  })

}
return { destroy, scale, move, setLastPosition,drawPoints,addDevicePoint, addAlarmPoint,startPlan,endPlan,movePlan};
}
