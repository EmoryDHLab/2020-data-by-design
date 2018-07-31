<template lang="html">
  <main>
    <nav class="chapter-nav">
      <h3 class="chapter-nav__header">Chapters:</h3>
      <router-link
        class="chapter-nav__nav__link --allow-inexact"
        to="/chapters/shape-of-history">1. Shape of History</router-link>
      <router-link
        class="chapter-nav__nav__link --allow-inexact"
        to="/chapters/dubois">2. Du Bois</router-link>
      <router-link
        class="chapter-nav__nav__link --allow-inexact"
        to="/chapters/mapping">3. Mapping</router-link>
    </nav>
    <section class='chapter'>
      <aside class="chapter__timeline-col">
        <navline-vis
          id="nav-timeline"
          class="chapter__timeline-col__timeline --stick"
          width="100%"
          height="100%"
          :dataset="timelineData"/>
      </aside>
      <div class="chapter__main">
        <h1 class='chapter__main__title'>
          <slot name='title'>
            Title
          </slot>
        </h1>
        <section class='chapter__main__content'>
          <slot>
            <p>No content found!</p>
          </slot>
        </section>
      </div>
    </section>
  </main>
</template>

<script>
/**
 * This component acts as a scaffold for a chapter layout. It has 3 columns,
 * a chapter navigation bar to go between chapters, and a title section.
 * The title is given through a slot named 'title'. The chapter content a
 * default slot.
 *
 * On load, the chapter parses its content for visualizations to add as data for
 * the chapter timeline. TODO: make it easy to add any element to the timeline
 */


import DOM from '@/helpers/DOM'
import LoremIpsum from './LoremIpsum'
import NavlineVis from './vis/navline/NavlineVis'
import stickybits from 'stickybits'
// polyfill for css position:sticky
stickybits('.--stick', { useStickyClasses: true })

export default {
  name: 'ChapterScaffold',
  components: {
    NavlineVis
  },
  data: () => ({
    timelineData: {} // the data which will be fed into the timeline
  }),
  mounted () {
    // get the mounding box of the chapter
    const mainBox = DOM.getBox(this.$el)
    // get all visualizations in the chapter and map them to position and link
    const data = this.$children.filter(c => c.isVis).map(c => ({
      position: DOM.getY(c.$el),
      link: c.id }))
    // set the calculated range in the timeline data
    this.$set(this.timelineData, "range", [0, mainBox.bottom - mainBox.top])
    // set the datapoints in the timeline data
    this.$set(this.timelineData, "data", data)
  }
}
</script>

<style scoped>
.chapter-nav {
  position: relative;
  text-align: center;
  display: flex;
  flex: 1;
  justify-content: flex-start;
  font-family: 'Raleway', sans-serif;
  align-items: baseline;
  box-sizing: border-box;
  border-top: 2px solid grey;
  border-bottom: 2px solid grey;
  max-width: 100%;
  overflow-x: auto;
}
.chapter-nav__header {
  font-weight: bold;
  margin: 0;
  padding: 4px 12px;
  padding-left: 0;
  box-sizing: border-box;
  border-right: 4px solid grey;
  text-align: right;
}
.chapter-nav__nav__link {
  font-size: 1.2em;
  flex: 0 0 auto;
  vertical-align: baseline;
  padding: 4px 16px;
  color: #2c3e50;
  font-family: 'Raleway', sans-serif;
  text-decoration: none;
  border-right: 2px solid grey;
}

.chapter-nav__nav__link:hover {
  text-decoration: underline;
}

.chapter {
  display: grid;
  grid-gap: 2%;
  grid-template-columns: 14% 58% 24%;
}
.chapter__main__title {
  grid-column: 2 / span 1;
  margin-bottom: 0;
}
.chapter__main__content {
  grid-column: 2 / span 1;
}
.chapter__timeline-col {
  grid-column: 1 / span 1;
  box-sizing: border-box;
  /* border-right: 5px solid black; */
  /* background-color: green; */
  position: relative;
}

.chapter__timeline-col__timeline {
  position: sticky;
  top: 0;
  width: 100%;
  height: 100vh;
}
.centered {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
