<template lang="html">
  <main>
    <section class='chapter'>
      <aside class="chapter__timeline-col">
        <component v-bind:is="currentChapter"
          id="nav-timeline"
          class="chapter__timeline-col__timeline --stick"
          width="100%"
          height="100%"
          :dataset="timelineData"
        ></component>
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
      <aside class="chapter__notebook-col">
        <Notebook class="chapter__notebook"/>
      </aside>
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
import PeabodyNavlineVis from './vis/peabody/navline/NavlineVis'
import DuboisNavlineVis from './vis/dubois/navline/NavlineVis'
import PlayfairNavlineVis from './vis/playfair/navline/NavlineVis'
import Notebook from './notebook-new/Notebook'
import stickybits from 'stickybits'
import { mapState } from 'vuex'
// polyfill for css position:sticky
stickybits('.--stick', { useStickyClasses: true });

export default {
  name: 'ChapterScaffold',
  components: {
    PeabodyNavlineVis,
    DuboisNavlineVis,
    PlayfairNavlineVis,
    Notebook
  },
  props: {
    curChapter: String,
  },
  data: () => ({
    // timelineData: {
    //     peabody: {
    //       paragraphData: [3,5,10,4,4], //index = which section, value = number of sub-parts, shape of the following arrays.
    //       highlights: [[0.7, 0.3, 0.],
    //           [0., 0., 0., 0.2, 0.],
    //           [0., 0.1, 0.6, 0., 0., 0.2, 0., 0.5, 0., 0.],
    //           [0.8, 0., 0., 0.],
    //           [0.6, 0., 0.2, 0.1]], //default: transparency = 0 for every block;
    //       vis: [[1, 0, 2],
    //             [2, 1, 0, 0, 2],
    //             [2, 3, 0, 1, 0, 1, 3, 0, 2, 0],
    //             [1, 1, 0, 3],
    //             [0, 2, 0, 1]],// 1 -> image, 2 -> interaction, 3 -> static vis, 0 -> empty
    //     },
    //     dubois: {
    //         paragraphData: [3,5,10,4,4], //index = which paragraph, value = number of sub-parts, shape of the following arrays.
    //         highlights: [[0.7, 0.3, 0.],
    //             [0., 0., 0., 0.2, 0.],
    //             [0., 0.1, 0.6, 0., 0., 0.2, 0., 0.5, 0., 0.],
    //             [0.8, 0., 0., 0.],
    //             [0.6, 0., 0.2, 0.1]], //default: transparency = 0 for every block;
    //         vis: [[1, 0, 2],
    //             [2, 1, 0, 0, 2],
    //             [2, 3, 0, 1, 0, 1, 3, 0, 2, 0],
    //             [1, 1, 0, 3],
    //             [0, 2, 0, 1]],
    //     },
    //     playfair: {
    //         paragraphData: [3,5,10,4,4], //index = which paragraph, value = number of sub-parts, shape of the following arrays.
    //         highlights: [[0.7, 0.3, 0.],
    //             [0., 0.2, 0., 0.8, 0.2],
    //             [0.3, 0.1, 0.6, 0.8, 0., 0.9, 0., 0.5, 0., 0.7],
    //             [0.8, 0.4, 0., 0.],
    //             [0.3, 0.8, 0.3, 0.7]], //default: transparency = 0 for every block;
    //         vis: [[1, 4, 2],
    //             [2, 4, 3, 1, 3],
    //             [4, 3, 1, 2, 1, 1, 3, 1, 2, 1],
    //             [1, 2, 4, 3],
    //             [3, 4, 2, 1]],
    //     },
    // } // the data which will be fed into the timeline
  }),
  mounted () {
    // get the mounding box of the chapter
    // const mainBox = DOM.getBox(this.$el)
    // get all visualizations in the chapter and map them to position and link
    // const data = this.$children.filter(c => c.isVis).map(c => ({
    //   position: DOM.getY(c.$el),
    //   link: c.id }))
    // set the calculated range in the timeline data
    // this.$set(this.timelineData, "range", [0, mainBox.bottom - mainBox.top])
    // set the datapoints in the timeline data
    // this.$set(this.timelineData, "data", data)
  },
  computed: {
    currentChapter: function() {
      return this.curChapter + "NavlineVis";
    },
    timelineData () {
      /*Dependency: */ this.$store.getters['chapters/lastUpdated'];
      const sections = this.$store.getters['chapters/currChapterSections'];
      const sectionData = sections.map(sections => sections.subsections);
      const highlightsData = sections.map(sections => sections.highlights.map(amount => amount))
      const visData = sections.map(sections => sections.visualizations) // 1 -> image, 2 -> interaction, 3 -> static vis, 0 -> empty
      return {
        paragraphData: sectionData, //index = which section, value = number of sub-parts, shape of the following arrays.
        highlights: highlightsData,
        vis: visData
      }
    },
    ...mapState('chapters', ['scrollTo'])
  },
  watch: {
    scrollTo (newVal, oldVal) {
      window.scrollTo({top: newVal});
    }
  }
}
</script>

<style>

.nb-user-highlight {
  background-color: yellow
}

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

.chapter__notebook-col {
  grid-column: 3 / span 1;
  box-sizing: border-box;
  position: relative;
}

.chapter__notebook {
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
