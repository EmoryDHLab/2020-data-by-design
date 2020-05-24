import StatusTypes from "../status-types"

export default {
  namespaced: true,
  state: {
    datasets: {},
    loadStatus: StatusTypes.CLEAR
  },
  getters: {
    getDatasetById: state => id => {
      if (datasets[id]) {
        return datasets[id];
      }
      return {error: "not loaded"};
    }
  },
  mutations: {
    loadStart (state) {
      state.loadStatus = StatusTypes.REQUESTED;
    },
    loadSuccess (state, {id, data}) {
      state.loadStatus = StatusTypes.SUCCESS;
      state.datasets[id] = data;
    },
    loadError (state) {
      state.loadStatus = StatusTypes.ERROR;
    }
  },
  actions: {
    // loadAllDatasets() {
    //   return api.getDatasets()
    //   .then(response => response.data)
    //   .then(datasets => Object.entries(datasets)
    //     .forEach(([id, data]) => commit(types.ADD_DATASET, { id, data })))
    // },
    loadDataset({commit}, datasetId) {
      return new Promise((resolve, reject) => {
        commit("loadStart");
        api.getDataset(datasetId)
          .then(data => commit("loadSuccess", {datasetId, data}))
          .catch(commit("loadError"))
      })
    }
  }
}
