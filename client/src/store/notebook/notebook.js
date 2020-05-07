import api from "@/api"

const Mutations = {
  AUTH_REQUEST: 'auth_request',
  AUTH_SUCCESS: 'auth_success',
  AUTH_ERROR: 'auth_error',
  LOGOUT: 'logout',
}

const Statuses = {
  [Mutations.AUTH_REQUEST]: 'loading',
  [Mutations.AUTH_SUCCESS]: 'success!',
  [Mutations.AUTH_ERROR]: 'error',
  [Mutations.LOGOUT]: ''
}

export default {
  // namespaced: true, //makes the members 'auth/whatever' on the global scope
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {},
    errorMessage: ''
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    authError: state => state.errorMessage,
    username: state => state.user.name,
    notebook: state => state.user.notebook
  },
  mutations: {
    [Mutations.AUTH_REQUEST](state) {
      state.status = Statuses[Mutations.AUTH_REQUEST];
    },
    [Mutations.AUTH_SUCCESS](state, user) {
      state.status = Statuses[Mutations.AUTH_SUCCESS];
      state.user = user;
      state.token = user.token;
      state.errorMessage = '';
    },
    [Mutations.AUTH_ERROR](state, message) {
      state.status = Statuses[Mutations.AUTH_ERROR];
      state.errorMessage = message ? message : 'error';
    },
    [Mutations.LOGOUT](state) {
      state.status = Statuses[Mutations.LOGOUT];
      state.token = '';
      state.user = {}
      state.errorMessage = '';
    }
  },
  actions: {
    logout({commit}) {
      return new Promise((resolve, reject) => {
        console.log("got here");
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
           if (error.response.data.errors) {
            if (error.response.data.errors["email or password"]) {
              commit(Mutations.AUTH_ERROR, 'Incorrect email or password');
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
      console.log("GOT HERE")
      return new Promise((resolve, reject) => {
        commit(Mutations.AUTH_REQUEST)

        api.createUser(user).then(response => {
          const token = response.data.user.token
          //Local storage allows us to keep track of the logged in user even when the user leaves our application.
          localStorage.setItem('user-token', token)

          commit(Mutations.AUTH_SUCCESS, response.data.user)
          resolve(response);
        }).catch(error => {
          commit(Mutations.AUTH_ERROR)

          localStorage.removeItem('user-token')
          reject(error)
        })
      })
    },

  }
}
