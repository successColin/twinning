import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routerConfig from "@/router";
import './util/rem';

Vue.config.productionTip = false
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  router: new VueRouter(routerConfig),
}).$mount('#app')
