import Vue from 'vue'
import types from './types'
const cloneDeep = require('clone-deep')

const mutations = {
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
}

export default mutations
