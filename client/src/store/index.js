import Vue from 'vue'
import Vuex from 'vuex'
import dataset from './dataset/index.js'
import user from './user/index.js'

Vue.use(Vuex)


const store = new Vuex.Store({
  modules: {
    dataset,
    user
  },
  state: {
    errors: []
  },
})

export default store
