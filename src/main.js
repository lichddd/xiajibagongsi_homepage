// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import cookie from '@/util/cookie'
import filter from './filter'
import vue$methods from './vue$methods'

import language from '@/config/language'

if(process.env.NODE_ENV=="development")
{

}



window.axios=axios;

axios.interceptors.request.use((config)=>{
  progress.progressing.push({});
  return config;
},(error)=>{
  progress.progressing.shift();
  if (error.toString()!="Cancel") {
    Message({showClose:true,message:"网络通信失败",type:"error"});

  }
  return Promise.reject(error);
});
axios.interceptors.response.use((response)=>{
  progress.progressing.shift({});
  if (response.status!=200) {
    Message({showClose:true,message:"服务器异常",type:"error"});
    return Promise.reject(response.statusText);
  }
  else if (!(response.data&&response.data.code!=null)) {
    Message({showClose:true,message:"服务器异常",type:"error"});
    return Promise.reject(response.data);
  }
  else if (response.data.code!=0) {
    Message({showClose:true,message:response.data.desc,type:"error"});
    if (response.data.code==9999) {
      cookie.delCookie("token");
      router.replace({
        name:"login",
        query:{
          redirect:router.currentRoute.path
        }


      });
    }

    return Promise.reject(response.data);
  }
  return response;
},(error)=>{
  progress.progressing.shift();
  if (error.toString()!="Cancel") {
    let response=error.response;
    if (response.status!=200) {
      Message({showClose:true,message:"服务器异常",type:"error"});
      return Promise.reject(response.statusText);
    }
    else if (!(response.data&&response.data.code!=null)) {
      Message({showClose:true,message:"服务器异常",type:"error"});
      return Promise.reject(response.data);
    }
    else if (response.data.code!=0) {
      Message({showClose:true,message:response.data.desc,type:"error"});
      return Promise.reject(response.data);
    }
    Message({showClose:true,message:"网络通信失败",type:"error"});

  }
  return Promise.reject(error);
});


let progress={
  progressing:[],
}
let eventer={
  emit:null,
  on:null,
  off:null,
  _events:Object.create(null),
  _hasHookEvent:false
}

Vue.mixin({
  data(){
    return {'progress':progress,'eventer':eventer,'language':language};
  }
});
Vue.config.productionTip = false;

Vue.prototype.$config={
  host_pre_url:process.env.NODE_ENV=="development"?"http://localhost:8081/":'',
}

Vue.use(filter);
Vue.use(vue$methods);
/* eslint-disable no-new */
let vm=new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
eventer.emit=vm.$emit;
eventer.on=vm.$on;
eventer.off=vm.$off;
