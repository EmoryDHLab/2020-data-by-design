import api from '@/api'
import { UPDATE_NODE, INSERT_NODE, DELETE_NODE, FOCUS_NODE, INCREMENT_ID,
  MERGE_TEXT_NODE, REORDER_NODES } from './types'

const actions = {
  updateNode ({ commit }, node) {
    return commit(UPDATE_NODE, node)
  },
  repositionNodes ({ commit }, nodeIds) {
    return commit(REORDER_NODES, nodeIds)
  },
  addNode ({ commit, state }, { pos, node }) {
    const id = state.nextId // TODO fix so this takes id from api
    commit(INCREMENT_ID)
    const payload = {
      pos,
      node: {
        id,
        type: "TextNode",
        text: node.text || ""
      }
    }
    commit(INSERT_NODE, payload)
    commit(FOCUS_NODE, id)
    return Promise.resolve(payload.node.id)
  },
  removeNode ({ state, getters, commit }, { id, text }) {
    if (text !== "") {
      const pos = getters.position(id)
      const prevID = state.nodeIds[(pos !== 0) ? pos - 1 : pos]
      console.log(text);
      commit(MERGE_TEXT_NODE, { id: prevID, text })
    }
    commit(DELETE_NODE, id)
    return Promise.resolve(id)
  }
}

export default actions
