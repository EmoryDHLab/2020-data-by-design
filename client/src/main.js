import Vue from 'vue'
import Notifications from 'vue-notification'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './registerServiceWorker'
import api from './api'

Vue.config.productionTip = false

api.init(localStorage.getItem('user-token'))

Vue.use(Notifications)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
