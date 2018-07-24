<template lang="html">
  <header>

    <router-link class="header__title --ignore-highlight" to="/"><h2>Data By Design</h2></router-link>

    <vue-nav class="header__nav">
      <router-link class="header__nav__link" to="/">Home</router-link>
      <router-link class="header__nav__link --allow-inexact" to="/chapters">Chapters</router-link>
      <router-link class="header__nav__link --allow-inexact" to="/features">Features</router-link>
      <router-link class="header__nav__link" to="/credits">Credits</router-link>
      <router-link class="header__nav__link" to="/signup">Sign Up</router-link>
      <router-link class="header__nav__link" to="/signin"> Sign in</router-link>
    </vue-nav>
  </header>
</template>

<script>
import VueNav from './general/VueNav'

export default {
  name: "TheHeader",
  components: {
    VueNav
  }
}
</script>

<style scoped>
header {
  padding: 8px 0px;
  display: flex;
  flex-flow: row wrap;
  align-items: baseline;
  box-sizing: border-box;
}
.header__title {
  flex: 1 0;
  white-space: nowrap;
  margin: 0;
  margin-right: 32px;
  color: inherit;
  text-decoration: none;
}

.header__nav__link {
  padding: 16px;
  font-size: 1.2em;
  color: #2c3e50;
  font-family: 'Raleway', sans-serif;
}

.header__nav__link:hover {
  text-decoration: underline
}
.header__nav__link.router-link-exact-active,
.header__nav__link.router-link-active.--allow-inexact {
  text-decoration: underline;
}
</style>
