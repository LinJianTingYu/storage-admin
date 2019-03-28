// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import Axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'

import App from './App'
Vue.config.productionTip = false
Vue.prototype.$http = Axios

// 添加请求头
Axios.interceptors.request.use(config => {
  // var token = sessionStorage.getItem('token')
  // config.headers['Authorization'] = 'bearer ' + token
  return config
})

// 请求返回拦截
Axios.interceptors.response.use(
  res => {
    if (res.status === 401) {
      // app &&
      //   app.$message({
      //     type: 'warning',
      //     message: '登录身份过期，请重新登录。'
      //   })
      // sessionStorage.removeItem('token')
      // sessionStorage.removeItem('user')
      // router.push({ name: 'login' })
      return Promise.reject(new Error('身份过期'))
    } else {
      return res
    }
  }
)

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
