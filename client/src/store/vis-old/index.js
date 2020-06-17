import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = () => {
  return {
    visualizations: {},
  }
}

export const MODULE_NAME = "vis"

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
