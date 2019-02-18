const actions = {
  changeDataset ({ commit, getters }, payload) {
    const { id, datasetId } = payload
    if (!id) throw new Error('The visualization id must be provided')
    if (!datasetId) throw new Error('The new dataset id must be provided')
    if (getters.getDatasetId(id) === datasetId) return;
    commit('setDataset', { id, datasetId })
  }
}

export default actions
