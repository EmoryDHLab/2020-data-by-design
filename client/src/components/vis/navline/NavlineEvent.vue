<template lang="html">
  <g class='timeline-event'>
    <a :href="'#' + dataPt.link">
      <rect
        @mouseenter='hoverStart'
        @mouseleave='hoverEnd'
        :width='options.styles.timelineEvent.width'
        :height='options.styles.timelineEvent.height'
        :style='getStyle'
        :class='getClasses'/>
    </a>
  </g>
</template>

<script>
/**
 * this component creates the datapoints shown on the navigation timeline
 * It fires hover-start and hover-end events up to the NavlineVis using the
 * localBus
 */

export default {
  inject: ['options', 'localBus'], // get the dependencies from the parent vis
  props: {
    dataPt: {
      type: Object,
      validator (pt) {
        return pt.link !== undefined
          && typeof pt.color === typeof "test"
          && pt.color.length > 0
          && pt.link !== undefined
          && typeof pt.link === typeof "test"
          && pt.color.length > 0
      }
    },
  },
  data: () => ({
    isHovered: false
  }),
  computed: {
    /**
     * gets the styles for the NavlineEvent based on internal data
     */
    getStyle () {
      return {
        fill: this.dataPt.color
      }
    },
    /**
     * gets the classes for the NavlineEvent based on internal data
     */
    getClasses () {
      return {
        highlight: this.dataPt.highlighted === true
      }
    }
  },
  methods: {
    /**
     * When the mouse enters the element, fire a hover-start event on the
     * localBus with the data at the hovered point and the year
     */
    hoverStart () {
      this.isHovered = true
      this.localBus.fire('hover-start', {
        data: this.dataPt,
        year: this.dataPt.year,
      })
    },
    /**
     * When the mouse exits the element, fire a hover-end event on the
     * localBus with the data at the hovered point and the year
     */
    hoverEnd () {
      this.isHovered = false
      this.localBus.fire('hover-end', {
        data: this.dataPt,
        year: this.dataPt.year,
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
