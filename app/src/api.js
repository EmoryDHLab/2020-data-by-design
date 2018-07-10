import axios from 'axios'

export default {
  getDataset (visType, id) {
    return axios.get(`/api/data/${visType}/${id}`)
  }
}
