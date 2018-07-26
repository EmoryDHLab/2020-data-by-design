import Vue from 'vue'
import Vuex from 'vuex'
import dataset from './dataset/index.js'

Vue.use(Vuex)


const store = new Vuex.Store({
  modules: {
    dataset
  },
  state: {
    errors: []
  },
})

export default store
