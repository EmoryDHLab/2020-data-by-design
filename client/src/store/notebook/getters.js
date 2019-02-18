
// note that most of these return functions to allow for more specific gets
const getters = {
  nodeById (state) {
    return (id) => state.nodes[id]
  },
  nodeByPosition (state) {
    return (pos) => {
      console.log(pos);
      return state.nodes[state.nodeIds[pos]]
    }
  },
  position (state) {
    return (id) => state.nodeIds.indexOf(id)
  },
  nodes (state) {
    return state.nodeIds.map(nodeId => state.nodes[nodeId])
  },
  focusedId (state) {
    return state.focusedId
  },
  focused (state) {
    return (id) => id === state.focusedId
  }
}

export default getters
