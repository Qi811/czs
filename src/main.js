import Vue from 'vue'
import App from './App'
import router from './router'

import store from './store/store.js'

Vue.config.productionTip = false

import '@/assets/css/reset.css'
import "@/views/index.css";

import moment from "moment";
import apiaxios from '@/api/index.js';
Vue.config.productionTip = false;
Vue.prototype.$http = apiaxios
Vue.prototype.$moment = moment;

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element);

Vue.prototype.bus = new Vue;

// import Mui from 'vue-awesome-mui';
// Vue.use(Mui);

router.beforeEach((to,from,next) => {
  document.title = to.meta.title;
  if(to.path == '/home/all'){
    if(localStorage.getItem('id')){
      next()
    }else{
      next('/setting/login')
    }
  }else{
    next()
  }
  if(to.path == '/setting/login'){
    if(localStorage.getItem('id')){
      next('/home/all')
    }else{
      next()
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
