<template lang="html">
  <g class='timeline-event'>
    <rect
      :width='config.timelineEvent.width'
      :height='config.timelineEvent.height'
      :style='getStyle'/>
  </g>
</template>

<script>
export default {
  props: {
    dataset: Object,
    config: Object,
  },
  computed: {
    getStyle () {
      return {
        fill: this.dataset.color
      }
    }
  }
}
</script>

<style lang="css">
</style>
