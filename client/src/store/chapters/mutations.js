import types from './types'

const mutations = {
    [types.SET_IDNAME](state, payload) {
      const {id} = payload;
      console.log(id + ' set to state');
      state.idName = id
    }
};

export default mutations
