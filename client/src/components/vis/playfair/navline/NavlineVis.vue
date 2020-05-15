<template lang="html">
  <svg viewBox="70 100 600 2500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="250" y="210" class="heavy">Progress</text>
    <!--LEGENDS-->
    <rect x="240" y="2092" width="35" height="35" :fill=styles.color.secHeader />
    <rect x="480" y="2092" width="35" height="35" :fill=styles.color.image />
    <rect x="240" y="2147" width="35" height="35" :fill=styles.color.vis />
    <rect x="480" y="2147" width="35" height="35" :fill=styles.color.text />
    <text x="320" y="2050" class="number" fill="#4A4A4A">LEGENDS</text>
    <text x="280" y="2120" class="small">Section Header</text>
    <text x="520" y="2120" class="small">Images</text>
    <text x="280" y="2175" class="small">Visualization</text>
    <text x="520" y="2175" class="small">Text</text>

    <line :x1="styles.line.left" :y1="styles.line.start" :x2="styles.line.right" :y2="styles.line.start" style="stroke:black; stroke-width:5; stroke-linecap:round"></line>

    <g v-for="(lines, index) in startEndPoint(dataset.playfair.paragraphData)">
        <line :x1="styles.line.left" :y1="lines.y1" :x2="styles.line.left" :y2="lines.y2"
            stroke="gray"
            stroke-dasharray="4 1 2 3"></line>

        <g v-if="index+1 <= getProgress">
          <rect :x="styles.line.left" :y="lines.y1"
                :width="blockcx(lines, index, maxIdx(index)+1) - styles.line.left + styles.block.r*2"
                :height="lines.blocks*styles.block.gap"
                :fill=styles.color.defaultBlock opacity="0.3"></rect>
        </g>

        <g v-else-if="index <= getProgress">
          <g v-for="i in lines.blocks">
            <rect v-if="index + i/10 <= getProgress"
                  :x="styles.line.left" :y="lines.y1 + (i-1)*styles.block.gap"
                  :width="blockcx(lines, index, maxIdx(index)+1) - styles.line.left + styles.block.r*2"
                  :height="styles.block.gap"
                  :fill=styles.color.defaultBlock opacity="0.3"></rect>
            <rect v-else
                  :x="styles.line.left" :y="lines.y1 + (i-1)*styles.block.gap"
                  :width="blockcx(lines, index, maxIdx(index)+1) - styles.line.left + styles.block.r*2"
                  :height="styles.block.gap"
                  :fill=styles.color.lightgray opacity="0.7"></rect>
          </g>
        </g>
        <!--gray parts-->
        <g v-if="index > getProgress">
          <rect :x="styles.line.left" :y="lines.y1"
                :width="blockcx(lines, index, maxIdx(index)+1) - styles.line.left + styles.block.r*2"
                :height="lines.blocks*styles.block.gap"
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
            <circle v-if="dataset.playfair.vis[index][i-1] == '1' "
                    :cx="blockcx(lines, index, i)" :cy="blockcy(lines, i)"
                    :r="styles.block.r" :fill=styles.color.secHeader></circle>
            <circle v-if="dataset.playfair.vis[index][i-1] == '2' "
                    :cx="blockcx(lines, index, i)" :cy="blockcy(lines, i)"
                    :r="styles.block.r" :fill=styles.color.image></circle>
            <circle v-if="dataset.playfair.vis[index][i-1] == '3' "
                    :cx="blockcx(lines, index, i)" :cy="blockcy(lines, i)"
                    :r="styles.block.r" :fill=styles.color.vis></circle>
            <circle v-if="dataset.playfair.vis[index][i-1] == '4' "
                    :cx="blockcx(lines, index, i)" :cy="blockcy(lines, i)"
                    :r="styles.block.r" :fill=styles.color.text></circle>

            <circle v-if="hover == index*10 + i  && dataset.playfair.vis[index][i-1] != '0'"
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
/**
 * This component is a metavisualization which visualizes chapter content by
 * It shares a lot of code with the the timeline vis
 */

import MetaVisualization from '@/mixins/vis/MetaVisualization'
import ch_mut from '@/store/chapters/types'

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
      secHeader:"#d4986e",
      image: "#BCC4B4",
      text: "#E3B966",
      vis: "#A76B6F",
      lightgray: "#dddddd"
    }
  },
  vertical: true, // how to orient the navline
  showTicks: true // whether to show the axis ticks
};
export default {
  data() {
    return {hover: null, click: null}
  },
  mixins: [MetaVisualization],
  props: {
    width: String,
    height: String,
    options: {
      type: Object,
      required: false,
      default: () => DEFAULT_OPTIONS
    },
  },
  computed: {
    /**
     * Formats the data for use by the navline
     * @return {Array} the formattedData
     */
    formattedData () {
      return this.dataFormatter(this.dataset.data || {})
    },
    maxNotes () {

    },
    getProgress() {
      return this.$store.getters.prog_pla;
    }
  },
  methods: {
      /**
       * calculate line positions
       **/
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
          return Cx + m + Math.floor(this.dataset.playfair.highlights[index][i-1] * (this.styles.line.right - Cx - 2*m));
      },
      blockcy: function (lines, i) {
          let Cy = lines.y1;
          return Cy + i*this.styles.block.gap - this.styles.block.gap/2;
      },
      goto: function (index, i) {
          let idname = "part" + index + "." + i;
          this.$store.commit(ch_mut.SET_IDNAME, { id: idname });
      },
      maxIdx: function (index) {
          let arr = this.dataset.playfair.highlights[index];
          let idx = 0;
          for (let i = 0; i < arr.length; i++) {
              idx = arr[idx] > arr[i] ? idx : i;
          }
          console.log(idx);
          return idx;
      },
    /**
     * Formats the data to match the navline format
     * [
     *  {
     *    id: <bucket position>
     *    events: [
     *      {
     *        color:"<some color>",
     *        position:Number(<some position>),
     *        ...eventdata
     *      },
     *      ...otherEventsInThisBucket
     *    ],
     *  }
     *  ...otherBuckets
     * ]
     * TODO make colors dynamic and configurable
     */
    dataFormatter (d) {
      const data = Object.values(d)
        .map(evt => ({
          color: "#db882a",
          // ...evt,
          position: Math.floor(evt.position)
        }))
        // .reduce((buckets, evt) => {
        //   if (!buckets[evt.position]) {
        //     buckets[evt.position] = { id: evt.position, events: [] }
        //   }
        //   buckets[evt.position].events.push(evt)
        //   return buckets
        // }, {})
      return Object.values(data)
    },
  },
}
</script>

<style scoped>
  .heavy { font: bold 70px "Georgia"; fill:#4A4A4A }
  .number { font: bold 40px "Georgia"}
  .small { font: 28px "Georgia"; fill:#4A4A4A }
</style>
