import Vue from 'vue'
import Vuex from 'vuex'

import DataWrap from './modules/DataWrap'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    dataWraps: {},
    errors: []
  },
  getters: {
    dataWraps (state) {
      return state.dataWraps
    },
    nextId (state) {
      return Object.keys(state.dataWraps).length + 1
    },
    dataWrap (state) {
      return (id) => { console.log(id); return state.dataWraps[id] }
    }
  },
  mutations: {
    addDataWrap (state, id) {
      let dataWrap = DataWrap()
      dataWrap.register(store, id)
      Vue.set(state.dataWraps, dataWrap.id(), dataWrap)
    }
  }
})

export default store
