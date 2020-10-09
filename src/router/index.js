import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
	mode:'history',
    routes: [
    {
      path: "/",
      name: "setting",
      component: () => import ('@/views/login/setting.vue'),
      redirect:{
        name: "login"
      },
      children:[{
        path: "/setting/login",
        name: "login",
        component: () => import ('@/views/login/lore/login.vue'),
        meta:{
          title:"登录"
        }
      },{
        path: "/setting/register",
        name: "register",
        component: () => import ('@/views/login/lore/register.vue'),
        meta:{
          title:"注册"
        }
      }]
    },
    {
      path: "/uptpd",
      name: "uptpd",
      component: () => import ('@/views/login/lore/uptPd.vue'),
      meta:{
        title:"修改密码"
      }
    },
    {
      path: "/qrcode",
      name: "qrcode",
      component: () => import ('@/views/team/qrcode.vue'),
      meta:{
        title:"我的二维码"
      }
    }    ]
});
