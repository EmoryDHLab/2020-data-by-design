<template lang="html">
  <g>
    <navline-event
      v-for='(navlineEvent, key) in dataset'
      :key='navlineEvent.id'
      :dataPt='navlineEvent'
      :style='placeEvent(key)'/>
  </g>
</template>

<script>
/**
 * This component groups events on the navline that occurred on the same position
 */

import NavlineEvent from './NavlineEvent'
export default {
  inject: ['options'],
  components: {
    NavlineEvent
  },
  props: {
    bucketId: Number, // the id of the bucket (helps keep track of things in future)
    dataset: Array // the dataset which falls within the scope of this bucket
  },
  computed: {
    getStyle () {
      return {
        fill: this.dataset.color
      }
    }
  },
  methods: {
    /**
     * this places each event where it belongs visually in the bucket.
     * @param {Number} key the key (generated in v-for) for the NavlineEvent
     * @return {Object} transformation to apply to the NavlineEvent
     */
    placeEvent (key) {
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
