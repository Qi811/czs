import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode:'hash',
    routes: [{
      path: "/",
      name: "setting",
      component: () => import ('@/views/login/setting.vue'),
      redirect: "/setting/login",
      children:[{
        path: "/setting/login",
        name: "login",
        component: () => import ('@/views/login/lore/login.vue'),
        meta:{
          title:"登录"
        },
        beforeEnter(to,from,next){
          if(to.path == '/setting/login'){
            localStorage.setItem('isactive',1)
            next()
          }
          next()
        }
      },{
        path: "/setting/register",
        name: "register",
        component: () => import ('@/views/login/lore/register.vue'),
        meta:{
          title:"注册"
        },
        beforeEnter(to,from,next){
          if(to.path == '/setting/register'){
            localStorage.setItem('isactive',2)
            next()
          }
          next()
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
      path: "/cashList",
      name: "cashList",
      component: () => import ('@/views/cash/cashList.vue'),
      meta:{
        title:"提现记录"
      }
    },
    {
      path: "/cashInfo",
      name: "cashInfo",
      component: () => import ('@/views/cash/cashInfo.vue'),
      meta:{
        title:"提现资料"
      }
    },
    {
        path: "/cash",
        name: "cash",
        component: () => import ('@/views/cash/cash'),
        meta:{
          title:"余额提现"
        }
    },
    {
      path: "/",
      name: "HelloWorld",
      component: () => import ('@/components/HelloWorld'),
      redirect: "/home",
      children: [
      {
        path: "my",
        name: "my",
        component: () => import ('@/views/myPage/my'),
        meta:{
          title:"我的"
        }
      },{
        path: "home",
        name: "home",
        component: () => import ('@/views/home/home'),
        redirect: "/home/all",
          children: [{
            path: "/home/all",
            name: "all",
            component: () => import ('@/views/home/all'),
            meta:{
              title:"全部任务"
            }
          },{
            path: "/home/news",
            name: "news",
            component: () => import ('@/views/home/news'),
            meta:{
              title:"最新任务"
            }
          }]
      },
      {
        path: "/qrcode",
        name: "qrcode",
        component: () => import ('@/views/team/qrcode.vue'),
        meta:{
          title:"我的二维码"
        }
      }],
    },
    {
      path: "/friend",
      name: "friend",
      component: () => import ('@/views/team/friend.vue'),
      meta:{
        title:"下级人员"
      }
    },
    {
        path: "/income",
        name: "income",
        component: () => import ('@/views/myPage/income.vue'),
        meta:{
          title:"收支明细"
        }
    },
    {
        path: "/beginner",
        name: "beginner",
        component: () => import ('@/views/myPage/beginner.vue'),
        meta:{
          title:"新手指南"
        }
    },
    {
        path: "/business",
        name: "business",
        component: () => import ('@/views/myPage/business.vue'),
        meta:{
          title:"商务合作"
        }
    },
    {
        path: "/bottom",
        name: "bottom",
        component: () => import ('@/views/home/bottom'),
        meta:{
          title:"低价区"
        }
    },
    {
        path: "/height",
        name: "height",
        component: () => import ('@/views/home/height'),
        meta:{
          title:"高价区"
        }
    },
    {
        path: "/enjoy",
        name: "enjoy",
        component: () => import ('@/views/home/enjoy'),
        meta:{
          title:"赏金榜"
        }
    },
    {
        path: "/game",
        name: "game",
        component: () => import ('@/views/home/gamedemo'),
        meta:{
          title:"游戏试玩"
        }
    },
    {
        path: "/taskdetail/:id",
        name: "taskdetail",
        component: () => import ('@/views/home/taskdetail'),
        meta:{
          title:"任务详情"
        }
    },{
      path: '/one',
      name: 'one',
      component: () => import ('@/views/one/one'),
      redirect: "/one/daiwc",
      children:[
        {
          path: '/one/daiwc',
          name: 'daiwc',
          component: () => import ('@/views/one/daiwc'),
          meta:{
            title:"待完成"
          }
        },
        {
          path: '/one/shsb',
          name: 'shsb',
          component: () => import ('@/views/one/shsb'),
          meta:{
            title:"审核失败"
          }
        },
        {
          path: '/one/shz',
          name: 'shz',
          component: () => import ('@/views/one/shz'),
          meta:{
            title:"审核中"
          }
        },
        {
          path: '/one/ysh',
          name: 'ysh',
          component: () => import ('@/views/one/ysh'),
          meta:{
            title:"已审核"
          }
        }
      ]
    }
  ]
});
