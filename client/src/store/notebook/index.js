import api from "@/api"
import StatusTypes from "../status-types"
import { isValidNotebook, compareNotebooks } from "dxd-common";
import mutableStore from "../mutable/index.js"

const Mutations = {
  AUTH_REQUEST: 'auth_request',
  AUTH_SUCCESS: 'auth_success',
  AUTH_ERROR: 'auth_error',
  LOGOUT: 'logout',
  Notebook: {
    UPDATE_REQUEST: 'update_notebook',
    UPDATE_SUCCESS: 'update_notebook_success',
    UPDATE_ERROR: 'update'
  },
  START_DRAG: 'start_drag',
  END_DRAG: 'end_drag'
}

const Statuses = {
  [Mutations.AUTH_REQUEST]: StatusTypes.REQUESTED,
  [Mutations.AUTH_SUCCESS]: StatusTypes.SUCCESS,
  [Mutations.AUTH_ERROR]: StatusTypes.ERROR,
  [Mutations.LOGOUT]: StatusTypes.CLEAR,
  [Mutations.Notebook.UPDATE_SUCCESS]: StatusTypes.SUCCESS,
  [Mutations.Notebook.UPDATE_REQUEST]: StatusTypes.REQUESTED,
  [Mutations.Notebook.UPDATE_REQUEST]: StatusTypes.ERROR,
}

