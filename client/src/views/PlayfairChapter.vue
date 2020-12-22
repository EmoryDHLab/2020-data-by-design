<template lang="html">
  <chapter-scaffold v-bind:curChapter="'Playfair'">
    <template slot='title'>
      Visualization as Argument: William Playfair and the View “Simple and
      Complete”
    </template>
    <DocRenderer doc-id="1V6BiTxJw0vGc-AApW4PHAckbzqRKi8sJ6VT0bu7BBXU">
            <template v-slot:[slots.bookImg]>
              <img class="centered-image" src="./img/ch1-1-tufte.jpg" width="80%"/>
            </template>

            <template v-slot:[slots.chartImages]>
              <div>
                <img class="centered-image" src="./img/ch1-2-wheat.jpg" width="30%"/>
                <img class="centered-image" src="./img/ch1-3-northamerica.jpg"
                     width="30%"/>
                <img class="centered-image" src="./img/ch1-4-pie.jpg" width="30%"/>
              </div>
            </template>

            <template v-slot:[slots.errorViz]>
              <img class="centered-image" src="./img/ch1-5-error.jpg" width="80%"/>
            </template>

            <template v-slot:[slots.dataImg]>
              <img class="centered-image" src="./img/ch1-6-data.png" width="80%"/>
            </template>

            <template v-slot:[slots.blockquote(1)]>
              <blockquote>
                The advantage proposed by this method, is not that of giving a more
                accurate statement than by figures, but it is to give a more simple
                and permanent idea of the gradual progress and comparative amounts, at
                different periods, by presenting to the eye a figure, the proportions
                of which correspond with the amount of the sums intended to be
                expressed.
                <FootnoteRef :number="18"></FootnoteRef>
              </blockquote>
            </template>

      <template v-slot:[slots.d3Impl]>
        <Scrollytell collect bottom-break :scrollSlots="9">
          <template v-slot:fixed="{ scrolled, progress }">
            <d3Impl :slideNumber="scrolled"/>
          </template>
          <template v-slot:1>
            <p>
              Canvas
            </p>
          </template>
          <template v-slot:2>
            <p>
              X-axis
            </p>
          </template>
          <template v-slot:3>
            <p>
              Y-axis
            </p>
          </template>
          <template v-slot:4>
            <p>
              First Draft
            </p>
          </template>
          <template v-slot:5>
            <p>
              bumpy line
            </p>
          </template>
          <template v-slot:6>
            <p>
              smoother line
            </p>
          </template>
          <template v-slot:7>
            <p>
              shapding
            </p>
          </template>
          <template v-slot:8>
            <p>
              medallion
            </p>
          </template>
          <template v-slot:9>
            <p>
              original data
            </p>
          </template>
        </Scrollytell>
      </template>

      <template v-slot:[slots.minardImg]>
        <img class="centered-image" src="./img/ch1-7-minard.png" width="80%"/>
      </template>

      <template v-slot:[slots.blockquote(2)]>
        <blockquote :key="blockquote2">
          “If [a future of war] turns out so, a picture of the past will be a
          valuable thing, if, on the contrary, commerce should still continue
          its progress, this will make the first part of a great whole, which,
          when completed on some future day, will be a most valuable work.”
          <FootnoteRef :number="23"></FootnoteRef>
        </blockquote>
      </template>

      <!--            <template v-slot:[slots.sideBySide]>-->
      <!--put new viz here-->
      <!--            </template>-->

      <template v-slot:[slots.recreations]>
        <div>
          <img class="centered-image" src="./img/ch1-8-McCune.png" width="30%"/>
          <img class="centered-image" src="./img/ch1-9-Camoes.png" width="30%"/>
          <img class="centered-image" src="./img/ch1-10-stevens.png"
               width="30%"/>
        </div>
      </template>

      <template v-slot:[slots.newCharts]>
        <D3ImplCovid key="1"/>
      </template>

    </DocRenderer>
  </chapter-scaffold>
</template>

<script>
  import ChapterScaffold from '@/components/ChapterScaffold'
  import TimelineVis from '@/components/vis/timeline/TimelineVis'
  import EventKey from "../components/vis/peabody/EventKey";
  import Section from '@/components/chapters/Section'
  import Highlightable from "@/mixins/Highlightable";
  import Scrollytell from "../components/scrollytelling/Scrollytell";
  import MapScroller from "../components/scrollytelling/MapScroller";
  import PeabodyCanvas from "../components/vis/peabody/PeabodyCanvas";
  import Footnotes from "../components/general/Footnotes"
  import FootnoteReference from "../components/general/FootnoteReference";
  import d3Impl from "../components/vis/playfair/creationProcess/D3Impl";
  import D3ImplCovid
    from "../components/vis/playfair/creationProcess/D3ImplCovid";
  import DocRenderer from "../docs-integration/DocRenderer";

  export default {
    name: "PlayfairChapter",
    components: {
      DocRenderer,
      D3ImplCovid,
      d3Impl,
      ChapterScaffold,
      EventKey,
      TimelineVis,
      Section,
      Scrollytell,
      PeabodyCanvas,
      MapScroller,
      Footnotes,
      FootnoteRef: FootnoteReference
    },
    mixins: [Highlightable(".chapter__main")],
    data() {
      return {
        slots: {
          bookImg: "Tufte's Book",
          chartImages: "Original Chart Images",
          errorViz: "Playfair Error",
          dataImg: "Original Data Table",
          blockquote: num => `Playfair Blockquote ${num}`,
          d3Impl: "Difference Visualization",
          minardImg: "Image of Minard Chart",
          sideBySide: "Side-by-side",
          recreations: "Playfair Recreations",
          newCharts: "Playfair-style Charts"
        }
      };
    },
    computed: {},
    methods: {},
    created() {
      debugger;
      this.setChapter({title: "Playfair"});
    },
    mounted() {
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll);
    }
  };
</script>

<style scoped>

  .event-box {
    position: relative;
    top: 14vh;
    left: 1.8vh;
    margin-bottom: -300px;
  }

  .event-box ul {
    list-style: none;
    margin-left: 1.4vh;
    padding-left: 0;
  }

  .event-box li {
    display: flex;
    align-items: center;
  }

  .event-box li svg {
    margin-right: 5px;
  }

  .event-box-year {
    font-family: monospace;
    font-size: 2vh;
  }

  .centered-image {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  .multi-canvas {
    margin-left: auto;
    margin-right: auto;
    width: 40vh;
  }

  .multi-canvas ul {
    text-align: center;
  }

  .multi-canvas ul li {
    display: inline-block;
  }

  .multi-canvas ul li:not(:first-child)::before {
    content: '•';
    font-size: 20px;
    display: block;
    float: left;
    margin-left: 2px;
    margin-right: 2px;
    margin-top: -2px;
  }

  .selected-event {
    /*border-left: 5px solid yellow;*/
    /*background-color: yellow;*/
    text-decoration: underline;
  }

  .left-float {
    float: left;
  }

  .right-float {
    float: right;
  }

  .left-float.aligned {
    padding-top: 0.5em;
    padding-right: 1em;
  }

  .right-float.aligned {
    padding-top: 0.5em;
    padding-left: 1em;
  }

  p {
    text-align: justify;
  }
</style>
