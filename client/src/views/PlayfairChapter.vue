<template lang="html">
  <chapter-scaffold v-bind:curChapter="'Playfair'"
                    docId="1V6BiTxJw0vGc-AApW4PHAckbzqRKi8sJ6VT0bu7BBXU">
    <template slot='title'>
      Visualization as Argument: William Playfair's Time-Series Charts
    </template>

    <template v-slot:default="{ docRendererProps }">
      <DocRenderer v-bind="docRendererProps">
        <template v-slot:Scroller>
          <BasicWaypoint @scrolled="scrollerScrolling"></BasicWaypoint>
          <BasicWaypoint :offset="400"></BasicWaypoint>
          <div class="centered" style="width: 80%">
            <MapScroller
              asset="ch1-4-northamerica.jpg"
              width="100%"
              :easing="scrollerEase"
              :current-position="1"
              :elapse-percent="scrollerElapsed"
              :positions="[
               {left: 0, top: 0, width: 100, height: 100},
               {left: 100, top: 50, width: 200, height: 200},
            ]"
            >
            </MapScroller>
          </div>
          <p class="caption">

            Playfair's chart of “Exports & Imports to and from all
            North-America,” from the third edition of <i>The Commercial and
            Political Atlas</i> (1801). On the far right of the image is the
            engraving error in the line of imports. Image courtesy of the
            Library Company of Philadelphia, www.librarycompany.org.
          </p>

        </template>
        <template v-slot:[slots.d3Impl]>
          <Scrollytell bottom-break pause above
                       itemsBackgroundColor="white"
                       :scrollSlots="9">
            <template v-slot:fixed="{ scrolled, progress }">
              <d3Impl :slideNumber="scrolled"/>
            </template>
            <template v-slot:1>
              <p>
                The process began with Neele engraving the border
                around the chart.
              </p>
            </template>
            <template v-slot:2>
              <p>
                He then began to add the grid lines, and either before or
                after the labels of the axes.
              </p>
            </template>
            <template v-slot:3>
              <p>
                Neele decided to emphasize the major grid lines of the x-axis
                with a
                bolder line, creating an optimal background to contrast with the
                smooth data lines that Playfair would go on to engrave.
              </p>
            </template>
            <template v-slot:4>
              <p>
                Playfair likely took over at this point, and set about
                engraving;
                the lines of imports
              </p>
            </template>
            <template v-slot:5>
              <p>
                and exports.
              </p>
            </template>
            <template v-slot:6>
              <p>
                In the first edition of the <i>Atlas</i>, these data lines are bumpy, even in places where Playfair intended to show a constant slope--a reflection of Playfair's novice engraving technique.
              </p>
            </template>
            <template v-slot:7>
              <p>
                But by the third edition, the data lines are visibly smoother.
                Having engraved dozens of plates in the five years that
                separated
                the first edition from this one, Playfair's technique had
                improved.
                Even still, he took liberties with the data lines, adding more
                detail to the fluctuations in trade between England and North
                America than he had the data to support.
              </p>
            </template>
            <template v-slot:8>
              <p>
                Long after the plates had been completed and pressed upon the
                page,
                Playfair returned to each chart in each copy of the <i>Atlas</i>,
                hand-staining each of the data lines, as well as the area
                between
                them, adding color and warmth to his charts.
              </p>
            </template>
            <template v-slot:9>
              <p>
                The result is a data visualization that is deservedly
                iconic--even
                as it did not depend on a complete dataset. In fact, there is no evidence to suggest that Playfair plotted any of the
                original data points before engraving the data lines on his chart.
              </p>
            </template>
