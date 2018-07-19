<template lang="html">
  <g class='timeline-event'>
    <rect
      @mouseenter='hoverStart'
      @mouseleave='hoverEnd'
      :width='options.styles.timelineEvent.width'
      :height='options.styles.timelineEvent.height'
      :style='getStyle'
      :class='getClasses'/>
    <!-- <vis-tooltip :active='isHovered'>{{ dataset.desc }}</vis-tooltip> -->
  </g>
</template>

<script>
import VisTooltip from '../VisTooltip'
export default {
  inject: ['options', 'localBus'],
  components: {
    VisTooltip
  },
  props: {
    dataset: Object,
    config: Object,
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
      this.localBus.fire('hover-start', {
        data: this.dataset,
        year: this.dataset.year,
      })
    },
    hoverEnd () {
      this.isHovered = false
      this.localBus.fire('hover-end', {
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
