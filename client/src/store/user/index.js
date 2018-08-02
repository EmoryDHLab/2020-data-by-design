import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = () => {
  return {
    email: "",
    authToken: "",
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
