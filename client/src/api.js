import axios from 'axios'

const dev = process.env.NODE_ENV == 'development'
const url = dev ? '/api/' : 'https://server.dataxdesign.io/api/';
console.warn("We're in " + (dev ? 'development' : 'production') + " mode, calling our api at " + url);

function setAuthorization (token) {
  axios.defaults.headers.common['Authorization'] = `Token ${token}`
}
function clearAuthorization (token) {
  delete axios.defaults.headers.common['Authorization']
}

export default {
  init (token) {
    if (token) {
      setAuthorization(token)
    }
  },
  getDataset (id) {
    return axios.get(`${url}data/${id}`)
  },
  getDatasets (full=true) {
    return axios.get(`${url}data?full=${full}`)
  },
  login (user) {
    return axios.post(`${url}users/login`, {user: user})
      .then(resp => {
        console.log(resp.data.user.token);
        setAuthorization(resp.data.user.token)
        return resp
      })
      .catch(err => {
        clearAuthorization()
        throw err
      })
  },
  logout () {
      clearAuthorization()
  },
  getCurrentUser () {
    return axios.get(`${url}users/current`)
  },
  updateNotebook (updateObj /* {notebook: [], data: {} */) {
    return axios.post(`${url}users/current/notebook/`, updateObj);
  },
  // updateMutableData (mutableData) {
  //   return axios.post('/api/users/current/data/', mutableData)
  // },
  createUser (user) {
    // console.log(window.location.origin + '/api/users/');
    return axios.post(`${url}/users/`, {user: user})
      .then(resp => {
        setAuthorization(resp.data.user.token)
        return resp
      })
      .catch(err => {
        clearAuthorization()
        throw err
      })
  }
}
