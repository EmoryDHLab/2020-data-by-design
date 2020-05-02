import mutations from './mutations'
import getters from './getters'

const state = () => {
  return {
    idName: "",
    prog: '0.0',
  }
};

export default {
  state,
  getters,
  mutations,
}
