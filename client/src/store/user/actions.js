import api from '@/api'
import types from './types'

const actions = {
  // authenticate ({ commit }, { token }) {
  //   api.authenticate(token)
  //     .then(success => {
  //       commit(types.SET_AUTH_TOKEN, { token })
  //     })
  //     .catch(err => {
  //
  //     })
  // },
  login ({ commit }, { email, password }) {
    return api.login({ email, password })
      .then(user => commit(types.SET_USER, user))
  },
  validate ({ commit }, user) {
    return api.validate(user)
  }
  // logout ({ commit }) {
  //   // if user is not logged in resolve early. TODO should this be an error?
  //   api.logout()
  //     .then(success => {
  //       // remove the auth token and redirect to home
  //       commit(types.UNSET_USER)
  //     })
  //     .catch(err => {
  //       // could not log out due to an unexpected error
  //       commit(types.SET_ERROR, { error: err })
  //     })
  // }
}

export default actions
