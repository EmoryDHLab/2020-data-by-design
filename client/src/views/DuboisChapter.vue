<template lang="html">
  <chapter-scaffold v-bind:curChapter="'Dubois'"
                    docId="1fnhR4aWJ7oNR8GHljHtKggNFS70CfuLSlMxO8rxp4bc">

    <template v-slot:default="{ docRendererProps }">
      <DocRenderer v-bind="docRendererProps">
        <template v-slot:[slots.occupation]>
          <Occupation key="1"/>
        </template>

        <template v-slot:[slots.business]>
          <Business key="2"/>
        </template>

        <template v-slot:[slots.gradsBySex]>
          <GradsBySex key="3"/>
        </template>

        <template v-slot:[slots.migration]>
          <Migration key="4"/>
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
  import Occupation from "../components/vis/dubois/creationProcess/Occupation"
  import Business from "../components/vis/dubois/creationProcess/Business"
  import GradsBySex from "../components/vis/dubois/creationProcess/GradsBySex"
  import Migration from "../components/vis/dubois/creationProcess/Migration"


  export default {
    name: "DuboisChapter",
    components: {
      DocRenderer,
      ChapterScaffold,
      EventKey,
      TimelineVis,
      Occupation, Business, GradsBySex, Migration,
      Section,
      Footnotes,
      FootnoteRef: FootnoteReference,
    },
    mixins: [Highlightable(".chapter__main")],
    data() {
      return {
        slots: {
            occupation: "Occupation",
            business: "Business",
            gradsBySex: "Grads by sex",
            migration: "Migration"

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
