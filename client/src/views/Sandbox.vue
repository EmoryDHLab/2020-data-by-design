<template lang="html">
  <ChapterScaffold>
    <div style="display:flex">
      <div class="scrolly-states" style="flex: 1;">
        <peabody-grid
          id='peabody-vis-1'
          style='position:sticky; top:0;'
          width='95%'
          height='100vh'
          :datasetId='states[state].datasetId'/>
      </div>
      <div class="scrolly-info" style="flex: 1;">
        <in-out-waypoint
          v-for="(st, k) in states"
          :key="k"
          :style="{'background-color': ['green', 'blue', 'red'][k]}"
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
        content: "Hello",
        datasetId: "century"
      },
      1: {
        content: "Hello",
        datasetId: "year"
      },
      2: {
        content: "Hello",
        datasetId: ""
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
</style>
