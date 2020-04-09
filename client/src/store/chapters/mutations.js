import types from './types'

const mutations = {
    [types.SET_IDNAME](state, payload) {
      const {id} = payload;
      state.idName = id;
    }
};

export default mutations
