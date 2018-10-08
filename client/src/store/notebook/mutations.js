import Vue from 'vue'
import { USER_REQUEST, USER_SUCCESS, USER_ERROR } from './types'
const cloneDeep = require('clone-deep')

const mutations = {
  [DELETE_NODE] (state, id) {
    state.nodeIds = state.nodeIds.filter(nId => nId !== id)
    state.nodes[id].prev.next = state.nodes[id].next
    state.nodes[id].next.prev = state.nodes[id].prev
    Vue.delete(state.nodes, id)
  },
  [PUSH_NODE] (state, node) {
    { next, prev, id } = node
    state.nodeIds.push(node.id)
    state.nodes[id] = node
  },
  [UPDATE_NODE] (state) {
    state.status = 'error'
    state.loaded = true
  },
  [MOVE_NODE] (state) {
    prev
  }
}

export default mutations
