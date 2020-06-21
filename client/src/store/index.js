import Vue from 'vue'
import Vuex from 'vuex'
import datasetOld from './dataset/index.js'
import notebook from './notebook/index.js'
import user from './user-old/index.js'
import mutable from './mutable/index.js'
import dataset from './dataset-new/index.js'
import chapters from './chapters-old/index.js'

Vue.use(Vuex)

const namespaced = module => Object.assign(module, { namespaced: true });

const store = new Vuex.Store({
  modules: {
    mutable: namespaced(mutable),
    notebook,
    user,
    chapters,
    datasetOld,
    dataset: namespaced(dataset),
  },
  state: {
    errors: []
  },
})

export default store
