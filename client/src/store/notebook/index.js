import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = () => {
  return {
    nodeIds: [0, 1, 2],
    nextId: 3,
    focusedId: -1,
    nodes: {
      0: {
        id: 0,
        type: "TextNode",
        text: "I am a default tex",
      },
      1: {
        id: 1,
        type: "TextNode",
        text: "I am a defa",
      },
      2: {
        id: 2,
        type: "TextNode",
        text: "I am a defaude.",
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
