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
@import url('https://fonts.googleapis.com/css?family=Markazi+Text|Libre+Baskerville:400,700|Roboto');
p, h4, h5, h6, a, li {

  font-family: 'Roboto Thin', arial;
  color: #2c3e50;
}
p {
  font-size: 16px;
  font-weight: lighter;
}
h1 {
  font-family: Baskerville;
  font-weight: bold;
}

h2 {
  font-family: Baskerville;
  font-weight: normal;
}
h3 {
  font-family: Roboto Condensed, sans-serif;
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

.--biggest {
  font-size: 4em;
}
.--bigger {
  font-size: 3em;
}
.--big {
  font-size: 1.5em;
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

.--color-dark-blue {
  color: #083871;
}

.--color-sky-blue {
  color: #4A90E2;
}

.--color-dark-grey {
  color: #4A4A4A;
}

.--color-grey {
  color: #5B5B5B;
}

.--color-light-grey {
  color: #D8D8D8;
}

.--color-white {
  color: white;
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
