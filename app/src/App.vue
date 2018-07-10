<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Markazi+Text|Raleway');
p, h4, h5, h6, a, li {
  font-family: 'Markazi Text', serif;
}
p {
  font-size: 1.5em;
}
h1 {
  font-size: 3em;
}
h1, h2, h3 {
  font-family: 'Raleway', sans-serif;
}
body {
  margin:0
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
