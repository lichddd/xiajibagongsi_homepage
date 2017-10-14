import Vue from 'vue'
import Router from 'vue-router'

import cookie from '@/util/cookie'
Vue.use(Router)
let router = new Router({
  routes: [
    // { path: '/', redirect: '/' },
  ]
})
router.beforeEach((to,from,next)=>{
  if (to.name!="login") {
    if (cookie.getCookie("token")) {
      next();
    } else {
      if (from&&from.fullPath && from.fullPath!="/") {
        Message({showClose:true,message:"尚未登录或登录信息已过期,请重新登录",type:"warning"});
      }
      next({
        name:"login",
        query:{
          redirect:to.fullPath
        }


      });
    }




  } else {
    next();
  }




})



export default router;
