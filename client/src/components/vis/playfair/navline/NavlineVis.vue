<template lang="html">
  <svg width="3309" height="2523" viewBox="70 100 600 2500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="250" y="210" class="heavy">Progress</text>
    <!--LEGEND-->
    <g style="transform:translateY(20vh)">
      <rect x="240" y="2092" width="35" height="35" :fill=styles.color.visualization />
      <rect x="480" y="2092" width="35" height="35" :fill=styles.color.image />
      <rect x="240" y="2147" width="35" height="35" :fill=styles.color.scrollytell />
      <rect x="480" y="2147" width="35" height="35" :fill=styles.color.highlights />
      <text x="320" y="2050" class="number" fill="#4A4A4A">LEGEND</text>
      <text x="280" y="2120" class="small">Visualization</text>
      <text x="520" y="2120" class="small">Image</text>
      <text x="280" y="2175" class="small">Scrollytell</text>
      <text x="520" y="2175" class="small">Highlight</text>
    </g>

    <line :x1="styles.line.left" :y1="styles.line.start" :x2="styles.line.right" :y2="styles.line.start" style="stroke:black; stroke-width:5; stroke-linecap:round"></line>

    <g v-for="(lines, index) in startEndPoint(dataset.paragraphData)">
        <line :x1="styles.line.left" :y1="lines.y1" :x2="styles.line.left" :y2="lines.y2"
            stroke="gray"
            stroke-dasharray="4 1 2 3"></line>

        <g v-if="index+1 <= getProgress">
          <rect :x="styles.line.left" :y="lines.y1"
                :width="styles.line.right - styles.line.left" :height="lines.blocks*styles.block.gap"
                :fill=styles.color.defaultBlock opacity="0.3"></rect>
        </g>

        <g v-else-if="index <= getProgress">
          <g v-for="i in lines.blocks">
            <rect v-if="index + i/10 <= getProgress"
                  :x="styles.line.left" :y="lines.y1 + (i-1)*styles.block.gap"
                  :width="styles.line.right - styles.line.left" :height="styles.block.gap"
                  :fill=styles.color.defaultBlock opacity="0.3"></rect>
            <rect v-else
                  :x="styles.line.left" :y="lines.y1 + (i-1)*styles.block.gap"
                  :width="styles.line.right - styles.line.left" :height="styles.block.gap"
                  :fill=styles.color.lightgray opacity="0.7"></rect>
          </g>
        </g>
        <!--gray parts-->
        <g v-if="index > getProgress">
          <rect :x="styles.line.left" :y="lines.y1"
                :width="styles.line.right - styles.line.left" :height="lines.blocks*styles.block.gap"
                :fill=styles.color.lightgray opacity="0.7"></rect>
        </g>

        <g v-for="i in lines.blocks">
          <line :x1="styles.line.left" :y1="lines.y1 + i*styles.block.gap" :x2="styles.line.right" :y2="lines.y1 + i*styles.block.gap"
                stroke="gray"
                stroke-dasharray="4"></line>
          <!--VIS blocks-->
          <!--10: largest number of subparts in section-->
          <g v-on:click="click = goto(index, i-1)"
             @mouseover="hover = index*10 + i"
             @mouseleave="hover = null">
            <circle v-if="dataset.highlights[index][i-1]"
                    :cx="blockcx(lines, index, i)" :cy="blockcy(lines, i)"
                    :r="styles.block.r" :fill=styles.color.highlights></circle>
            <circle v-if="dataset.vis[index][i-1] == VisTypes.IMAGE"
                    :cx="blockcx(lines, index, i)" :cy="blockcy(lines, i)"
                    :r="styles.block.r" :fill=styles.color.image></circle>
            <circle v-if="dataset.vis[index][i-1] == VisTypes.VISUALIZATION "
                    :cx="blockcx(lines, index, i)" :cy="blockcy(lines, i)"
                    :r="styles.block.r" :fill=styles.color.visualization></circle>
            <circle v-if="dataset.vis[index][i-1] == VisTypes.INTERACTION"
                    :cx="blockcx(lines, index, i)" :cy="blockcy(lines, i)"
                    :r="styles.block.r" :fill=styles.color.scrollytell></circle>

            <circle v-if="hover == index*10 + i  && dataset.vis[index][i-1] != '0'"
                    :cx="blockcx(lines, index, i)" :cy="blockcy(lines, i)"
                    :r="styles.block.r" :fill=styles.color.lightgray></circle>
          </g>
        </g>
        <!--section line-->
        <line :x1="styles.line.left" :y1="lines.y2" :x2="styles.line.right" :y2="lines.y2"
            style="stroke:black; stroke-width:5; stroke-linecap:round"></line>
    </g>
  </svg>

</template>

<script>

import NavlineBucket from './NavlineBucket'
import NavlineMixin from "../../../../mixins/vis/NavlineMixin";
// import * as d3 from 'd3'

const DEFAULT_OPTIONS = {
  styles: {
    width: 50, // navline width
    height: 500, // the height of the navline
    margin: { // margins for the vis (helps avoid axis overflow)
      top: 10,
      left: 10,
      bottom: 10,
      right: 10
    },
    timelineEvent: { // styles for each navline event
      width: 5,
      height: 5,
      gap: 1 // space between each event
    },
    line: {
      x: 373,
      start: 270,
      left: 200,
      right: 600,
    },
    block: {
      r: 18,
      gap: 65,
      margin: 50,
    },
    color: {
      defaultBlock: "#f4b84c",
      gray: "#9B9B9B",
      visualization:"#d4986e",
      image: "#BCC4B4",
      highlights: "#D9B89A",
      scrollytell: "#A76B6F",
      lightgray: "#dddddd"
    }
  },
  vertical: true, // how to orient the navline
  showTicks: true // whether to show the axis ticks
};
export default {
  components: {
    NavlineBucket
  },
  mixins: [NavlineMixin(DEFAULT_OPTIONS)],

  methods: {
    startEndPoint: function (paragraphData) {
      let start = this.styles.line.start;
      let arr = [];
      for (let i = 0; i < paragraphData.length; i++) {
        let lines = paragraphData[i];
        let end = lines * this.styles.block.gap +  start;
        arr.push({
          y1: start,
          y2: end,
          blocks: lines,
        });
        start = end;
      }
      // console.log(arr)
      return arr;
    },
    calcArc: function (lines, index) {
      let left = (index+1) % 2;
      let d = [
        "M", this.styles.line.x, lines.y1,
        "A", lines.R, lines.R, 0, 0, left, this.styles.line.x, lines.y2
      ].join(" ");
      return d;
    },
    blockcx: function (lines, index, i) {
      let Cx = this.styles.line.left;
      let m = this.styles.block.margin;
      return Cx + m + Math.floor(this.dataset.highlights[index][i-1] * (this.styles.line.right - Cx - 2*m));
    },
    blockcy: function (lines, i) {
      let Cy = lines.y1;
      return Cy + i*this.styles.block.gap - this.styles.block.gap/2;
    }
  }
}
</script>

<style scoped>
  .heavy { font: bold 70px "Georgia"; fill:#4A4A4A }
  .number { font: bold 40px "Georgia"}
  .small { font: 28px "Georgia"; fill:#4A4A4A }
</style>
