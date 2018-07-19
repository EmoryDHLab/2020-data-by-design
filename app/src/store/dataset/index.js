import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = () => {
  return {
    datasets: {}, // ids for keys here
    datasetList: [], // array of ids for sorting
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
