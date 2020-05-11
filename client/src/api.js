import axios from 'axios'

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
    return axios.get(`/api/data/${id}`)
  },
  getDatasets (full=true) {
    return axios.get(`/api/data?full=${full}`)
  },
  login (user) {
    return axios.post('/api/users/login', {user: user})
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
    return axios.get(`/api/users/current`)
  },
  updateNotebook (notebookArray) {
    console.log(notebookArray);
    return axios.post('/api/users/current/notebook/', {notebook: notebookArray});
  },
  createUser (user) {
    console.log(window.location.origin + '/api/users/');
    return axios.post('/api/users/', {user: user})
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
