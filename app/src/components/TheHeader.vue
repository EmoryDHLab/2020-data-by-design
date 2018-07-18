<template lang="html">
  <header>
    <h2 class="header__title">Data By Design</h2>
    <nav class="header__nav">
      <router-link class="header__nav__link" to="/">Home</router-link>
      <router-link class="header__nav__link --allow-inexact" to="/chapters">Chapters</router-link>
      <router-link class="header__nav__link --allow-inexact" to="/features">Features</router-link>
      <router-link class="header__nav__link" to="/credits">Credits</router-link>
      <router-link class="header__nav__link" to="/signup">Sign Up</router-link>
      <router-link class="header__nav__link" to="/signin"> Sign in</router-link>
    </nav>
  </header>
</template>

<script>
export default {
}
</script>

<style scoped>
header {
  padding: 8px 0px;
  display: flex;
  align-items: baseline;
  box-sizing: border-box;
}
.header__title {
  flex: 1;
}
.header__nav {
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: baseline;;
}
.header__nav__link {
  flex: 0 0 auto;
  vertical-align: baseline;
  padding: 16px;
  font-size: 1.2em;
  color: #2c3e50;
  text-decoration: none;
  font-family: 'Raleway', sans-serif;
}

.header__nav__link:last-child {
  padding-right: 0;
}

.header__nav__link:hover {
  text-decoration: underline
}

.router-link-exact-active {
  color: rgb(219, 136, 42);
}
</style>
