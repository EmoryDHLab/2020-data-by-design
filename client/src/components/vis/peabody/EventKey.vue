<template>
  <svg class="event-key" viewBox="0 0 250 120" @mouseout="hoveredNumber = null">
    <filter id="shadow">
      <feDropShadow dx="0" dy="0" stdDeviation="3"/>
    </filter>
    <rect v-show="hoveredNumber != null" x="105" :y="-40 + hoveredNumber * 20" width="375" height="20" fill="yellow"/>
    <text class="label" v-show="showLegend" v-for="(label, index) in legendText" :key="label"
        x="110" :y="-25 + index * 20">{{index + 1}}. {{label}}</text> 
    <g :style="{filter: dropShadow ? 'url(#shadow)' : 'none'}">
      <g v-for="(color, index) in colors" :key="index">
        <rect
          stroke="#b3b3b3"
          stroke-width="0.5"
          :fill="(!color || color === 'none') ? 'white' : color"
          width="30"
          height="30"
          :x="1 + (index % 3) * 30"
          :y="1 + (Math.floor(index / 3)) * 30"
          @mouseover="hoveredNumber = index"
        />
        <text v-if="showNumbers"
          class="number"
          :x="12 + (index % 3) * 30"
          :y="22 + (Math.floor(index / 3)) * 30"
          :fill="(!color || color === 'none') ? 'black' : 'white'"
        >{{index + 1}}</text>
      </g>
      <rect width="92" height="92" stroke="orange" stroke-width="3" fill="none" />
    </g>

  </svg>
</template>

<script>
export default {
  props: {
    colors: {
      //Pass an array of colors, which are either String CSS-valid colors
      //or a falsy value for white
      type: Array,
      validator(array) {
        return array.length === 9;
      },
      default() {
        return [false, false, false, false, false, false, false, false, false];
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
  data() {
    return {
      hoveredNumber: null
    }
  }
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