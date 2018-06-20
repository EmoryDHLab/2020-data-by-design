<template>
  <div class="hello">
    <peabody-grid width='30vw' height='30vw' />
  </div>
</template>

<script>
import PeabodyGrid from '@/components/vis/peabody/PeabodyGrid'
export default {
  name: 'HelloWorld',
  components: {
    'peabody-grid': PeabodyGrid
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
