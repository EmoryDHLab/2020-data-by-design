<template>
  <div id="app">
    <the-header class="header"/>
    <router-view class="main-content"/>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'
export default {
  name: 'App',
  components: {
    TheHeader
  }
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
  padding: 32px;
  padding-top: 0px;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto 1fr;
  /* height: 100vh; */
}

.main-content {
  position: relative;
}

a.router-link-active.--ignore-highlight,
a.router-link-exact-active.--ignore-highlight {
  color: inherit !important;
}

.router-link-active.--allow-inexact {
  color: rgb(219, 136, 42) !important;
}
.router-link-exact-active {
  color: rgb(219, 136, 42) !important;
}
</style>
