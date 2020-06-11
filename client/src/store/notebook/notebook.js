import api from "@/api"
import StatusTypes from "../status-types"

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
  START_DRAG: 'start_drag'
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

const isValidNotebook = notebook => {
  if (!Array.isArray(notebook)) {
    return {valid: false, message: "Notebook must be an array"};
  }
  notebook.forEach ( (item, index) => {
    if (!Number.isInteger(item.notebookId)) {
      return {valid: false, message: `Notebook item of index ${index} must have an integer notebookId property`};
    }
    if (typeof item.metadata !== 'string') {
      return {valid: false, message: `Notebook item of index ${index} must have a string metadata property`};
    }
    if (typeof item.html !== 'string') {
      return {valid: false, message: `Notebook item of index ${index} must have a string html property`};
    }
  })
  return {valid: true}
}

const compareNotebooks = (nb1, nb2) => {
  if (nb1.length !== nb2.length) {
    return false;
  }
  for (let i = 0; i < nb1.length; i++) {
    const item1 = nb1[i];
    const item2 = nb2[i];
    if (item1.notebookId !== item2.notebookId
      || item1.metadata !== item2.metadata
      || item1.html !== item2.html) {
      return false;
    }
  }
  return true;
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
    notebookErrorMessage: '',
    notebookStatus: StatusTypes.CLEAR,
    currentDragData: {},
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.authStatus,
    authError: state => state.authStatus === Statuses[Mutations.AUTH_ERROR] ? state.authErrorMessage : '',
    username: state => state.user.name,
    notebook: state => state.notebook
  },
  mutations: {
    [Mutations.AUTH_REQUEST](state) {
      state.authStatus = Statuses[Mutations.AUTH_REQUEST];
      state.authErrorMessage = '';
    },
    [Mutations.AUTH_SUCCESS](state, user) {
      state.authStatus = Statuses[Mutations.AUTH_SUCCESS];
      state.user = user;
      state.token = user.token;
      state.notebook = user.notebook;
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
    [Mutations.Notebook.UPDATE_REQUEST](state, notebook) {
      state.notebookStatus = Statuses[Mutations.Notebook.UPDATE_REQUEST];
      state.currentNotebookRequest = notebook;
      state.notebookErrorMessage = '';
    },
    [Mutations.Notebook.UPDATE_SUCCESS](state, notebook) {
      state.notebookStatus = Statuses[Mutations.Notebook.UPDATE_SUCCESS];
      state.notebook = notebook;
      state.currentNotebookRequest = [];
      state.notebookErrorMessage = '';
    },
    [Mutations.Notebook.UPDATE_ERROR](state, message) {
      state.notebookStatus = Statuses[Mutations.Notebook.UPDATE_ERROR];
      state.notebookErrorMessage = message || 'error';
    },
    [Mutations.START_DRAG](state, noteData) {
      state.currentDragData = noteData;
    }
  },

  actions: {
    updateNotebook({commit, state, getters}, notebookArray) {
      if (!getters.isLoggedIn) {
        //If the user isn't logged in, save the notebook to be passed to the server on signup
        state.currentNotebookRequest = notebookArray;
        return;
      }
      const validate = isValidNotebook(notebookArray);
      if (!validate.valid) {
        return validate.message;
      }
      if (!compareNotebooks(notebookArray, state.currentNotebookRequest)) {
        return new Promise((resolve, reject) => {
          commit(Mutations.Notebook.UPDATE_REQUEST, notebookArray);
          api.updateNotebook(notebookArray).then(response => {
            commit(Mutations.Notebook.UPDATE_SUCCESS, notebookArray);
            resolve(response);
          }).catch(error => {
            commit(Mutations.Notebook.UPDATE_ERROR);
            reject(error);
          })
        })
      }
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

    register({commit}, user) {
      return new Promise((resolve, reject) => {
        commit(Mutations.AUTH_REQUEST)

        if (this.currentNotebookRequest) {
          user.notebook = this.currentNotebookRequest;
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
    }
  }
}
