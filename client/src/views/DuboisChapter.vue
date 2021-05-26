<template lang="html">
  <chapter-scaffold v-bind:curChapter="'Dubois'"
                    docId="1fnhR4aWJ7oNR8GHljHtKggNFS70CfuLSlMxO8rxp4bc">
      <template slot='title'>
        Between Data and Truth: W.E.B. Du Bois and the Limits of Visual Display
      </template>
    <template v-slot:default="{ docRendererProps }">
      <DocRenderer v-bind="docRendererProps">
        <!--Inline Slots-->

        <template v-slot:StatisticalAtlas>
          <div class="IMG">
            <div class="grid-row">
              <img class="grid-image" src="./img/ch5-06a-letter.jpg"
                         width="40%"/>
              <img class="grid-image" src="./img/ch5-06b-map.jpg"
                         width="40%"/>
            </div>
            <p class="caption">
              The TKTK (left), and the TKTK (right).
            </p>
          </div>
        </template>

        <template v-slot:AtlasComparison>
          <div class="IMG">
            <div class="grid-row">
              <img class="grid-image" src="./img/ch5-08a-population.jpg" width="40%"/>
              <img class="grid-image" src="./img/ch5-08b-amalg.jpg" width="40%"/>
            </div>
            <div class="grid-row">
              <img class="grid-image" src="./img/ch5-08c-conjugal.jpg" width="40%"></img>
              <img class="grid-image" src="./img/ch5-08d-db-conjugal.jpg" width="40%"></img>
            </div>
            <p class="caption">
                    Caption TK.
            </p>
          </div>
        </template>

        <template v-slot:ChalabiOnuoha>
          <div class="IMG">
            <div class="grid-row">
              <img class="grid-image" src="./img/ch5-16a-chalabi.jpg" width="100%"/>
            </div>
            <div class="grid-row">
              <img class="grid-image" src="./img/ch5-17-onuoha.jpg" width="100%"></img>
            </div>
            <p class="caption">
                    Caption TK.
            </p>
          </div>
        </template>

        <!-- Component Slots -->
        <template v-slot:[slots.dubois_recreation_set]>
          <DuboisRecreationSet key="1"/>
        </template>

        <template v-slot:DuboisScrollytell>
          <Scrollytell collect bottom-breaks :scroll-slots="5">

            <template v-slot:fixed="{scrolled, progress}">
              <div class="scrollytell-image">
                <img v-if="scrolled == 0" src="./img/ch5-04a-city.jpg">
                <img v-if="scrolled == 1" src="./img/ch5-04b-illiteracy.jpg">
                <img v-if="scrolled == 2" src="./img/ch5-04c-owners.jpg">
                <img v-if="scrolled >= 3" src="./img/ch5-04d-value.jpg">
              </div>
            </template>

            <template v-slot:1>
              <div>
              In his comparative representation of the places where Georgia’s Black citizens reside, for example, Du Bois brings together aspects of the bar chart and the line chart along with a new form of spiral graph in order to give animacy to the presence of Black people in each of type of locale
              </div>
            </template>

            <template v-slot:2>
              <div>
              In a later chart, which documents the decrease in illiteracy rates in the years between 1860 and 1900, Du Bois makes use of what graphic designer Silas Munro describes as a “lattice-like arrangement,” in which an otherwise standard bar is folded at a right angle in order to further accentuate the decreasing rate of illiteracy
              </div>
            </template>

            <template v-slot:3>
              <div>
              Du Bois elaborates upon this technique in a later chart, which compares the numbers of Black property owners, and the value of their properties, in two Georgia cities.
              </div>
            </template>
            <template v-slot:4>
              <div>
              Another unique chart in this series, which plots the “assessed value of household and kitchen furniture” owned by Black Georgians, takes the standard bar chart and bends it into a spiral, concentrating the viewer’s focus on the cumulative value of the population’s material possessions in addition to its growth in time.
              </div>
            </template>
          </Scrollytell>
        </template>

        <template v-slot:[slots.names]>
          <Names key="2"/>
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
  import Footnotes from "../components/chapters/Footnotes"
  import FootnoteReference from "../components/chapters/FootnoteReference";
  import {DocRenderer} from "doc-renderer";
  import {mapActions} from "vuex";
  import DuboisRecreationSet from '../components/vis/dubois/creationProcess/DuboisRecreationSet'
  import Names from '../components/vis/dubois/creationProcess/Names'
  import Scrollytell from "../components/scrollytelling/Scrollytell";


  export default {
    name: "DuboisChapter",
    components: {
      Scrollytell,
      DocRenderer,
      ChapterScaffold,
      EventKey,
      TimelineVis,
      DuboisRecreationSet,
      Names,
      Section,
      Footnotes,
      FootnoteRef: FootnoteReference,
    },
    mixins: [Highlightable(".chapter__main")],
    data() {
      return {
        slots: {
            dubois_recreation_set: "Dubois Recreation Set",
            names: "Names Set"
        },
      };
    },
    computed: {},
    methods: {
      ...mapActions("chapters", ["setChapter"]),
    },
    watch: {
      visIdx: function (value) {
        this.visIdx = value;
      }
    },
    created() {
      this.setChapter({title: "Dubois"});
    },
    mounted() {
    },
    destroyed() {
    }
  };
</script>

<style scoped>

  p {
    text-align: justify;
  }

  .scrollytell-image {

  }

  .scrollytell-image img {
    width: 100%;
  }
</style>
