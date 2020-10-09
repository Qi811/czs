import Vue from 'vue'
import App from './App'
import router from './router'

import store from './store/store.js'

Vue.config.productionTip = false

import '@/assets/css/reset.css'
import '@/assets/css/elem.css'

import apiaxios from '@/api/index.js';
Vue.config.productionTip = false;
Vue.prototype.$http = apiaxios

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element);

Vue.prototype.bus = new Vue;


router.beforeEach((to,from,next) => {
    document.title = to.meta.title;
    next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
