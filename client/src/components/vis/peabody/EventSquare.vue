<template>
  <g>
    <rect v-if='eventsData.length < 2'
      @mouseenter='hoverStart(0)'
      @mouseleave='hoverEnd(0)'
      @click='clickedEvent(0)'
      :width='sizes.rect'
      :height='sizes.rect'
      :fill='color(0)'
      :class='classes(0)'/>
    <g v-if='eventsData.length > 1'>
      <polygon v-for="n in 2"
        :key="n-1"
        @click='clickedEvent(n - 1)'
        @mouseenter='hoverStart(n - 1)'
        @mouseleave='hoverEnd(n - 1)'
        :points='trianglePoints(n - 1)'
        :fill='color(n - 1)'
        :class='classes(n - 1)'/>
    </g>
  </g>
</template>
<script>
export default {
  inject: ['localBus', 'options'],
  props: {
    year: {
      type: Number,
      required: true,
    },
    type: {
      type: Number,
      required: true
    },
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
        //console.log(this.eventsData[0], this.eventsData.length);
      }
      return this.eventsData.length
    },
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
    trianglePoints (i) {
      const sz = this.sizes.rect
      return [`0,${sz} 0,0 ${sz},0`, `0,${sz} ${sz},${sz} ${sz},0`][i]
    },
    clickedEvent (i) {
      this.localBus.fire('event-clicked', {
        year: this.year,
        type: this.type,
        data: this.getEvent(i)
      })
    },
    hoverStart (i) {
      this.localBus.fire('hover-start', {
        year: this.year,
        type: this.type,
        data: this.getEvent(i)
      })
    },
    hoverEnd (i) {
      this.localBus.fire('hover-end', {
        year: this.year,
        type: this.type,
        data: this.getEvent(i)
      })
    },
    classes (i) {
      return {
        'highlight': this.highlight(i)
      }
    },
    highlight (i) {
      if (!this.getEvent(i)) return false;
      return this.getEvent(i).highlighted === true;
    }
  },
}
</script>
<style scoped>
  rect:not([fill]) {
    fill: #ffffff;
  }
  rect:not([fill]):hover {
    fill: #d8d8d8;
  }
  .highlight {
    stroke: gold;
    stroke-width: 3px;
  }
</style>
