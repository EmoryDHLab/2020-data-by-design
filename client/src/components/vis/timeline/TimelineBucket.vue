<template lang="html">
  <g>
    <EventSquare
      v-for='(timelineEvent, key) in dataset' :key="key"
      :colors="timelineEvent.color"
      :year="bucketId"
      :width="options.styles.timelineEvent.width"
      :height="options.styles.timelineEvent.height"
      :y="placeEvent(timelineEvent, key).dy"/>
  </g>
</template>

<script>
import TimelineEvent from './TimelineEvent';
import EventSquare from '../peabody/newpeabodygrid/EventSquare'

export default {
  components: {
    TimelineEvent,
    EventSquare
  },
  props: {
    options: Object,
    bucketId: Number,
    dataset: Array
  },
  computed: {
    getStyle () {
      return {
        fill: this.dataset.color
      }
    }
  },
  methods: {
    placeEvent (event, key) {
      // debugger;
      let dy = this.options.styles.height / 2 - key * (this.options.styles.timelineEvent.gap + this.options.styles.timelineEvent.height)
      // let dx = key * (this.options.styles.timelineEvent.gap + this.options.styles.timelineEvent.width)
      // const vert = this.options.vertical;
      return {dy}
    }
  }
}
</script>

<style scoped>
</style>
