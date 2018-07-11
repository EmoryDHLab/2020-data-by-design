<template lang="html">
  <g class='timeline-event'>
    <rect
      @mouseenter='isHovered=true' @mouseleave='isHovered=false'
      :width='options.styles.timelineEvent.width'
      :height='options.styles.timelineEvent.height'
      :style='getStyle'/>
    <vis-tooltip :active='isHovered'>{{ dataset.desc }}</vis-tooltip>
  </g>
</template>

<script>
import VisTooltip from '../VisTooltip'
export default {
  inject: ['options'],
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
    }
  },
}
</script>

<style scoped>
</style>
