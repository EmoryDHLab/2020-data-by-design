import api from '@/api'
import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_ERROR,
} from './types'

const actions = {
  [USER_REQUEST] ({ commit, dispatch }, id) {
    return new Promise((resolve, reject) => {
      commit(USER_REQUEST)
      api.getUser(id)
        .then(resp => {
          commit(USER_SUCCESS, resp.data)
          resolve(resp)
        }).catch(err => {
          commit(USER_ERROR, err)
          reject(err)
        })
    })
  }
}

export default actions
