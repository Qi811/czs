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
  if(to.path == '/home/all' || to.path == '/home/news' || to.path == '/my'
    || to.path == '/qrcode' || to.path == '/friend' || to.path == '/income'
    || to.path == '/bottom' || to.path == '/height' || to.path == '/one'
    || to.path == '/one/daiwc' || to.path == '/one/shsb' || to.path == '/one/shz'
    || to.path == '/one/ysh' || to.path == '/uptpd' || to.path == '/cashList'
    || to.path == '/cashInfo' || to.path == '/cash'){
    if(localStorage.getItem('id')){
      next()
    }else{
      // this.bus.$emit('tips', {
      //   show: true,
      //   title: '你还未登录'
      // })
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
  if(to.path == '/one/shsb'){
    localStorage.setItem('isActive',4)
    next()
  }else if(to.path == '/one/shz'){
    localStorage.setItem('isActive',2)
    next()
  }else if(to.path == '/one/ysh'){
    localStorage.setItem('isActive',3)
    next()
  }else if(to.path == '/one/daiwc' || to.path == '/one'){
    localStorage.setItem('isActive',1)
    next()
  }
  next()
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
