
// note that most of these return functions to allow for more specific gets
const getters = {
  getDataset: (state, getters) => {
    return id => {
      // get the actual dataset given by id from the data module
      return state.datasets[id]
    }
  },
  count: (state) => {
    return Object.keys(state.datasets).length
  }
}

export default getters
