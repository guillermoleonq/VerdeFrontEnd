import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import bootswatch from '../node_modules/bootswatch/dist/minty/bootstrap.css'
import bootstrap from '../node_modules/bootstrap/dist/js/bootstrap.js'
import font from '../node_modules/font-awesome/css/font-awesome.css'
import style from '../src/assets/css/style.css'

createApp(App,bootswatch,bootstrap,font,style).use(router).mount('#app')