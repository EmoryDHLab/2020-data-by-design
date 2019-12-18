<template>
  <div id="app">
    <notifications position="bottom center"/>
    <notifications group="auth" position="bottom right"/>
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
@import url('https://fonts.googleapis.com/css?family=Markazi+Text|Libre+Baskerville:400,700|Roboto:100,300,400,500,700');
p, h4, h5, h6, a, li {

  font-family: 'Roboto', arial;
  font-weight: 300;
  color: #2c3e50;
}
p {
  font-size: 16px;
  font-weight: lighter;
}
h1 {
  font-family: Libre Baskerville;
  font-weight: bold;
}

h2 {
  font-family: Libre Baskerville;
  font-weight: normal;
}
h3 {
  font-family: Roboto, sans-serif;
  font-weight: lighter;
}
body {
  margin:0
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* padding: 32px;
  padding-top: 0px; */
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

.--text-dark-blue {
  color: #081F38;
}

.--text-yellow {
  color: #FCC400;
}

.--text-white {
  color: white;
}

.--text-center {
  text-align: center;
}

.--uppercase {
  text-transform: uppercase;
}

.--bold {
  font-weight: 700;
}

.card {
  box-shadow: 1px 2px 7px 1px rgba(0,0,0,0.46);
  border-radius: 5px;
}

.btn {
  cursor: pointer;
  font-family: 'Roboto';
  padding: 12px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  font-weight: lighter;
}

.btn-link {
  background-color: #081F38;
  color: white;
}

.btn-link-inverted {
  background-color: white;
  color: #081F38;
}
</style>
