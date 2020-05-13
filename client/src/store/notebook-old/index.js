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
        text: "This visualization seems like it doesn't really tell you much just looking at it...",
      },
      1: {
        id: 1,
        type: "TextNode",
        text: "However, I do think it is interesting how the colors work to make a piece of art",
      },
      2: {
        id: 2,
        type: "TextNode",
        text: "Maybe that is the point? Or is it in the construction of the visualization that we learn most?",
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
