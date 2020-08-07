<template>
  <svg viewBox="0 0 30 30">
    <rect v-if="colors.length == 1"
          stroke="#b3b3b3"
          stroke-width="0.5"
          :fill="colors[0]"
          width="30"
          height="30"
          @mouseenter='hoverStart()'
          @mouseleave='hoverEnd()'
          @click='clickedEvent()'
    />
    <g v-else-if="colors.length > 1">
      <polygon v-for="(polygon, index) in polygons"
               :points="polygon"
               :fill="colors[index]"
              @mouseenter='hoverStart(index)'
              @mouseleave='hoverEnd(index)'
              @click='clickedEvent(index)'
               />
    </g>
  </svg>
</template>
<script>

const events = {
  eventClicked: 'event-clicked',
  hoverStart: 'hover-start',
  hoverEnd: 'hover-end'
}

const EventSquare = {
  // injects: [injects.registerEvents, injects.calcWidth, injects.data] ,
  props: {
    colors: {
      type: Array,
      default: () => ["white"]
      // required: true
    },
    type: Number,
    year: Number
  },
  data () {
    return {
      // highlight: false,
    }
  },
  created() {
    if (this.registerEvents) {
      this.registerEvents(this, Object.values(events))
    }
  },
  computed: {
    polygons () {
      switch (this.colors.length) {
        case 2: return this.twoPolygons
        case 3: return this.threePolygons
        case 4: return this.fourPolygons
      }
    },
    twoPolygons () {
      const left = 0;
      const top = 0;
      const topTriangle = `${left}, ${top} ${left + 30}, ${top} ${left}, ${top + 30}`;
      const bottomTriangle = `${left}, ${top + 30} ${left + 30}, ${top + 30} ${left + 30}, ${top}`
      return [topTriangle, bottomTriangle];
    },
    fourPolygons () {
      const topLeftX = 0;
      const topLeftY = 0 ;
      const topTriangle = (left, top) => `${left}, ${top}, ${left + 15}, ${top}, ${left}, ${top + 30}`;
      const bottomTriangle = (left, top) => `${left}, ${top + 30}, ${left + 15}, ${top + 30}, ${left + 15}, ${top}`;
      return [
        topTriangle(topLeftX, topLeftY), bottomTriangle(topLeftX, topLeftY),
        topTriangle(topLeftX + 15, topLeftY), bottomTriangle(topLeftX + 15, topLeftY)]
    },
    threePolygons () {
      const left = 0;
      const top = 0;
      const topTriangle1 = `${left}, ${top} ${left + 30}, ${top} ${left + 15}, ${top + 15}`;
      const topTriangle2 = `${left}, ${top} ${left}, ${top + 30} ${left + 15}, ${top + 15}`;
      return [topTriangle1, topTriangle2, this.twoPolygons[1]];
    },
  },
  methods: {
    clickedEvent(i) {
      console.log("emitted", this.year, this.type, i)
      this.$emit(events.eventClicked, {
        year: this.year,
        type: this.type,
        sub: i
      })
    },
    hoverStart(i) {
      this.$emit(events.hoverStart, {
        year: this.year,
        type: this.type,
        sub: i
      })
    },
    hoverEnd(i) {
      this.$emit(events.hoverEnd, {
        year: this.year,
        type: this.type,
        sub: i
      })
    },
    classes(i) {
      return {
        // 'highlight': this.highlight
      }
    },
  }
};

export { events, EventSquare as default }
</script>
<style scoped>
  rect:not([fill]) {
    fill: #ffffff;
  }
  rect:not([fill]):hover {
    fill: #d8d8d8;
  }
  polygon:hover {
    stroke: gold;
    stroke-width: 3px;
  }
  .highlight {
    stroke: gold;
    stroke-width: 3px;
  }
</style>
