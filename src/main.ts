import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import zhCn from "element-plus/es/locale/lang/zh-cn"
// element 主题
import "element-plus/dist/index.css"

import "vue-keyboard-virtual-next/keyboard.min.css";
import KeyBoard from "vue-keyboard-virtual-next";
const app = createApp(App);
app.use(ElementPlus, { size: "small", zIndex: 3000, locale: zhCn })
app.use(KeyBoard)
app.mount('#app')
