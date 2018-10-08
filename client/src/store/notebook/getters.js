
// note that most of these return functions to allow for more specific gets
const getters = {
  firstNode (state) {
    return state.nodes[state.firstNode]
  },
  lastNode (state) {
    return state.nodes[state.lastNode]
  },
  nodeById (state) {
    return (id) => {
      return state.nodes[id]
    }
  }
}

export default getters
