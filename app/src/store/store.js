import Vue from 'vue'
import Vuex from 'vuex'
const cloneDeep = require('clone-deep')
import api from '@/api'

Vue.use(Vuex)

const types = {
  ADD_DATASET: 'ADD_DATASET',
  REMOVE_DATASET: 'REMOVE_DATASET',
  DUPLICATE_DATASET: 'DUPLICATE_DATASET',
  ADD_DATA: 'ADD_DATA',
  REMOVE_DATA: 'REMOVE_DATA'
}


const store = new Vuex.Store({
  state: {
    datasets: {}, // ids for keys here
    datasetList: [0], // array of ids for sorting
    errors: []
  },
  getters: {},
  mutations: {
    [types.ADD_DATASET] (state, payload) {
      const { id, data, options } = payload,
        cleanOptions = { isMutable: false, ...options },
        isMutable = cleanOptions.isMutable;
      Vue.set(state.datasets, id, { isMutable, data })
      state.datasetList.push(id)
    },
    [types.REMOVE_DATASET] (state, payload) {
      const { id } = payload;
      Vue.delete(state.datasets, id)
      state.datasetList = state.datasetList.filter(item => item !== id)
    },
    [types.DUPLICATE_DATASET] (state, payload) {
      const { id, fromId, options } = payload;
      const cleanOptions = { isMutable: false, ...options };
      const isMutable = cleanOptions.isMutable;
      const clonedData = cloneDeep(state.datasets[fromId].data);
      Vue.set(state.datasets, id, { isMutable, data: clonedData })
    },
    [types.ADD_DATA] (state, payload) {
      const { id, data } = payload;
      const identifiedData = {
        id: Object.keys(state.datasets[id].data).length,
        ...data
      }
      Vue.set(state.datasets[id].data, data.id, data)
    },
    [types.REMOVE_DATA] (state, payload) {
      const { id, data } = payload;
      Vue.delete(state.datasets[id].data, data.id)
    }
  },
  actions: {
    loadDatasets ({ commit }, ids) {
      return api.getDatasets()
        .then(datasets => Object.entries(datasets)
          .forEach(([id, data]) => commit(types.ADD_DATASET, { id, data })))
    }
  }
})

export default store
