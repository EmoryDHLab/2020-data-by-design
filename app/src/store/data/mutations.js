import Vue from 'vue'

const mutations = {
  // {dataset: , id:}
  setDataset (state, payload) {
    const {id, dataset} = payload
    state.datasets[id] = Object.assign({}, {}, dataset)
  },
  setError (state, err) {
    state.error.isActive = true
    state.error.message = err.data
  },
  clearError (state) {
    state.error.isActive = false
    state.error.message = ''
  },
  startLoad (state) {
    state.isLoading = true
  },
  endLoad (state) {
    state.isLoading = false
  }
}

export default mutations
