<template lang="html">
  <main>
    <section class='chapter'>
      <aside class="chapter__timeline-col">
        <component v-bind:is="currentChapter"
          id="nav-timeline"
          class="chapter__timeline-col__timeline --stick"
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
          <slot :docRendererProps="docRendererProps">
            <p>No content found!</p>
          </slot>
        </section>
      </div>
      <aside class="chapter__notebook-col">
        <Notebook class="chapter__notebook --stick"/>
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
import Section from "./chapters/Section";
import FootnoteReference from "./chapters/FootnoteReference";
import Footnotes from "./chapters/Footnotes";
import Blockquote from "./general/Blockquote";
import CaptionedImage from "./general/CaptionedImage";
import stickybits from 'stickybits'
import { mapState } from 'vuex'
import api from "../api";

// polyfill for css position:sticky
stickybits('.--stick', { useStickyClasses: true });

export default {
  data () {
    return {
      docObj: null
    }
  },
  name: 'ChapterScaffold',
  components: {
    PeabodyNavlineVis,
    DuboisNavlineVis,
    PlayfairNavlineVis,
    Notebook,
  },
  props: {
    curChapter: String,
    docId: String,
  },
  created() {
    if (this.docId) {
      console.log("fetching")
      api.getDoc(this.docId).then(resp => {
        this.docObj = resp.data;
      }).catch(err => {
        console.error(err)
      })
    }
  },
  mounted () {
    //TODO: Scroll to right before the most recent scrollytell
    window.onbeforeunload = (e) => window.scrollTo({top: 0})
  },
  computed: {
    docRendererProps () {
      if (this.docObj) {
        return {
          docObj: this.docObj,
          sectionComponent: Section,
          footnotesComponent: Footnotes,
          footnoteRefComponent: FootnoteReference,
          blockComponents: {
            Blockquote,
            CaptionedImage
          }
        }
      }
    },
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
      window.scrollTo({top: newVal, behavior: 'smooth'});
    }
  },
}
</script>

<style>

p.caption {
  text-align: center !important;
  font-family: Consolas;
  font-size: 90%;
}

div.grid-row {
  display: flex;
  justify-content: center;
}

img.grid-image {
  padding: 10px;
}
a.blue-hover {
  text-decoration: none;
  color: #4a90e2;
  font-weight: 400;
}

a.blue-hover:hover {
  color: #7bbdff;
}
.nb-user-highlight {
  background-color: hsl(60, 100%, 50%);
  cursor: grab;
}

/*TODO: Use JavaScript to brighten self and all attached highlight spans on hover */
/*.nb-user-highlight:hover {*/
/*  background-color: hsl(60, 100%, 70%);*/
/*}*/

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
  grid-template-columns: 14% 45% 24%;
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
  top: 10vh;
  width: 100%;
  height: 90vh;
}

.chapter__notebook-col {
  grid-column: 3 / span 1;
  box-sizing: border-box;
}

.chapter__notebook {
  width: 100%;
  height: 100vh;
  top: 8vh;
  position: sticky;
}

.centered {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
