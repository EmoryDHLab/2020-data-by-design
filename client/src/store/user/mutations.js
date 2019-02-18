import Vue from 'vue'
import { USER_REQUEST, USER_SUCCESS, USER_ERROR } from './types'
const cloneDeep = require('clone-deep')

const mutations = {
  [USER_REQUEST] (state) {
    state.status = 'loading'
    state.loaded = false
  },
  [USER_SUCCESS] (state, user) {
    state.status = 'success',
    state.firstName = user.firstName;
    state.lastName = user.lastName;
    state.email = user.email;
    state.id = user.id;
    state.loaded = true
  },
  [USER_ERROR] (state) {
    state.status = 'error'
    state.loaded = true
  }
}

export default mutations
