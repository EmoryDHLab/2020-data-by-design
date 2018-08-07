import api from '@/api'
import types from './types'

const actions = {
  loadDatasets ({ commit }, ids) {
    return api.getDatasets()
      .then(response => response.data)
      .then(datasets => Object.entries(datasets)
        .forEach(([id, data]) => commit(types.ADD_DATASET, { id, data })))
  }
}

export default actions
