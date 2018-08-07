import Vue from 'vue'
import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR,
  AUTH_LOGOUT,
  AUTH_LOGOUT_SUCCESS
} from './types'

const mutations = {
  [AUTH_REQUEST] (state) {
    state.status = 'loading'
  },
  [AUTH_SUCCESS] (state, token) {
    state.status = 'success',
    state.token = token
  },
  [AUTH_ERROR] (state, error) {
    state.status = 'error'
    state.error = error.message
  },
  [AUTH_LOGOUT] (state) {
    state.status = 'logging out'
  },
  [AUTH_LOGOUT_SUCCESS] (state) {
    state.status = ''
    state.token = ''
  }
}

export default mutations
