<template>
  <g>
    <rect class='bg' :width='bgSize' :height='bgSize'/>
    <event-square
      v-for='n in 9'
      :key='n'
      :style='styles(n)'
      :settings='settings'
      :dataset='getEventData(n)'/>
  </g>
</template>
<script>
import EventSquare from '@/components/vis/peabody/EventSquare'

export default {
  props: ['settings', 'dataset'],
  components: {
    'event-square': EventSquare
  },
  computed: {
    sizes () {
      return this.settings.sizes
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
      return this.dataset[n-1] || []
    }
  }
}
</script>
<style scoped>
  .bg {
    fill: #d8d8d8;
  }
</style>
