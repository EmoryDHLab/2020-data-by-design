<template lang="html">
  <ChapterScaffold>
    <div style="display:flex">
      <div class="scrolly-states" style="flex: 1;">
        <div v-for="(s, k) in states" key="k"
          class="wp-image-wrapper" style="">
          <img class= "wp-image" v-if="state === k"
          :src="s.imageUrl" :alt="s.altText"/>
        </div>
      </div>
      <div class="scrolly-info" style="flex: 1;">
        <in-out-waypoint
          v-for="(st, k) in states"
          :key="k"
          class="waypoint-section"
          @exit:down="state = k"
          @enter:up="state = k">
          <p class="wp">{{ st.content }}</p>
        </in-out-waypoint>
      </div>
    </div>
  </ChapterScaffold>
</template>

<script>
import InOutWaypoint from '@/components/waypoints/InOutWaypoint'
import ChapterScaffold from '@/components/ChapterScaffold'
import PeabodyGrid from '@/components/vis/peabody/PeabodyGrid'

export default {
  components: {
    InOutWaypoint,
    ChapterScaffold,
    PeabodyGrid
  },
  data: () => ({
    state: 0,
    states: {
      0: {
        content: "One Year",
        imageUrl: require("../assets/OneYear.svg"),
        altText: "Highlighting one year"
      },
      1: {
        content: "One Century",
        imageUrl: require("../assets/OneCentury.svg"),
      },
      2: {
        content: "Read from left to right, row by row",
        imageUrl: require("../assets/MarkedCentury.svg"),
      },
      3: {
        content: "Each year has nine categories",
        imageUrl: require("../assets/SubEvents.svg"),
      },
      4: {
        content: "",
        imageUrl: require("../assets/9Events.svg"),
      },
      5: {
        content: "Each year has nine categories",
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
        this.state = st - 1
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
.wp-image-wrapper {
  position: sticky;
  top: 0;
  height: 100vh;
  align-items: center;
  display: flex;
}
.wp-image {
  display: block;
  flex: 1;
}
.waypoint-section {
  box-sizing: border-box;
  border-bottom: 2px solid grey;
}
</style>
