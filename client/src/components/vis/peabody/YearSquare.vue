<template>
  <g>
    <rect class='bg' :width='bgSize' :height='bgSize'/>
    <event-square
      v-for='n in 9'
      :key='n'
      :style='styles(n)'
      :type='n - 1'
      :year='year'
      :eventsData='getEventData(n)'/>
  </g>
</template>
<script>
import EventSquare from '@/components/vis/peabody/EventSquare'

/*
  {
    year: 1800,
    events: {

    }
  }
*/
export default {
  inject: ['options'],
  props: {
    yearData: {
      type: Object,
      required: true
    },
    year: {
      type: Number,
      required: true
    }
  },
  components: {
    'event-square': EventSquare
  },
  computed: {
    sizes () {
      return this.options.sizes
    },
    evtWidth () {
      return this.sizes.rect + this.sizes.line.sm
    },
    bgSize () {
      return this.sizes.rect * 3 + 2 * this.sizes.line.sm
    }
  },
  methods: {
    getEventXFromIndex (i) {
      return (i % 3) * (this.evtWidth)
    },
    getEventYFromIndex (i) {
      return Math.floor(i / 3) * (this.evtWidth)
    },
    styles (n) {
      return {
        'transform': 'translate('
          + this.getEventXFromIndex(n-1) + 'px,'
          + this.getEventYFromIndex(n-1) + 'px)'
      }
    },
    getEventData (n) {
      return this.yearData[n - 1] || []
    }
  }
}
</script>
<style scoped>
  .bg {
    fill: #d8d8d8;
  }
</style>
