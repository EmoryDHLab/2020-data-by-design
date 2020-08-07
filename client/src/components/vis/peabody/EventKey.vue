<template>
  <svg class="event-key" viewBox="0 0 250 120" :id="`event-key-${_uid}`"
    :aria-labelledby="`event-key-${_uid}-title event-key-${_uid}-desc`"
   @mouseleave="hoveredNumber = null">
    <title :id="`event-key-${_uid}-title`">Event Key</title>
    <desc :id="`event-key-${_uid}-desc`"></desc>
    <filter id="shadow">
      <feDropShadow dx="0" dy="0" stdDeviation="3"/>
    </filter>

    <template v-if="showLegend">
      <rect class="highlighted-text-box" v-if="hoveredNumber != null"
            x="105" :y="-40 + hoveredNumber * 20" width="375" height="20" fill="yellow"/>
      <text class="label" v-for="(label, index) in legendText" :key="label"
          x="110" :y="-25 + index * 20" @mouseover="hoveredNumber = index"
         >
          {{index + 1}}. {{label}}
      </text>
    </template>

    <g :style="{filter: dropShadow ? 'url(#shadow)' : 'none'}">
      <g v-for="(color, index) in fixedColors" :key="index" @mouseover="hoveredNumber = index">
        <EventSquare
          :x="1 + (index % 3) * 30"
          :y="1 + (Math.floor(index / 3)) * 30"
          :colors="color"
          :width="30"
          :height="30"
        ></EventSquare>
<!--        <rect v-if = "!Array.isArray(color)"-->
<!--          stroke="#b3b3b3"-->
<!--          stroke-width="0.5"-->
<!--          :fill="(!color || color === 'none') ? 'white' : color"-->
<!--          width="30"-->
<!--          height="30"-->
<!--          :x="1 + (index % 3) * 30"-->
<!--          :y="1 + (Math.floor(index / 3)) * 30"-->
<!--        />-->
<!--        <g v-else-if="color.length === 4">-->
<!--          <polygon v-for="(polygon, index) in fourPolygons(index)"-->
<!--                   :points="polygon"-->
<!--                   :fill="(!color[index] || color[index] === 'none') ? 'white' : color[index]"/>-->
<!--        </g>-->
<!--        <g v-else>-->
<!--          <polygon :points="polygons(index).top"-->
<!--                   :fill="(!color[0] || color[0] === 'none') ? 'white' : color[0]"/>-->
<!--          <polygon :points="polygons(index).bottom"-->
<!--                   :fill="(!color[1] || color[1] === 'none') ? 'white' : color[1]"/>-->
<!--        </g>-->
        <text v-if="showNumbers"
          class="number"
          :x="12 + (index % 3) * 30"
          :y="22 + (Math.floor(index / 3)) * 30"
          :fill="textColor(color)"
        >{{index + 1}}</text>
      </g>
      <rect width="92" height="92" stroke="orange" stroke-width="3" fill="none" />
      <rect class="highlighted-number-box" v-if="showLegend && hoveredNumber != null"
      width="30" height="30" stroke="yellow" fill="none" stroke-width="2"
      :x="1 + (hoveredNumber % 3) * 30"
      :y="1 + (Math.floor(hoveredNumber / 3)) * 30"/>
    </g>
  </svg>
</template>

<script>
import EventSquare from '@/components/vis/peabody/newpeabodygrid/EventSquare'
export default {
  components: {EventSquare},
  props: {
    value: {
      type: Number,
      validator(num) {
        return num >= 1 && num <= 9;
      }
    },
    colors: {
      //Pass an array of colors, which are either String CSS-valid colors
      //or a falsy value for white
      type: Array,
      validator(array) {
        return array.length === 9;
      },
      default() {
        return [false, false, false,
                false, false, false,
                false, false, false];
      }
    },
    showLegend: {
      type: Boolean,
      default: true
    },
    showNumbers: {
      type: Boolean,
      default: true
    },
    dropShadow: {
      type: Boolean,
      default: true
    },
    legendText: {
      type: Array,
      validator(array) {
        return array.filter(el => typeof el === 'string').length === 9
      },
      default() {
        return [ "Battles, Sieges, Beginning of War",
          "Conquests, Annexations, Unions",
          "Losses and Disasters",
          "Falls of States",
          "Foundations of States and Revolutions",
          "Treaties and Sundries",
          "Births",
          "Deeds",
          "Deaths, of remarkable individuals"]
      }
    }
  },
  computed: {
    fixedColors() {
      return this.colors.map(color => Array.isArray(color) ? color : [color]);
    }
  },
  methods: {
    textColor(squareColor) {
      return (!squareColor || !squareColor[0] || squareColor == [] || squareColor === 'none') ? 'black' : 'white'
    }
  },
  data() {
    return {
      hoveredNumber: null
    }
  },
  watch: {
    value (newVal, oldVal) {
      this.hoveredNumber = newVal - 1;
    },
    hoveredNumber (newVal, oldVal) {
      if (oldVal && newVal === oldVal) return;
      this.$emit('input', newVal + 1);
    }
  },
};
</script>

<style scoped>
.event-key {
  user-select: none;
  overflow: visible;
}

.number {
  font-family: monospace;
  font-size: 14pt;
  /* font-size: 100%; */
}

.label {
  font-family: monospace;
  font-size: 12pt;
}

</style>
