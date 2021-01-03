import Vue from 'vue'
import Vuex from 'vuex'
import notebook from './notebook/index.js'
import mutable from './mutable/index.js'
import dataset from './dataset-new/index.js'
import chapters from './chapters/index.js'
import footnotes from './footnotes/index'

Vue.use(Vuex)

const namespaced = module => Object.assign(module, { namespaced: true });

const store = new Vuex.Store({
  modules: {
    mutable: namespaced(mutable),
    notebook,
    chapters: namespaced(chapters),
    footnotes: namespaced(footnotes),
    dataset: namespaced(dataset),
  },
  state: {
    errors: []
  },
})

export default store
