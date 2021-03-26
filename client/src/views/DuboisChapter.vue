<template lang="html">
  <chapter-scaffold v-bind:curChapter="'Dubois'"
                    docId="1fnhR4aWJ7oNR8GHljHtKggNFS70CfuLSlMxO8rxp4bc">

    <template v-slot:default="{ docRendererProps }">
      <DocRenderer v-bind="docRendererProps">
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

  export default {
    name: "DuboisChapter",
    components: {
      DocRenderer,
      ChapterScaffold,
      EventKey,
      TimelineVis,
      Section,
      Footnotes,
      FootnoteRef: FootnoteReference
    },
    mixins: [Highlightable(".chapter__main")],
    data() {
      return {
        slots: {
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
