import api from '@/api'

const state = () => {
  return {
    dataset: {},
    config: {},
    error: {
      isActive: false,
      message: ''
    },
    isLoading: false,
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
    commit('clearError')
    commit('startLoad')
    return api.getDataset('peabody', payload.dataId)
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

// self registers when used

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
