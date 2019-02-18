import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = () => {
  return {
    status: "",
    email: "",
    firstName: "",
    lastName: "",
    id: "",
    loaded: false
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
