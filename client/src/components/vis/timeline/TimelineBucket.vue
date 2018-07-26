<template lang="html">
  <g>
    <timeline-event
      v-for='(timelineEvent, key) in dataset'
      :key='timelineEvent.id'
      :dataset='timelineEvent'
      :style='placeEvent(timelineEvent, key)'/>
  </g>
</template>

<script>
import TimelineEvent from './TimelineEvent'
export default {
  inject: ['options'],
  components: {
    TimelineEvent
  },
  props: {
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
      let dy = key * (this.options.styles.timelineEvent.gap + this.options.styles.timelineEvent.height)
      let dx = key * (this.options.styles.timelineEvent.gap + this.options.styles.timelineEvent.width)
      const vert = this.options.vertical;
      return {
        transform: `translate(${(vert)? dx : 0}px, -${(!vert)? dy : 0}px)`
      }
    }
  }
}
</script>

<style scoped>
</style>
