<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <header>
    <div class="header-title">
      <a class="--ignore-highlight" href="https://dhlab.lmc.gatech.edu">
        <h2 class="header-title-content">DH Lab</h2>
      </a>
    </div>
    <vue-nav class="header-nav">
      <router-link class="header-nav-link" to="/">Home</router-link>
      <nav-drop-down>
        <template v-slot:title>
        <router-link class="header-nav-link --allow-inexact"
          :to="{ path: '/', hash: 'chapters' }">Chapters
        </router-link>
        </template>
        <nav-drop-down-item class="drop-down-item">
          <router-link to="/chapters/playfair">Visualization as Argument</router-link>
        </nav-drop-down-item>
        <nav-drop-down-item class="drop-down-item">Every Datapoint a Person</nav-drop-down-item>
        <nav-drop-down-item class="drop-down-item">Narratives of Possession</nav-drop-down-item>
        <nav-drop-down-item class="drop-down-item">
          <router-link to="/chapters/shape-of-history">The Work of Knowledge</router-link>
        </nav-drop-down-item>
        <nav-drop-down-item class="drop-down-item">“The Color Line” as Data and Image</nav-drop-down-item>
      </nav-drop-down>
      <!--<router-link class="header-nav-link &#45;&#45;allow-inexact"-->
        <!--:to="{ path: '/', hash: 'features' }">Features</router-link>-->
      <!--non-clickable placeholder-->
      <p class="header-nav-link">Features</p>
      <router-link class="header-nav-link"
        :to="{ path: '/', hash: 'credits' }">Credits</router-link>
      <!--<router-link class="header-nav-link" to="/notebook">Notebook</router-link>-->
    </vue-nav>
  </header>
</template>

<script>
/**
 * This component is the header for the entire site. It shows up on every page.
 * TODO user login makes navbar sign in sign up go away and get replaced by drop down
 */

import VueNav from './general/VueNav'
import NavDropDown from './NavDropDown'
import NavDropDownItem from './NavDropDownItem'

export default {
  name: "TheHeader",
  components: {
    VueNav,
    NavDropDown,
    NavDropDownItem
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
  width: 100%; /*Maybe not?*/
  display: flex;
  flex-flow: row wrap;
  align-items: baseline;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  z-index:100;
  background-color: white;
  /*Fades the bottom border. I also tried to add a horizontal fade, but they didn't stack nicely.
  (Instead, I made the width span the whole screen, see above.)
  Wonder if it can be done using inset box-shadows? I tried, but I couldn't get it to work with transparency.*/
  background: linear-gradient(rgba(255,255,255,0.8) 90%, rgba(255,255,255,0));
;
}
.header-title {
  /*flex: 1 0;*/
  margin: 0;
  margin-right: 70px;
}

.header-title-content {
  color: inherit;
  /*white-space: nowrap;*/
  text-decoration: none;
  display: inline-block;
  font-family: 'Helvetica', sans-serif;
  font-weight: bold;
}

.header-title-content:hover {
  border-bottom: 2px solid rgb(74, 144, 226);
  color: rgb(74, 144, 226);
}

.header-nav-link   {
  padding: 10px 16px;
  color: #2c3e50;
  border-bottom: 1px solid lightgray;

}

.header-nav-link {
  font-family: 'Libre Baskerville', serif;
  font-size: 16px;
}
.drop-down-item, .drop-down-item a {
  font-family: 'Roboto';
}
.drop-down-item:hover, .drop-down-item:hover a {
  font-weight: 700;
}


.header-nav .header-nav-link:hover, .header-nav > *:hover .header-nav-link {
  border-bottom: 2px solid rgb(74, 144, 226);
  color: rgb(74, 144, 226);
}
.header-nav-link.router-link-exact-active,
.header-nav-link.router-link-active.--allow-inexact {
  border-bottom: 2px solid rgb(219, 136, 42);

}
</style>
