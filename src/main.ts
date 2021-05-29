import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import axios from 'axios'
import * as mockData from './mock'

// @ts-ignore 不会检查类型
axios.get = async (url: string) => {
  console.log('axios url', url)
  if (url === '/posts') {
    return Promise.resolve({
      data: [mockData.todayPost, mockData.thisWeek, mockData.thisMonth]
    })
  }
}

const app = createApp(App)

app.use(ElementPlus)
app.use(router).mount('#app')
