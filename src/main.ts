import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import axios from 'axios'
import * as mockData from './mock'
import "highlight.js/styles/monokai.css"
import { Post } from './types';
import { v4 as uuidv4 } from 'uuid'

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// @ts-ignore 不会检查类型
axios.get = async (url: string) => {
  console.log('axios url', url)
  await delay(1000)
  if (url === '/posts') {
    return Promise.resolve({
      data: [mockData.todayPost, mockData.thisWeek, mockData.thisMonth]
    })
  }
}

// @ts-ignore 不会检查类型
axios.post = async (url: string, payload: Post) => {
  console.log('axios url', url)
  await delay(1000)
  const id = uuidv4()
  if (url === '/posts') {
    return Promise.resolve({
      data: { ...payload, id, }
    })
  }
}

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.mount('#app')
