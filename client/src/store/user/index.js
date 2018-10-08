import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = () => {
  return {
    nodeIds: [0, 1, 3],
    firstNode: 3,
    lastNode: 1,
    nodes: {
      0: {
        id: 0,
        type: "TextNode",
        text: "I am a default text node.",
        prev: 3,
        next: 1
      },
      1: {
        id: 0,
        type: "TextNode",
        text: "I am a default text node.",
        previous: 0,
        next: undefined,
      },
      3: {
        id: 3,
        type: "TextNode",
        text: "I am a default text node.",
        prev: undefined
        next: 0
      }
    },
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
