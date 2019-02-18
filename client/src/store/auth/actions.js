import api from '@/api'
import {
  AUTH_REQUEST,
  AUTH_CREATE,
  AUTH_SUCCESS,
  USER_REQUEST,
  AUTH_ERROR,
  AUTH_LOGOUT,
  AUTH_LOGOUT_SUCCESS
} from './types'

import UserActions from '../user/types'

const actions = {
  [AUTH_REQUEST] ({ commit, dispatch }, user) {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      api.login(user)
        .then(resp => {
          const token = resp.data.id
          localStorage.setItem('user-token', token)
          commit(AUTH_SUCCESS, token)
          dispatch(UserActions.USER_REQUEST, resp.data.userId)// get the user info
          resolve(resp)
        })
        .catch(err => {
          commit(AUTH_ERROR, err)
          localStorage.removeItem('user-token')
          reject(err)
        })
    })
  },
  [AUTH_LOGOUT] ({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit(AUTH_LOGOUT)
      api.logout(state.token)
        .then(resp => {
          commit(AUTH_LOGOUT_SUCCESS)
          localStorage.removeItem('user-token')
          resolve()
        })
        .catch(err => {
          commit(AUTH_ERROR, err)
          reject(err)
        })
    })
  },
  [AUTH_CREATE] ({ commit, dispatch, state }, user) {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      api.createUser(user)
        .then(resp => {
          console.log(resp)
          // const token = resp.data.id
          // localStorage.setItem('user-token', token)
          // commit(AUTH_SUCCESS, token)
          // dispatch(UserActions.USER_REQUEST, resp.data.userId)// get the user info
          resolve(resp)
        })
        .catch(err => {
          commit(AUTH_ERROR, err)
          localStorage.removeItem('user-token')
          reject(err)
        })
    })
  }
}

export default actions
