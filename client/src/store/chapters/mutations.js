import types from './types'

const mutations = {
    [types.SET_IDNAME](state, payload) {
      const {id} = payload;
      state.idName = id;
    },
    [types.SET_PROGRESS](state, payload) {
        const {id} = payload;
        state.prog = id;
    },
};

export default mutations
