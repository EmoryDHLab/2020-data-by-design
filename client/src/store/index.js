import Vue from 'vue'
import Vuex from 'vuex'
import dataset from './dataset/index.js'
import notebook from './notebook/notebook.js'
import user from './user-old/index.js'
import datasetNew from './dataset-new/index.js'
// import notebook from './notebook-old/index.js'
import chapters from './chapters/index.js'
import visualization from './visualization/index.js'

Vue.use(Vuex)


const store = new Vuex.Store({
  modules: {
    dataset,
    notebook,
    user,
    chapters,
    datasetNew,
    visualization
  },
  state: {
    errors: []
  },
})

export default store
