<template>
  <div class="hello">
    <div v-if='isLoading'>Loading</div>
    <div v-if='error.isActive'>{{ error.message }}</div>
    <peabody-grid
      width='100vh'
      height='100vh'
      :dataset='peabodyData'/>
  </div>
</template>

<script>
import PeabodyGrid from '@/components/vis/peabody/PeabodyGrid'
import axios from 'axios'

export default {
  name: 'HelloWorld',
  components: {
    'peabody-grid': PeabodyGrid
  },
  data: () => ({
    isLoading: false,
    error: {
      isActive: false,
      message: ''
    },
    peabodyData: {}
  }),
  created: function () {
    this.error.isActive = false
    this.isLoading = true
    axios.get('/api/data/2')
      .then(function(response) {
        console.log(response)
        this.peabodyData = Object.assign({}, this.peabodyData, response.data)
      }.bind(this))
      .catch(function(err) {
        console.log(err)
        this.error.isActive = true
        this.error.message = err.response.data
      }.bind(this))
      .finally(function() {
        this.isLoading = false
      }.bind(this))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
