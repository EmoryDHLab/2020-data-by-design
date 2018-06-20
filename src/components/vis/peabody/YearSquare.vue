<template>
  <g>
    <rect class='bg' :width='bgSize' :height='bgSize'/>
    <event-square
      v-for='n in 9'
      :key='n'
      :style='styles(n)'
      :sizes='sizes'/>
  </g>
</template>
<script>
import EventSquare from '@/components/vis/peabody/EventSquare'

export default {
  props: ['sizes'],
  components: {
    'event-square': EventSquare
  },
  computed: {
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
  }
}
</script>
<style scoped>
  .bg {
    fill: #d8d8d8;
  }
</style>
