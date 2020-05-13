
// note that most of these return functions to allow for more specific gets
const getters = {
  firstName (state) {
    return state.firstName
  },
  lastName (state) {
    return state.lastName
  }
}

export default getters
