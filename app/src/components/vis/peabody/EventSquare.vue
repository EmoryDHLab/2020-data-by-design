<template>
  <g>
    <rect @click='clickedEvent(0)'
      :width='sizes.rect'
      :height='sizes.rect'
      :fill='color(0)'/>
    <polygon @click='clickedEvent(1)'
      v-if='eventsData.length == 2'
      :points='trianglePoints'
      :fill='color(1)'/>
  </g>
</template>
<script>
export default {
  inject: ['localBus', 'options'],
  props: {
    eventsData: {
      type: Array,
      required: true
    },
  },
  computed: {
    sizes () {
      return this.options.sizes
    },
    checker () {
      if (this.eventsData.length > 2) {
        console.log(this.eventsData[0], this.eventsData.length);
      }
      return this.eventsData.length
    },
    trianglePoints () {
      return (
        '0,' + this.sizes.rect + ' '
        + '0,0 '
        + this.sizes.rect + ',0'
      )
    }
  },
  methods: {
    getEvent (i) {
      return this.eventsData[i]
    },
    color (i) {
      const event = this.getEvent(i)
      if (event)
        return event.color
    },
    clickedEvent (i) {
      this.localBus.fire('event-clicked', this.getEvent(i))
    }
  }
}
</script>
<style scoped>
  rect:not([fill]) {
    fill: #ffffff;
  }
  rect:not([fill]):hover {
    fill: #d8d8d8;
  }
</style>
