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


  export default {
    name: "DuboisChapter",
    components: {
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
</style>
