<template lang="html">
  <ChapterScaffold>
    <template slot="title">Sandbox</template>
    <div style="display:flex">
      <div class="scrolly-states" style="flex: 1;">
        <div v-for="(s, k) in states" :key="`imgwrap${k}`"
          v-show="state === k"
          class="wp-image-wrapper">
          <img class= "wp-image"
          :src="s.imageUrl" :alt="s.altText"/>
        </div>
      </div>
      <div class="scrolly-info" style="flex: 1;">
        <basic-waypoint
          v-for="(st, k) in states"
          :key="`waypoint${k}`"
          class="waypoint-section"
          offset="50%"
          @triggered:down="state = k"
          @triggered:up="prevState(k)">
          <div class="wp" v-html="st.content"></div>
        </basic-waypoint>
      </div>
    </div>
  </ChapterScaffold>
</template>

<script>
import InOutWaypoint from '@/components/waypoints/InOutWaypoint'
import BasicWaypoint from '@/components/waypoints/BasicWaypoint'
import ChapterScaffold from '@/components/ChapterScaffold'
import PeabodyGrid from '@/components/vis/peabody/PeabodyGrid'

export default {
  components: {
    InOutWaypoint,
    BasicWaypoint,
    ChapterScaffold,
    PeabodyGrid
  },
  data: () => ({
    state: 0,
    states: {
      0: {
        content: "<p>One Year</p>",
        imageUrl: require("../assets/OneYear.svg"),
        altText: "Highlighting one year"
      },
      1: {
        content: "<p>One Century</p>",
        imageUrl: require("../assets/OneCentury.svg"),
      },
      2: {
        content: "<p>Read from left to right, row by row</p>",
        imageUrl: require("../assets/MarkedCentury.svg"),
      },
      3: {
        content: "<p>Each year has nine categories</p>",
        imageUrl: require("../assets/SubEvents.svg"),
      },
      4: {
        content: `
          <ol>
            <li><p>Battles, Sieges, Beginning of War</p></li>
            <li><p>Conquests, Annexations, Unions</p></li>
            <li><p>Losses or Disasters</p></li>
            <li><p>Falls of States</p></li>
            <li><p>Foundations of States or Revolutions</p></li>
            <li><p>Treaties or Sundries</p></li>
            <li><p>Births</p></li>
            <li><p>Deeds</p></li>
            <li><p>Deaths of Remarkable Individuals</p></li>
          </ol>
        `,
        imageUrl: require("../assets/9Events.svg"),
      },
      5: {
        content: "<p>Groups involved in each event are color coded</p>",
        imageUrl: require("../assets/EventActors.svg"),
      }
    }
  }),
  methods: {
    nextState (st) {
      console.log('nextState');
      if (this.states[st + 1] !== undefined)
        this.state = st + 1
    },
    prevState (st) {
      console.log('prevState');
      if (this.states[st - 1] !== undefined)
        this.state = (st - 1).toString()
    },
    mountDatasets () {
      return this.$store.dispatch('loadDatasets')
    },
  },
  created () {
    const self = this
    this.mountDatasets()
      .then(() => {
        const id = "helloWorld",
          fromId = 0,
          options = { isMutable: true }
        self.$store.commit('DUPLICATE_DATASET', { id, fromId, options })
      })
  }
}
</script>

<style scoped>
.wp {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: green; */
  margin: 0;
}
>>>.wp p {
  margin: 0;
}
.wp-image-wrapper {
  position: sticky;
  top: 0;
  height: 100vh;
  align-items: center;
  display: flex;
}
.wp-image {
  display: block;
  flex: 0 1 90%;
}
.waypoint-section {
  box-sizing: border-box;
  border-bottom: 2px solid grey;
}
</style>
