<template lang="html">
  <header>
    <div class="header__title">
      <router-link class="--ignore-highlight" to="/">
        <h2 class="header__title__content">DH Lab</h2>
      </router-link>
    </div>
    <vue-nav class="header__nav">
      <router-link class="header__nav__link" to="/">Home</router-link>
      <router-link class="header__nav__link --allow-inexact"
        :to="{ path: '/', hash: 'chapters' }">Chapters</router-link>
      <router-link class="header__nav__link --allow-inexact"
        :to="{ path: '/', hash: 'features' }">Features</router-link>
      <router-link class="header__nav__link"
        :to="{ path: '/', hash: 'credits' }">Credits</router-link>
      <router-link v-if="!isAuthenticated" class="header__nav__link" to="/signup">Sign Up</router-link>
      <router-link v-if="!isAuthenticated" class="header__nav__link" to="/signin">Sign in</router-link>
      <router-link v-if="isAuthenticated" class="header__nav__link" to="/account">Account</router-link>
    </vue-nav>
  </header>
</template>

<script>
/**
 * This component is the header for the entire site. It shows up on every page.
 * TODO user login makes navbar sign in sign up go away and get replaced by drop down
 */

import VueNav from './general/VueNav'

export default {
  name: "TheHeader",
  components: {
    VueNav
  },
  computed: {
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    }
  },
}
</script>

<style scoped>
header {
  padding: 8px 100px;
  display: flex;
  flex-flow: row wrap;
  align-items: baseline;
  box-sizing: border-box;
}
.header__title {
  /*flex: 1 0;*/
  margin: 0;
  margin-right: 70px;
}

.header__title__content {
  color: inherit;
  white-space: nowrap;
  text-decoration: none;
  display: inline-block;
  font-family: 'Roboto', sans-serif;
}

.header__title__content:hover {
  text-decoration: underline;
}

.header__nav__link {
  padding: 16px;
  font-size: 1.5em;
  color: #2c3e50;
  font-family: 'Baskerville', sans-serif;
}

.header__nav__link:hover {
  text-decoration: underline
}
.header__nav__link.router-link-exact-active,
.header__nav__link.router-link-active.--allow-inexact {
  text-decoration: underline;
}
</style>
