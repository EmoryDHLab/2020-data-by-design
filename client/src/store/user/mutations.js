import Vue from 'vue'
import types from './types'
const cloneDeep = require('clone-deep')

const mutations = {
  [types.SET_USER] (state, user) {
    console.log("user id", user.userId);
    state.email = user.email
  }
}

export default mutations
