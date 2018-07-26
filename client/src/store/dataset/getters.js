
// note that most of these return functions to allow for more specific gets
const getters = {
  getDataset: (state) => {
    return id => {
      // get the actual dataset given by id from the data module (without options)
      return state.datasets[id].data
    }
  },
  count: (state) => {
    return Object.keys(state.datasets).length
  }
}

export default getters
