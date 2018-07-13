import api from '@/api'

const actions = {
  loadDataset ({ commit }, payload) {
    console.log('loading dataset');
    const { dataId, options } = payload
    return api.getDataset('peabody', dataId)
      .then(function(response) {
        commit('setDataset', {
          id: dataId,
          dataset: {
            options: options || {},
            data: response.data
          }
        })
      })
      .catch(function(err) {
        console.log(err)
    })
    .finally(function() {
      console.log('Load complete')
    })
  }
}

export default actions
