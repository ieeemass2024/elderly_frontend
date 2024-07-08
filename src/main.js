import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
// 引入echarts
import * as echarts from 'echarts'

// import horizontalScroll from 'el-table-horizontal-scroll'

// axios.defaults.baseURL = "http://43.143.247.127:8088/api/v1"
axios.defaults.baseURL = "http://localhost:8088/api/v1"
Vue.prototype.$http = axios


Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.use(ElementUI)

// websocket获取预警消息
let webSocketConnection = null
Vue.prototype.$webSocket = {
  connect() {
    webSocketConnection = new WebSocket('ws://localhost:8090/ws')
    webSocketConnection.onopen = () => {
      console.log('WebSocket connection established')
    }
    webSocketConnection.onmessage = (event) => {
      console.log('Received message:', event)
      try {
        const data = JSON.parse(event.data);
        Message({
          message: `${data.message}: ${data.alert_type}`,
          type: 'warning',
          duration: 5000,
        });
      } catch (error) {
        console.error('Error parsing JSON from WebSocket:', error);
      }
    }
    webSocketConnection.onerror = (error) => {
      console.error('WebSocket error:', error)
    }
    webSocketConnection.onclose = () => {
      console.log('WebSocket connection closed')
      webSocketConnection = null
    }
  },
  disconnect() {
    if (webSocketConnection) {
      webSocketConnection.close()
    }
  }
}

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
