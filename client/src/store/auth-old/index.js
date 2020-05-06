import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = () => {
  return {
    token: localStorage.getItem('user-token') || '',
    status: "",
    error: "",
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
