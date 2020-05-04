import Vue from 'vue'
import Vuex from 'vuex'
import dataset from './dataset/index.js'
import auth from './auth/index.js'
import user from './user/index.js'
import notebook from './notebook/index.js'
import chapters from './chapters/index.js'

Vue.use(Vuex)


const store = new Vuex.Store({
  modules: {
    dataset,
    auth,
    user,
    notebook,
    chapters
  },
  state: {
    errors: []
  },
})

export default store
