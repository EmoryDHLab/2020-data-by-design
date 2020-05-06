import api from "@/api"

const Mutations = {
  AUTH_REQUEST: 'auth_request',
  AUTH_SUCCESS: 'auth_success',
  AUTH_ERROR: 'auth_error',
  LOGOUT: 'logout',
}

const Statuses = {
  [Mutation.AUTH_REQUEST]: 'loading',
  [Mutation.AUTH_SUCCESS]: 'success!',
  [Mutation.AUTH_ERROR]: 'error',
  [Mutation.LOGOUT]: ''
}

export default {
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {}
  },
  getters: {
    isLoggedIn: !!state.token,
    authStatus: state.status
  },
  mutations: {
    [Mutations.AUTH_REQUEST](state) {
      state.status = Statuses[Mutation.AUTH_REQUEST];
    },
    [Mutation.AUTH_SUCCESS](state, user) {
      state.status = Statuses[Mutation.AUTH_SUCCESS];
      state.user = user;
      state.token = user.token;
    },
    [Mutation.AUTH_ERROR](state) {
      state.status = Statuses[Mutation.AUTH_ERROR];
    },
    [Mutation.LOGOUT](state) {
      state.status = Statuses[Mutation.LOGOUT];
    }
  },
  actions: {
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
          const token = response.user.token;
          //Local storage allows us to keep track of the logged in user even when the user leaves our application.
          localStorage.setItem('user-token', token)

          commit(Mutations.AUTH_SUCCESS, user)
          resolve(response)
        }).catch(error => {
          commit(Mutaitons.AUTH_ERROR);

          localStorage.removeItem('user-token')
          reject(error);
        })
      })
    },

    register({commit}, user) {
      return new Promise((resolve, reject) => {
        commit(Mutations.AUTH_REQUEST)

        api.createUser(user).then(response => {
          const token = response.user.token;
          //Local storage allows us to keep track of the logged in user even when the user leaves our application.
          localStorage.setItem('user-token', token)

          commit(Mutations.AUTH_SUCCESS, user)
          resolve(response);
        }).catch(error => {
          commit(Mutaitons.AUTH_ERROR)

          localStorage.removeItem('user-token')
          reject(error)
        })
      })
    },

  }
}
