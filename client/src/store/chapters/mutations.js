import types from './types'

const mutations = {
    [types.SET_IDNAME](state, payload) {
      const {id} = payload;
      state.idName = id;
    },
    [types.SET_PROGRESS_PEA](state, payload) {
        const {id} = payload;
        state.prog_pea = id;
    },
    [types.SET_PROGRESS_DUB](state, payload) {
        const {id} = payload;
        state.prog_dub = id;
    },
};

export default mutations
