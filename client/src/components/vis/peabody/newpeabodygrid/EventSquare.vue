<template>
  <svg viewBox="0 0 30 30">
    <defs>
      <pattern id="diagonalHatch" width="5" height="10" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="10" style="stroke:orange; stroke-width:4" />
      </pattern>
    </defs>
    <rect v-if="computedColors.length == 1"
          stroke="#b3b3b3"
          stroke-width="0.5"
          :fill="computedColors"
          :class="classes"
          width="30"
          height="30"
          @mouseenter='hoverStart()'
          @mouseleave='hoverEnd()'
          @click='clickedEvent()'
    />
    <g v-else-if="computedColors.length > 1">
      <polygon v-for="(polygon, index) in polygons"
               :class="classes"
               :points="polygon"
               :fill="computedColors[index]"
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
    year: Number,
    highlighted: Boolean,
  },
  computed: {
    polygons () {
      switch (this.colors.length) {
        case 2: return this.twoPolygons
        case 3: return this.threePolygons
        case 4: return this.fourPolygons
        //edge case for full year with three actors
        case 5: return this.threePolygonsSplit
      }
    },
    computedColors () {
      return this.colors.map ( color => {
        if (!color) {
          return "white";
        }
        if (color.toLowerCase() === "native") {
          return "url(#diagonalHatch)";
        }
        return color;
      })
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
    //edge case for full year with three actors
    threePolygonsSplit () {
      const left = 0;
      const top = 0;
      const botTriangle1 = `${left + 15}, ${top + 15} ${left + 30}, ${top} ${left + 30}, ${top + 30}`;
      const botTriangle2 = `${left + 15}, ${top + 15} ${left}, ${top + 30} ${left + 30}, ${top + 30}`;
      const threePol = this.threePolygons;
      threePol.pop();
      threePol.push(botTriangle1, botTriangle2);
      return threePol;
    },
    classes() {
      return {
        'highlight': this.highlighted
      }
    },
  },
  methods: {
    clickedEvent(i) {
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
  }
};

export { events, EventSquare as default }
</script>
<style scoped>
  rect:not([fill]) {
    fill: #ffffff;
  }
  rect:not([fill]):hover, rect:not([fill]).highlight {
    fill: #d8d8d8;
  }

  rect:hover, polygon:hover, .highlight {
    stroke: gold;
    stroke-width: 5px;
  }
</style>
