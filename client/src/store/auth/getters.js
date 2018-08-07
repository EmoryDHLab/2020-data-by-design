
// note that most of these return functions to allow for more specific gets
const getters = {
  isAuthenticated (state) {
    return !!state.token
  },
  authStatus (state) {
    return state.status
  }
}

export default getters
