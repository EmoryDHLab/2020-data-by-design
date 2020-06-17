import Vue from 'vue';

export default {
  state () {
    return {
      mutableData: { lastUpdated: null }
    }
  },
  getters: {
    isRegisteredMutable: state => id => id in state.mutableData,
    getMutableData: state => id => state.mutableData[id] ? state.mutableData[id] : {error: "not registered"}
  },
  mutations: {
    addMutableData(state, {id, data}) {
      state.mutableData.lastUpdated = Date.now();
      Vue.set(state.mutableData, id, data);
    },
    loadMutableData(state, data) {
      state.mutableData = data;
      state.mutableData.lastUpdated = Date.now()
    }
  },
  actions: {
    loadMutableData({commit, state}, mutableData) {
      if (state.mutableData.lastUpdated !== mutableData.lastUpdated) {
        commit('loadMutableData', mutableData);
      }
    },
    registerMutableData({commit, getters}, {id, data}) {
      if (getters.isRegisteredMutable(id)) {
        console.error(`visualization already registered with id ${id}! overriding...`)
     }
      commit('addMutableData', {id, data});
      console.log("Registering " + id);
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
