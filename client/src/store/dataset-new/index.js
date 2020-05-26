import StatusTypes from "../status-types"
import api from '@/api'
import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    datasets: {},
    loadStatus: StatusTypes.CLEAR
  },
  getters: {
    getDatasetById: state => id => {
      if (state.datasets[id]) {
        return state.datasets[id];
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
      Vue.set(state.datasets, id, data);
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
          .then(resp => {
            commit("loadSuccess", {id: datasetId, data: resp.data});
            resolve(resp.data);
          })
          .catch(err => {
            commit("loadError");
            reject(err);
          })
      })
    }
  }
}
