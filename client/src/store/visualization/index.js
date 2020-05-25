export default {
  namespaced: true,
  state: {
    visualizationData: {}
  },
  getters: {
    getVisualizationData: state => id => visualizationData[id] ? visualizationData[id] : {error: "not registered"}
  },
  mutations: {
    addData(state, {id, data}) {
      Vue.set(visualizationData, id, data);
    }
  },
  actions: {
    registerVisualization({commit}, {id, data}) {
      commit('addData', {id, data});
    }
  }
}
