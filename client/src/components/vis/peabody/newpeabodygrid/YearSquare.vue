<template>
  <g>
    <rect :class="showSquares ? 'bg-gray' : 'bg-white'" :width='bgSize' :height='bgSize'/>
    <event-square
      v-show="showSquares"
      v-for='n in 9'
      :width="sizes.rect + 1"
      :height="sizes.rect + 1"
      :key='n'
      :type="n"
      :year="year"
      :x = "getEventXFromIndex(n - 1)"
      :y = "getEventYFromIndex(n - 1)"
      :colors="getEventData(n)"
      />
  </g>
</template>
<script>
import EventSquare from '@/components/vis/peabody/newpeabodygrid/EventSquare'

import { injects } from '@/mixins/vis/Visualization'

const EventSquareInjected = Object.assign({ injects: [injects.registerEvents, injects.calcWidth, injects.data]}, EventSquare);

export default {
  props: {
    yearData: {
      type: Array,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    actorColors: {
      type: Object,
      required: true,
    },
    showSquares: {
      type: Boolean,
      default: true
    },
    sizes: {
      type: Object,
      required: true
    }
  },
  components: {
    'event-square': EventSquareInjected
  },
  computed: {
    evtWidth () {
      return this.sizes.rect + this.sizes.line.sm
    },
    bgSize () {
      return this.sizes.rect * 3 + 2 * this.sizes.line.sm
    },
    colorData () {
      return this.yearData.map( squareObj =>
        squareObj ? squareObj.actors.map(actor => this.actorColors[actor]) : [false])
    },
  },
  methods: {
    getEventXFromIndex (i) {
      return (i % 3) * (this.evtWidth)
    },
    getEventYFromIndex (i) {
      return Math.floor(i / 3) * (this.evtWidth)
    },
    // styles (n) {
    //   return {
    //     // width: this.sizes.rect / 3 + 'px',
    //     // height: this.sizes.rect / 3 + 'px',
    //     'transform': 'translate('
    //       + this.getEventXFromIndex(n-1) + 'px,'
    //       + this.getEventYFromIndex(n-1) + 'px)'
    //   }
    // },
    getEventData (n) {
      return this.colorData[n - 1] || []
    }
  }
}
</script>
<style scoped>
  .bg-gray {
    fill: #d8d8d8;
  }

  .bg-white {
    fill: #fefefe;
  }
</style>
