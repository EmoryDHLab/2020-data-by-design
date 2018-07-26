import axios from 'axios'

export default {
  getDataset (id) {
    return axios.get(`/api/data/${id}`)
  },
  getDatasets (full=true) {
    return axios.get(`/api/data?full=${full}`).then(response => response.data)
  }
}
