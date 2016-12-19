import Vue from 'vue'
import App from './App'
import Home from './components/Home.vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

// 注册组件
Vue.use(VueResource)
Vue.use(VueRouter)

// 路由
const routes = [
  { path: '/home', component: Home }
]
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

new Vue({
  router,
  components: {
    app: App
  }
}).$mount('#app')