<!--            <template v-slot:10>
              <p>
                There is no evidence to suggest that Playfair plotted any of the
                original data points before engraving the data lines.
              </p>
            </template> -->
          </Scrollytell>
        </template>


        <!--            <template v-slot:[slots.sideBySide]>-->
        <!--put new viz here-->
        <!--            </template>-->

        <template v-slot:[slots.recreations]>
          <div class="IMG">
            <div class="grid-row">
              <img src="./img/ch1-8-lyra.png" width="50%"/>
              <img src="./img/ch1-9-protovis.png"
                   width="50%"/>
            </div>
            <img class="centered-image" src="./img/ch1-10-camoes.png"
                 width="80%"/>
            <p class="caption">
              Above (clockwise from top left): Playfair's chart of wheat and wages, as recreated in Lyra, an early visualization platform designed by Arvind Satyanarayan and Jeffrey Heer; the same chart recreated in Protovis, an early JavaScript visualization library developed by Mike Bostock; the same chart recreated in Microsoft Excel by Jorge Camoes. (Camoes also recreates one of Playfair's import/export charts). Screenshots by the author.
            </p>
          </div>
        </template>

        <template v-slot:[slots.newCharts]>
          <DataSetsVis key="1" :visidx="visIdx"/>
        </template>

        <template v-slot:HoverCovid="{inner}">
          <a class="blue-hover" @mouseover="visIdx = 0">{{inner}}</a>
        </template>

        <template v-slot:HoverIncome="{inner}">
          <a class="blue-hover" @mouseover="visIdx = 1">{{inner}}</a>
        </template>

        <template v-slot:HoverWomen="{inner}">
          <a class="blue-hover" @mouseover="visIdx = 2">{{inner}}</a>
        </template>

        <template v-slot:[slots.sideBySide]>
          <StackedBar key="2"/>
        </template>

        <template v-slot:[slots.occupation]>
          <Occupation key="3"/>
        </template>


      </DocRenderer>
    </template>

  </chapter-scaffold>
</template>

<script>
  import { easeLinear } from "d3"
  import ChapterScaffold from '@/components/ChapterScaffold'
  import TimelineVis from '@/components/vis/timeline/TimelineVis'
  import EventKey from "../components/vis/peabody/EventKey";
  import Section from '@/components/chapters/Section'
  import Highlightable from "@/mixins/Highlightable";
  import Scrollytell from "../components/scrollytelling/Scrollytell";
  import MapScroller from "../components/scrollytelling/MapScroller";
  import BasicWaypoint from "../components/waypoints/BasicWaypoint";
  import PeabodyCanvas from "../components/vis/peabody/PeabodyCanvas";
  import Footnotes from "../components/general/Footnotes"
  import FootnoteReference from "../components/general/FootnoteReference";
  import d3Impl from "../components/vis/playfair/creationProcess/D3Impl";
  import DataSetsVis
    from "../components/vis/playfair/creationProcess/DataSetsVis";
  import StackedBar
    from "../components/vis/playfair/creationProcess/StackedBar";
  import {DocRenderer} from "doc-renderer";
  import Blockquote from "../components/general/Blockquote";
  import {mapActions} from "vuex";

  import Occupation from "../components/vis/dubois/creationProcess/Occupation"

  export default {
    name: "PlayfairChapter",
    components: {
      Occupation,

      DocRenderer,
      DataSetsVis,
      StackedBar,
      d3Impl,
      ChapterScaffold,
      EventKey,
      TimelineVis,
      Section,
      Blockquote,
      Scrollytell,
      PeabodyCanvas,
      MapScroller,
      BasicWaypoint,
      Footnotes,
      FootnoteRef: FootnoteReference
    },
    mixins: [Highlightable(".chapter__main")],
    data() {
      return {
        slots: {
          d3Impl: "Difference Visualization",
          sideBySide: "Side-by-side",
          recreations: "Playfair Recreations",
          newCharts: "Playfair-style Charts",

          occupation: "Occupation"
        },
        scrollerElapsed: 0,
        scrollerEase: easeLinear,
        visIdx: 0,
      };
    },
    computed: {},
    methods: {
      scrollerScrolling(event) {
        const last = event.lastWaypoint.triggerPoint;
        const next = event.nextWaypoint.triggerPoint;
        const progressToNext = (event.newScroll - last) / (next - last);
        this.scrollerElapsed = progressToNext;
        console.log(progressToNext);
      },
      ...mapActions("chapters", ["setChapter"]),
    },
    watch: {
      visIdx: function (value) {
        this.visIdx = value;
      }
    },
    created() {
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
