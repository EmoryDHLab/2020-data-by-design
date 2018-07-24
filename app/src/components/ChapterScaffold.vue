<template lang="html">
  <main>
    <nav class="chapter-nav">
      <h3 class="chapter-nav__header">Chapters:</h3>
      <router-link
        class="chapter-nav__nav__link"
        to="/chapters/shape-of-history">1. Shape of History</router-link>
      <router-link
        class="chapter-nav__nav__link"
        to="/chapters/dubois">2. Du Bois</router-link>
      <router-link
        class="chapter-nav__nav__link"
        to="/chapters/mapping">3. Mapping</router-link>
    </nav>
    <section class='chapter'>
      <h1 class='chapter__title'>
        <slot name='title'>
          Title
        </slot>
      </h1>
      <aside class="chapter__timeline">
        <navigation-timeline
          id="nav-timeline"
          width="100%"
          height="100%"
          :dataset="timelineData"/>
      </aside>
      <section class='chapter__content'>
        <slot name='content'>
          <p>No content found!</p>
        </slot>
      </section>
    </section>
  </main>
</template>

<script>
import LoremIpsum from './LoremIpsum'
import DOM from '@/helpers/DOM'
import NavigationTimeline from './vis/timeline/TimelineNav'

export default {
  name: 'ChapterScaffold',
  components: {
    NavigationTimeline
  },
  data: () => ({
    timelineData: {}
  }),
  mounted () {
    const mainBox = DOM.getBox(this.$el)
    const data = this.$children.filter(c => c.isVis).map(c => ({
      position: DOM.getY(c.$el),
      link: c.id }))
    Object.assign(this.timelineData, {}, {
      range: [mainBox.top, mainBox.bottom],
      data
    });
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
  grid-template-rows: auto;
}
.chapter__title {
  grid-column: 2 / span 1;
  grid-row: 1 / span 1;
  margin-bottom: 0;
}
.chapter__content {
  grid-column: 2 / span 1;
}
.chapter__timeline {
  grid-column: 1 / span 1;
  grid-row: 1 / 3;
  background-color: green;
}

.centered {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
