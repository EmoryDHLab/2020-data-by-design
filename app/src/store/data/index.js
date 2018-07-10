import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = () => {
  return {
    datasets: {
      "0": {}
    },
  }
}

export const MODULE_NAME = "data"

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
