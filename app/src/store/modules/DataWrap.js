import axios from 'axios'

const state = () => {
  return {
    dataset: {},
    metadata: {
      
    },
    error: {
      isActive: false,
      message: ''
    },
    isLoading: false
  }
}

const getters = {
  dataset: (state) => state.dataset,
  error: (state) => state.error,
  isLoading: (state) => state.isLoading
}

const mutations = {
  setDataset (state, dataset) {
    state.dataset = Object.assign({}, {}, dataset)
  },
  setError (state, err) {
    state.error.isActive = true
    state.error.message = err.data
  },
  clearError (state) {
    state.error.isActive = false
    state.error.message = ''
  },
  startLoad (state) {
    state.isLoading = true
  },
  endLoad (state) {
    state.isLoading = false
  }
}

const actions = {
  loadData ({ commit }, payload) {
    console.log("init")
    commit('clearError')
    commit('startLoad')
    return axios.get('/api/data/' + payload.dataId)
      .then(function(response) {
        commit('setDataset', response.data)
      })
      .catch(function(err) {
        console.log(err)
        commit('setError', err.response)
    })
    .finally(function() {
      commit('endLoad')
    })
  }
}

const NAME = 'DataWrap'

const DataWrap = function () {
  let _store;
  let _id;
  return {
    register (store, id) {
      _store = store
      _id = id
      if (_store[`${NAME}${_id}`]) return;
      _store.registerModule(`${NAME}${_id}`, {
        state,
        getters,
        mutations,
        actions,
        namespaced: true
      })
    },
    get (field) {
      return _store.getters[`${NAME}${_id}/${field}`]
    },
    dispatch (action, payload) {
      return _store.dispatch(`${NAME}${_id}/${action}`, payload)
    },
    id () {
      return _id
    }
  }
}

export default DataWrap
