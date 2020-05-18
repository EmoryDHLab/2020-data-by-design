import mutations from './mutations'
import getters from './getters'

const state = () => {
  return {
    idName: "",
    prog_dub: '0.0',
    prog_pea: '0.0',
    prog_pla: '0.0',
    curloc: '0.0',
  }
};

export default {
  state,
  getters,
  mutations,
}
