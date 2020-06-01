import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    mutableData: { lastUpdated: null }
  },
  getters: {
    isRegisteredMutable: state => id => id in state.mutableData,
    getMutableData: state => id => state.mutableData[id] ? state.mutableData[id] : {error: "not registered"}
  },
  mutations: {
    addMutableData(state, {id, data}) {
      state.mutableData.lastUpdated = Date.now();
      Vue.set(state.mutableData, id, data);
    }
  },
  actions: {
    registerMutableData({commit, getters}, {id, data}) {
      if (getters.isRegisteredMutable(id)) {
        console.error(`visualization already registered with id ${id}! overriding...`)
     }
      commit('addMutableData', {id, data});
    },
    transform({commit, getters}, {id, transform /*function (dataObj) => transformedData*/}) {
     if (id && getters.isRegisteredMutable(id)) {
       const transformedData = transform(getters.getMutableData(id));
       // debugger;
       commit('addMutableData', {id, data: transformedData});
     }
    }
  }
}
