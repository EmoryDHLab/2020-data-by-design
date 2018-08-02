import axios from 'axios'

export default {
  getDataset (id) {
    return axios.get(`/api/data/${id}`)
  },
  getDatasets (full=true) {
    return axios.get(`/api/data?full=${full}`).then(response => response.data)
  },
  login (user) {
    return axios.post('/api/readers/login', user)
      .then(response => response.data)
      .catch(err => alert("Error logging in"))
  },
  validate (user) {
    return axios.post('/api/auth/validate', {})
      .then(response => true)
      .catch(err => false)
  }
}