export default {
  // namespaced: true, //makes the members 'notebook/whatever' on the global scope
  state: {
    authStatus: StatusTypes.CLEAR,
    token: localStorage.getItem('token') || '',
    user : {}, // {_id: String, email: String, notebook: Array, token: String}
    notebook: [],
    authErrorMessage: '',
    currentNotebookRequest: [],
    currentMutableDataRequest: {},
    notebookErrorMessage: '',
    notebookStatus: StatusTypes.CLEAR,
    currentDragData: {},
  },
  modules: {
    mutableStore: Object.assign({ namespaced: true }, mutableStore)
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.authStatus,
    authError: state => state.authStatus === Statuses[Mutations.AUTH_ERROR] ? state.authErrorMessage : '',
    username: state => state.user.name,
    notebook: state => state.notebook,
    mutableData: state => state.user.mutableData
  },
  mutations: {
    [Mutations.AUTH_REQUEST](state) {
      state.authStatus = Statuses[Mutations.AUTH_REQUEST];
      state.authErrorMessage = '';
    },
    [Mutations.AUTH_SUCCESS](state, user) {
      state.authStatus = Statuses[Mutations.AUTH_SUCCESS];
      state.user = user;
      state.notebook = user.notebook;
      state.token = user.token;
      // state.authErrorMessage = '';
    },
    [Mutations.AUTH_ERROR](state, message) {
      state.authStatus = Statuses[Mutations.AUTH_ERROR];
      state.authErrorMessage = message || 'error';
    },
    [Mutations.LOGOUT](state) {
      state.authStatus = Statuses[Mutations.LOGOUT];
      state.notebookStatus = Statuses[Mutations.LOGOUT];
      state.token = '';
      state.user = {}
      state.authErrorMessage = '';
      state.notebook = [];
    },
    [Mutations.Notebook.UPDATE_REQUEST](state, {notebook, data}) {
      state.notebookStatus = Statuses[Mutations.Notebook.UPDATE_REQUEST];
      state.currentNotebookRequest = notebook;
      state.currentMutableDataRequest = data;
      state.notebookErrorMessage = '';
    },
    [Mutations.Notebook.UPDATE_SUCCESS](state, {notebook, data}) {
      state.notebookStatus = Statuses[Mutations.Notebook.UPDATE_SUCCESS];
      state.notebook = notebook;
      state.user.mutableData = data;
      state.currentNotebookRequest = [];
      state.currentMutableDataRequest = {};
      state.notebookErrorMessage = '';
    },
    [Mutations.Notebook.UPDATE_ERROR](state, message) {
      state.notebookStatus = Statuses[Mutations.Notebook.UPDATE_ERROR];
      state.notebookErrorMessage = message || 'error';
    },
    [Mutations.START_DRAG](state, noteData) {
      state.currentDragData = noteData;
    },
    [Mutations.END_DRAG](state) {
      state.currentDragData = {};
    }
  },

  actions: {
    updateNotebook({commit, state, getters}, {notebookArray, mutableData}) {
      if (!notebookArray && !mutableData) return;

      if (notebookArray) {
        const validate = isValidNotebook(notebookArray);
        if (!validate.valid) {
          return validate.message;
        }
      }
      if (!getters.isLoggedIn) {
        //If the user isn't logged in, save the notebook to be passed to the server on signup
        if (notebookArray)
          state.currentNotebookRequest = notebookArray;
        if (mutableData)
          state.currentMutableDataRequest = mutableData;
        return;
      }

      const sameNotebook = compareNotebooks(notebookArray, state.currentNotebookRequest);
      const toSend = {
        ...(notebookArray && !sameNotebook) && {notebook: notebookArray},
        ...mutableData && {data: mutableData}
      }

      return new Promise((resolve, reject) => {
        commit(Mutations.Notebook.UPDATE_REQUEST, toSend);
        api.updateNotebook(toSend).then(response => {
          commit(Mutations.Notebook.UPDATE_SUCCESS, toSend);
          resolve(response);
        }).catch(error => {
          commit(Mutations.Notebook.UPDATE_ERROR);
          reject(error);
        })
      })
    },

    logout({commit}) {
      return new Promise((resolve, reject) => {
        commit(Mutations.LOGOUT);
        api.logout();
        localStorage.removeItem('user-token');
        resolve();
      })
    },

    login({commit}, user) {
      return new Promise((resolve, reject) => {

        commit(Mutations.AUTH_REQUEST)

        api.login(user).then(response => {

          const token = response.data.user.token;
          //Local storage allows us to keep track of the logged in user even when the user leaves our application.
          localStorage.setItem('user-token', token)

          commit(Mutations.AUTH_SUCCESS, response.data.user)
          resolve(response)

        }).catch(error => {;
           const errors = error && error.response && error.response.data && error.response.data.errors;
           if (errors) {
            if (errors["email or password"]) {
              commit(Mutations.AUTH_ERROR, 'Incorrect email or password');
            } else {
              const message = Object.keys(errors).map(key => `${key} ${errors[key]}`).join(' and ');
              commit(Mutations.AUTH_ERROR, message);
            }
          } else {
            commit(Mutations.AUTH_ERROR);
          }

          localStorage.removeItem('user-token')
          reject(error);
        })
      })
    },

    register({commit, state}, user) {
      return new Promise((resolve, reject) => {
        commit(Mutations.AUTH_REQUEST)

        if (state.currentNotebookRequest) {
          user.notebook = state.currentNotebookRequest;
        }
        if (state.currentMutableDataRequest) {
          user.mutableData = state.currentMutableDataRequest;
        }

        api.createUser(user).then(response => {
          const token = response.data.user.token
          //Local storage allows us to keep track of the logged in user even when the user leaves our application.
          localStorage.setItem('user-token', token)

          commit(Mutations.AUTH_SUCCESS, response.data.user)
          resolve(response);
       }).catch(error => {;
          const errors = error && error.response && error.response.data && error.response.data.errors;
          if (errors) {
            if (errors["email or password"]) {
              commit(Mutations.AUTH_ERROR, 'Incorrect email or password');
            } else {
              const message = Object.keys(errors).map(key => `${key} ${errors[key]}`).join(' and ');
              commit(Mutations.AUTH_ERROR, message);
            }
          } else {
            commit(Mutations.AUTH_ERROR);
          }

          localStorage.removeItem('user-token')
          reject(error);
        })
      })
    },

    getCurrentUser() {
      return api.getCurrentUser();
    },

    startDrag({commit}, noteData) {
      commit(Mutations.START_DRAG, noteData);
    },

    completeDrag({commit, state, getters, dispatch}) {
      const mutableId = state.currentDragData.data && state.currentDragData.data.mutable;
      if (mutableId) {
        if (!getters['mutableStore/isRegisteredMutable'](mutableId) &&
          getters['mutable/isRegisteredMutable'](mutableId)) {
          const lastData = getters['mutable/getMutableData'](mutableId);
          dispatch('mutableStore/registerMutableData', { id: mutableId, data: lastData})
        }
      }
      commit(Mutations.END_DRAG);
    }
  }
}
