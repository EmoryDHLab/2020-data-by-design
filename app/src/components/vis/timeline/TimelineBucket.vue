<template lang="html">
  <g>
    <timeline-event
      v-for='(timelineEvent, key) in dataset'
      :key='timelineEvent.id'
      :dataset='timelineEvent'
      :style='placeEvent(timelineEvent, key)'
      :config='config'/>
  </g>
</template>

<script>
import TimelineEvent from './TimelineEvent'
export default {
  components: {
    TimelineEvent
  },
  props: {
    bucketId: Number,
    dataset: Array,
    config: Object
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
      return {
        transform: 'translate('
          + 0
          + 'px, -'
          + (key * (this.config.timelineEvent.gap + this.config.timelineEvent.height))
          + 'px)'
      }
    }
  }
}
</script>

<style lang="css">
</style>
