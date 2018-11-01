// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // if (to.path == '/') {
  //   sessionStorage.clear();
  // }
  if (to.path == '/login') {
    sessionStorage.clear(); // 登录页面清楚缓存
  }
  if (!token && to.path != '/login') {
    // 没有token,并且不是在login页面，有token可跳，没有就必须登录
    if(sessionStorage.token){
      next()
    }else{
      console.log('login')
      next({ path: '/login' })
    }    
  } else {
    next()
  }
})

var token = sessionStorage.getItem('token')

$.ajaxSetup({
  beforeSend : function (XMLHttpRequest) {
      XMLHttpRequest.setRequestHeader("token", token);
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  mode: 'hash',
  components: { App },
  template: '<App/>'
})
