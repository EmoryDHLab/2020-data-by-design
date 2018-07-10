import Vue from 'vue'

const mutations = {
  // payload should be { id: "", datasetId:""}
  setDataset (state, payload) {
    state.visualizations[payload.id].datasetId = payload.datasetId
  },
  // payload should be { id: "", config: {}, datasetId: 0 }
  addVis (state, payload) {
    Vue.set(state.visualizations, payload.id, {
        id: payload.id,
        config: payload.config,
        datasetId: payload.datasetId,
        dataFormatter: payload.dataFormatter
      }) // done explicitly in case payload is messed up
  },
  // payload should be { id: "" }
  deleteVis (state, payload) {
     Vue.delete(state.visualizations, payload.id)
  }
}

export default mutations
