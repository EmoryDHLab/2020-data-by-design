import Vue from 'vue'
import { DELETE_NODE, PUSH_NODE, UPDATE_NODE, INSERT_NODE,FOCUS_NODE,
  INCREMENT_ID, MERGE_TEXT_NODE,REORDER_NODES } from './types'
const cloneDeep = require('clone-deep')

const mutations = {
  [DELETE_NODE] (state, id) {
    state.nodeIds = state.nodeIds.filter(nId => nId !== id)
    Vue.delete(state.nodes, id)
  },
  [PUSH_NODE] (state, node) { // add the node to the end of the list
    const { id } = node
    state.nodeIds.push(node.id)
    state.nodes[id] = node
  },
  [INSERT_NODE] (state, { pos, node }) { // insert the node into the list
    const { id } = node
    state.nodeIds.splice(pos, 0, node.id)
    Vue.set(state.nodes, id, node)
  },
  [UPDATE_NODE] (state, node) { // override the node
    state.nodes[node.id] = { ...state.nodes[node.id], ...node }
  },
  [FOCUS_NODE] (state, id) { // apply focus to the node at the given id
    state.focusedId = id
  },
  [INCREMENT_ID] (state) {
    state.nextId += 1
  },
  [MERGE_TEXT_NODE] (state, {id, text}) {
    state.nodes[id].text += text
  },
  [REORDER_NODES] (state, ids) {
    state.nodeIds = ids
  }
}

export default mutations
