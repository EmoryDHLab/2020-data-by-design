<template lang="html">
  <g class='timeline-event'>
    <rect
      @mouseenter='hoverStart'
      @mouseleave='hoverEnd'
      :width='options.styles.timelineEvent.width'
      :height='options.styles.timelineEvent.height'
      :style='getStyle'
      :class='getClasses'/>
  </g>
</template>

<script>
import { injects } from '@/mixins/vis/Visualization'

export default {
  inject: [injects.registerEvents],
  props: {
    dataset: Object,
    options: Object
  },
  created () {
    if (this.registerEvents) {
      this.registerEvents(this, ['hover-start', 'hover-end'])
    }
  },
  data: () => ({
    isHovered: false
  }),
  computed: {
    getStyle () {
      return {
        fill: this.dataset.color
      }
    },
    getClasses () {
      return {
        highlight: this.dataset.highlighted === true
      }
    }
  },
  methods: {
    hoverStart () {
      this.isHovered = true
      this.$emit('hover-start', {
        data: this.dataset,
        year: this.dataset.year,
      })
    },
    hoverEnd () {
      this.isHovered = false
      this.$emit('hover-end', {
        data: this.dataset,
        year: this.dataset.year,
      })
    }
  }
}
</script>

<style scoped>
.highlight {
  stroke: gold;
  stroke-width: 1px;
}
</style>
