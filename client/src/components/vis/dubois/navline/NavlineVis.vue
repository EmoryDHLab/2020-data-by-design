<template lang="html">
  <svg width="3309" height="2523" viewBox="70 100 600 2500" fill="none" xmlns="http://www.w3.org/2000/svg">
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

    <circle :cx="styles.line.x" :cy="styles.line.start" :r="styles.chapterBlock.r" :fill=styles.color.defaultBlock></circle>

    <g v-for="(lines, index) in startEndPoint(dataset.dubois.paragraphData)">
        <g v-if="index+1 <= getProgress">
          <!--arc-->
          <path :d="calcArc(lines, index)" :stroke="styles.color.defaultBlock" stroke-width="5" fill-opacity="0"></path>
          <!--chapter block-->
          <circle :cx="styles.line.x" :cy="lines.y2" :r="styles.chapterBlock.r" :fill=styles.color.defaultBlock></circle>
        </g>
        <g v-else-if="index <= getProgress">
          <!--chapter block-->
          <circle :cx="styles.line.x" :cy="lines.y2" :r="styles.chapterBlock.r" :fill=styles.color.gray></circle>
        </g>
        <g v-if="index <= getProgress">
            <g v-for="i in lines.blocks">
                <g v-if="index + i/10 <= getProgress">
                    <!--partial colored arc-->
                    <path v-if="index == parseInt(getProgress)"
                        :d="calcColorArc(lines, index, i)" :stroke="styles.color.defaultBlock"
                        stroke-width="5" fill-opacity="0"></path>
                    <!--VIS blocks-->
                    <!--10: largest number of subparts in section-->
                    <g v-on:click="click = goto(index, i-1)"
                       @mouseover="hover = index*10 + i"
                       @mouseleave="hover = null">
                      <circle v-if="getVisIdx(index, i-1) == '1' "
                              :cx="blockcx(lines, index, i)" :cy="blockcy(lines, i)"
                              :r="styles.block.r" :fill=styles.color.secHeader></circle>
                      <circle v-if="getVisIdx(index, i-1) == '2' "
                              :cx="blockcx(lines, index, i)" :cy="blockcy(lines, i)"
                              :r="styles.block.r" :fill=styles.color.image></circle>
                      <circle v-if="getVisIdx(index, i-1) == '3' "
                              :cx="blockcx(lines, index, i)" :cy="blockcy(lines, i)"
                              :r="styles.block.r" :fill=styles.color.vis></circle>
                      <circle v-if="getVisIdx(index, i-1) == '4' "
                              :cx="blockcx(lines, index, i)" :cy="blockcy(lines, i)"
                              :r="styles.block.r" :fill=styles.color.text></circle>

                      <circle v-if="hover == index*10 + i  && getVisIdx(index, i-1) != '0'"
                              :cx="blockcx(lines, index, i)" :cy="blockcy(lines, i)"
                              :r="styles.block.r" :fill=styles.color.lightgray></circle>
                    </g>
                </g>
                <g v-else-if="index + i/10 <= (parseFloat(getProgress) + 0.1)">
                  <!--gray partial arc for progress-->
                  <path :d="calcGrayArc(lines, index, i)" :stroke="styles.color.gray"
                        stroke-width="5" stroke-dasharray="10" fill-opacity="0"></path>
                </g>
            </g>
        </g>
        <!--dotted gray parts-->
        <g v-if="index > getProgress">
          <!--arc-->
          <path :d="calcArc(lines, index)" :stroke="styles.color.gray" stroke-width="5" stroke-dasharray="10" fill-opacity="0"></path>
          <!--chapter block-->
          <circle :cx="styles.line.x" :cy="lines.y2" :r="styles.chapterBlock.r" :fill=styles.color.gray></circle>
        </g>
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
      start: 292
    },
    chapterBlock: {
      r: 20
    },
    block: {
      r: 15,
      gap: 30,
      gapR: 15,
      marginR: 30,
      verGap: 50, //chapterBlock/2 + margin
    },
    color: {
      defaultBlock: "#b49581",
      gray: "#9B9B9B",
      secHeader:"#c8a59f",
      image: "#6275a2",
      text: "#f4c443",
      vis: "#761e0e",
      lightgray: "#dddddd"
    }
  },
  vertical: true, // how to orient the navline
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
    getProgress() {
        return this.$store.getters.prog_dub;
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
              let end = lines * this.styles.block.r
                  + (lines - 1) * this.styles.block.gap + this.styles.block.verGap * 2 + start;
              arr.push({
                  y1: start,
                  y2: end,
                  cy: start + (end - start)/2, //center of the arc
                  deltaTh: (180 - 2*this.styles.block.gapR)/lines,
                  R: (end - start)/2,
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
          let Cx = this.styles.line.x;
          let theta = 90 - (this.styles.block.gapR + (i-1)*lines.deltaTh + lines.deltaTh/2);
          if (index % 2 == 0) {
              return Cx + (lines.R - this.styles.block.marginR) * Math.cos(theta * Math.PI / 180);
          } else {
              return Cx - (lines.R - this.styles.block.marginR) * Math.cos(theta * Math.PI / 180);
          }
      },
      blockcy: function (lines, i) {
          let Cy = lines.cy;
          let theta = 90 - (this.styles.block.gapR + (i-1)*lines.deltaTh + lines.deltaTh/2);
          return Cy - (lines.R - this.styles.block.marginR) * Math.sin(theta * Math.PI / 180);
      },
      calcGrayArc: function (lines, index, i) {
          let left = (index+1) % 2;
          let Cx = this.styles.line.x;
          let Cy = lines.cy;
          let theta = 90 - (this.styles.block.gapR + (i-2)*lines.deltaTh + lines.deltaTh/2);
          let x;
          let dx = lines.R * Math.cos(theta * Math.PI / 180);
          if (index % 2 == 0) {
              x = Cx + dx;
          } else {
              x = Cx - dx;
          }
          let y = Cy - lines.R * Math.sin(theta * Math.PI / 180);
          let d = [
              "M", x, y,
              "A", lines.R, lines.R, 0, 0, left, this.styles.line.x, lines.y2
          ].join(" ");
          return d;
      },
      calcColorArc: function (lines, index, i) {
          let left = (index+1) % 2;
          let Cx = this.styles.line.x;
          let Cy = lines.cy;
          let theta = 90 - (this.styles.block.gapR + (i-1)*lines.deltaTh + lines.deltaTh/2);
          let x;
          if (index % 2 == 0) {
              x = Cx + lines.R * Math.cos(theta * Math.PI / 180);
          } else {
              x = Cx - lines.R * Math.cos(theta * Math.PI / 180);
          }
          let y = Cy - lines.R * Math.sin(theta * Math.PI / 180);
          let d = [
              "M", this.styles.line.x, lines.y1,
              "A", lines.R, lines.R, 0, 0, left, x, y
          ].join(" ");
          return d;
      },
      goto: function (index, i) {
          let idname = "part" + index + "." + i;
          this.$store.commit(ch_mut.SET_IDNAME, { id: idname });
      },
      getVisIdx (i, j) {
          return this.dataset.dubois.vis[i][j];
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
  .heavy { font: bold 70px "DIN Alternate"; fill:#4A4A4A }
  .number { font: bold 50px "DIN Alternate"}
  .small { font: bold 28px "DIN Alternate"; fill:#4A4A4A }
</style>
