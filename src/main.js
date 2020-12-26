import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import vueRouter from 'vue-router'
import routes from './routes'

Vue.use(vueRouter);

const router = new vueRouter({
  mode: 'history',
  routes: routes
})

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App),
  router: router
}).$mount('#app')
