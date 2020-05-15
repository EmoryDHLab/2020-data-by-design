<template lang="html">
  <svg width="3309" height="2523" viewBox="70 100 600 2500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="250" y="210" class="heavy">Progress</text>
    <!--LEGENDS-->
    <path fill-rule="evenodd" clip-rule="evenodd" d="M270 2091H305V2126H270V2091Z" :fill=styles.color.defaultBlock />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M480 2091H515V2126H480V2091Z" :fill=styles.color.image />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M270 2148H305V2183H270V2148Z" :fill=styles.color.intVis />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M480 2148H515V2183H480V2148Z" :fill=styles.color.stcVis />
    <text x="340" y="2050" class="number" fill="#4A4A4A">LEGENDS</text>
    <text x="320" y="2120" class="small">Highlights</text>
    <text x="520" y="2120" class="small">Images</text>
    <text x="520" y="2175" class="small">Static Vis.</text>
    <text x="320" y="2175" class="small">Interaction</text>

    <!--Lines, ChapterBlocks, Numbers, Notes Init-->
    <rect :x="styles.line.left - styles.chapterBlock.width/2" :y="styles.line.start- styles.chapterBlock.width/2"
          :width="styles.chapterBlock.width" :height="styles.chapterBlock.width" :fill=styles.color.defaultBlock></rect>
    <text x="300" :y="styles.line.start + 15" class="number" fill="#4A4A4A">1</text>


    <g v-for="(lines, index) in startEndPoint(dataset.peabody.paragraphData)">
        <g v-if="index+1 <= getProgress">
          <!--Vertical Line-->
          <line :x1="lines.x1" :y1="lines.y1" :x2="lines.x2" :y2="lines.y2" style="stroke:#D9B89A; stroke-width:5; stroke-linecap:round"></line>
          <!--Horizontal Line-->
          <line :x1="373" :y1="lines.y2" x2="510" :y2="lines.y2" style="stroke:#D9B89A; stroke-width:5; stroke-linecap:round"></line>
          <!--chapter block-->
          <rect :x="styles.line.left - styles.chapterBlock.width/2" :y="lines.y2 - styles.chapterBlock.width/2"
                :width="styles.chapterBlock.width" :height="styles.chapterBlock.width" :fill=styles.color.defaultBlock></rect>
          <!--paragraph number-->
          <text x="300" :y="lines.y2 + 15" class="number" fill="#4A4A4A">{{index + 2}}</text>
        </g>
        <g v-else-if="index <= getProgress">
          <!--Vertical Line-->
          <line :x1="lines.x1" :y1="lines.y1" :x2="lines.x2" :y2="lines.y2" style="stroke:#D9B89A; stroke-width:5; stroke-linecap:round"></line>
          <!--Horizontal Line-->
          <line :x1="373" :y1="lines.y2" x2="510" :y2="lines.y2" style="stroke:#9B9B9B; stroke-width:5; stroke-linecap:round"></line>
          <!--chapter block-->
          <rect :x="styles.line.left - styles.chapterBlock.width/2" :y="lines.y2 - styles.chapterBlock.width/2"
                :width="styles.chapterBlock.width" :height="styles.chapterBlock.width" :fill=styles.color.gray></rect>
          <!--paragraph number-->
          <text x="300" :y="lines.y2 + 15" :fill=styles.color.gray class="number">{{index + 2}}</text>
        </g>
        <g v-if="index <= getProgress">
            <g v-for="i in lines.blocks">
                <g v-if="index + i/10 <= getProgress">
                    <!--Notes Init-->
                    <!--(i-1) because v-for index start with 1 instead of 0-->
                    <rect v-on:click="click = goto(index, i-1)"
                          x="455"
                          :y="lines.y1 + styles.block.verGap + (i-1)*(styles.block.gap + styles.block.width)"
                          :width="styles.block.width" :height="styles.block.width"
                          :fill=styles.color.defaultBlock
                          :fill-opacity= dataset.peabody.highlights[index][i-1] ></rect>
                    <!--VIS-->
                    <!--10: largest number of subparts in section-->
                    <g v-on:click="click = goto(index, i-1)"
                       @mouseover="hover = index*10 + i"
                       @mouseleave="hover = null">
                      <rect v-if="dataset.peabody.vis[index][i-1] == '1' "
                            x="406"
                            :y="lines.y1 + styles.block.verGap + (i-1)*(styles.block.gap + styles.block.width)"
                            :width="styles.block.width" :height="styles.block.width"
                            :fill=styles.color.image ></rect>
                      <rect v-if="dataset.peabody.vis[index][i-1] == '2' "
                            x="406"
                            :y="lines.y1 + styles.block.verGap + (i-1)*(styles.block.gap + styles.block.width)"
                            :width="styles.block.width" :height="styles.block.width"
                            :fill=styles.color.intVis ></rect>
                      <rect v-if="dataset.peabody.vis[index][i-1] == '3' "
                            x="406"
                            :y="lines.y1 + styles.block.verGap + (i-1)*(styles.block.gap + styles.block.width)"
                            :width="styles.block.width" :height="styles.block.width"
                            :fill=styles.color.stcVis ></rect>

                      <rect v-if="hover == index*10 + i  && dataset.peabody.vis[index][i-1] != '0'"
                            x="406"
                            :y="lines.y1 + styles.block.verGap + (i-1)*(styles.block.gap + styles.block.width)"
                            :width="styles.block.width" :height="styles.block.width"
                            :fill=styles.color.lightgray ></rect>
                    </g>
                </g>
                <g v-else>
                  <!--gray line for progress-->
                  <line :x1="lines.x1" :y1="lines.y1+ (i-1)*(styles.block.gap + styles.block.width)"
                        :x2="lines.x2" :y2="lines.y1 + styles.block.verGap*2 + (i-1)*(styles.block.gap + styles.block.width) + styles.block.width"
                        style="stroke:#9B9B9B; stroke-width:5; stroke-linecap:round"></line>
                </g>
            </g>
        </g>
        <g v-if="index > getProgress">
          <!--Vertical Line-->
          <line :x1="lines.x1" :y1="lines.y1" :x2="lines.x2" :y2="lines.y2" style="stroke:#9B9B9B; stroke-width:5; stroke-linecap:round"></line>
          <!--Horizontal Line-->
          <line :x1="373" :y1="lines.y2" x2="510" :y2="lines.y2" style="stroke:#9B9B9B; stroke-width:5; stroke-linecap:round"></line>
          <!--chapter block-->
          <rect :x="styles.line.left - styles.chapterBlock.width/2" :y="lines.y2 - styles.chapterBlock.width/2"
                :width="styles.chapterBlock.width" :height="styles.chapterBlock.width" :fill=styles.color.gray></rect>
          <!--paragraph number-->
          <text x="300" :y="lines.y2 + 15" :fill=styles.color.gray class="number">{{index + 2}}</text>
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
import NavlineBucket from './NavlineBucket'
import ch_mut from '@/store/chapters/types'
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
      left: 373,
      right:510,
      start: 292
    },
    chapterBlock: {
      width: 40
    },
    block: {
      width: 32,
      gap: 22,
      margin: 18,
      verGap: 38//chapterBlock/2 + margin
    },
    color: {
      defaultBlock:"#D9B89A",
      gray: "#9B9B9B",
      image: "#577456",
      intVis: "#801201",
      stcVis: "#CA6E11",
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
  components: {
    NavlineBucket
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
    /**
     * get the internal width (width - margins on left and right) of the vis
     * @return {Number} the width of the navline without margins
     */
    innerWidth () {
      return this.styles.width - this.styles.margin.left - this.styles.margin.right
    },
    /**
     * get the internal height (height - margins on top and bottom) of the vis
     * @return {Number} the height of the navline without margins
     */
    innerHeight () {
      return this.styles.height - this.styles.margin.top - this.styles.margin.bottom
    },
    /**
     * calculate the margin transforation required to move the vis internal
     * content to respect the defined marigins
     * @return {Object} containing the transform attribute used in styling
     */
    marginTransform () {
      return { transform: 'translate('
        + this.styles.margin.left + 'px, '
        + this.styles.margin.top + 'px)' }
    },
    /**
     * Shift the axis to align it better
     * TODO make this non-magical
     */
    axisTransform () {
      return { transform: `translateX(-${5}px)` }
    },
    /**
     * Get the svg viewbox attribute using the given information in options
     */
    getViewBox () {
      return `0 0 ${this.styles.width} ${this.styles.height}`
    },
    /**
     * get the minimum position in the vis
     * @return {Number} the minimum position of the axis
     */
    startPoint () {
      if (!this.dataset.range) {
        return 0
      }
      return this.dataset.range[0]
    },
    /**
     * get the maximum position in the vis
     * @return {Number} the maximum position of the axis
     */
    endPoint () {
      if (!this.dataset.range) {
        return 0
      }
      return this.dataset.range[1]
    },
    /**
     * get the d3 scale used for positioning in the vis
     * @return {D3 Scale} the scale to be used for the visualization
     */
    getScale() {
      return d3.scaleLinear()
        .domain([this.startPoint, this.endPoint])
        .range([this.styles.margin.top, this.innerHeight]);
    },
    getProgress() {
        return this.$store.getters.prog_pea;
    }
  },
  methods: {
      /**
       * calculate line positions
       **/
      startEndPoint: function (paragraphData) {
          let start = this.styles.line.start;
          let x = this.styles.line.left;
          let arr = [];
          for (let i = 0; i < paragraphData.length; i++) {
              let lines = paragraphData[i];
              let end = lines * this.styles.block.width
                  + (lines - 1) * this.styles.block.gap + this.styles.block.verGap * 2 + start;
              arr.push({
                  x1: x,
                  y1: start,
                  x2: x,
                  y2: end,
                  blocks: lines,
              });
              start = end;
              x = (x === this.styles.line.left) ? this.styles.line.right : this.styles.line.left;
          }
          // console.log(arr)
          return arr;
      },
      goto: function (index, i) {
          let idname = "part" + index + "." + i;
          this.$store.commit(ch_mut.SET_IDNAME, { id: idname });
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
          ...evt,
          position: Math.floor(evt.position)
        }))
        .reduce((buckets, evt) => {
          if (!buckets[evt.position]) {
            buckets[evt.position] = { id: evt.position, events: [] }
          }
          buckets[evt.position].events.push(evt)
          return buckets
        }, {})
      return Object.values(data)
    },
    placeBucket (bucket) {
      // console.log(this.getScale(bucket.id));
      const dx = this.getScale(bucket.id) - (this.styles.timelineEvent.width / 2)
      const dy = this.innerHeight - (this.styles.timelineEvent.height + this.styles.timelineEvent.gap)
      return { transform: `translate(${0}px, ${dx}px)` }
    },
  },
  directives: {
    /**
     * allows us to use d3 axis on an element in a Vue approved way
     */
    axis(el, binding) {
      const axis = binding.arg; // :x or :y
      const axisMethod = { x: "axisBottom", y: "axisLeft" }[axis];
      const methodArg = binding.value;
      // console.log(d3[axisMethod]);
      d3.select(el).call(d3[axisMethod](methodArg).tickFormat(d3.format("d")));
    }
  }
}
</script>

<style scoped>
  .heavy { font: bold 70px Baskerville; fill:#4A4A4A }
  .number { font: bold 50px Baskerville}
  .small { font: bold 28px Baskerville; fill:#4A4A4A }
</style>
