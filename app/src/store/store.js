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
        isMutable = cleanOptions.isMutable,
        nextId = Object.keys(data).length;
      Vue.set(state.datasets, id, { isMutable, nextId, data })
      state.datasetList.push(id)
    },
    [types.REMOVE_DATASET] (state, payload) {
      const { id } = payload;
      Vue.delete(state.datasets, id)
      state.datasetList = state.datasetList.filter(item => item !== id)
    },
    [types.DUPLICATE_DATASET] (state, payload) {
      const { id, fromId, options } = payload,
        cleanOptions = { isMutable: false, ...options },
        isMutable = cleanOptions.isMutable,
        { nextId } = state.datasets[fromId];
      const clonedData = cloneDeep(state.datasets[fromId].data);
      Vue.set(state.datasets, id, { isMutable, nextId, data: clonedData })
    },
    [types.ADD_DATA] (state, payload) {
      const { id, data } = payload;
      console.log(Object.keys(state.datasets[id].data).length);
      const identifiedData = {
        id: state.datasets[id].nextId,
        ...data
      }
      Vue.set(state.datasets[id].data, identifiedData.id, identifiedData)
      state.datasets[id].nextId++
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
