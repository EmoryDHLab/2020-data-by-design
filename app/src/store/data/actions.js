const actions = {
  loadData ({ commit }, payload) {
    commit('clearError')
    commit('startLoad')
    return api.getDataset('peabody', payload.dataId)
      .then(function(response) {
        commit('setDataset', response.data)
      })
      .catch(function(err) {
        console.log(err)
        commit('setError', err.response)
    })
    .finally(function() {
      commit('endLoad')
    })
  }
}

export default actions
