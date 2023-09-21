import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import moment from 'moment'
import store from './store'

Vue.prototype.$moment = moment

Vue.use(ElementUI);

Vue.config.productionTip = false

Vue.prototype.dateTypeFormat = function(fmt, date) {
  let ret
  const opt = {
    'Y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (const k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
    }
  }
  return fmt
}

router.beforeEach((to, from, next) => {
    if (to.path === '/') return next();
    const token = localStorage.getItem('token');
    if (!token) {
        alert('请先登录');
        return next('/');
    }
    next()
})

new Vue({
  router,
  render: h => h(App),
  store,
}).$mount('#app')