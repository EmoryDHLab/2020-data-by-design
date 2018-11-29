import Vue from 'vue'
import Notifications from 'vue-notification'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './registerServiceWorker'
import api from './api'

Vue.config.productionTip = false

Vue.component('font-awesome-icon', FontAwesomeIcon)

api.init(localStorage.getItem('user-token'))

Vue.use(Notifications)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
