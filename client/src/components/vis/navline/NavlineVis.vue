<template lang="html">
    <!--<g :style='marginTransform'>-->
      <!--<g class='timeline-buckets'>-->
        <!--<navline-bucket-->
          <!--v-for='timelineBucket in formattedData'-->
          <!--:key='timelineBucket.id'-->
          <!--:bucketId='timelineBucket.id'-->
          <!--:dataset='timelineBucket.events'-->
          <!--:style='placeBucket(timelineBucket)'/>-->
      <!--</g>-->
      <!--<g v-show='options.showTicks' class='axis' :style='axisTransform' v-axis:y='getScale'></g>-->
    <!--</g>-->
  <svg width="3309" height="2523" viewBox="70 100 600 2500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="250" y="210" class="heavy">Progress</text>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M270 2091H305V2126H270V2091Z" fill="#D9B89A"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M480 2091H515V2126H480V2091Z" fill="#577456"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M270 2148H305V2183H270V2148Z" fill="#801201"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M480 2148H515V2183H480V2148Z" fill="#CA6E11"/>
    <text x="340" y="2050" class="number">LEGENDS</text>
    <text x="320" y="2120" class="small">Highlights</text>
    <text x="520" y="2120" class="small">Images</text>
    <text x="520" y="2175" class="small">Static Vis.</text>
    <text x="320" y="2175" class="small">Interaction</text>
    <rect x="406" y="329" width="32" height="32" fill="#CA6E11"/>
    <rect x="455" y="329" width="32" height="32" fill="#D9B89A" fill-opacity="0.8"/>
    <rect x="455" y="383" width="32" height="32" fill="#D9B89A" fill-opacity="0.5"/>
    <rect x="406" y="437" width="32" height="32" fill="#577456"/>
    <rect width="32" height="32" transform="matrix(-1 0 0 1 438 545)" fill="#CA6E11"/>
    <rect width="32" height="32" transform="matrix(-1 0 0 1 438 710)" fill="#801201"/>
    <rect width="32" height="32" transform="matrix(-1 0 0 1 487 545)" fill="#D9B89A" fill-opacity="0.3"/>
    <rect width="32" height="32" transform="matrix(-1 0 0 1 487 599)" fill="#D9B89A" fill-opacity="0.75"/>
    <rect width="32" height="32" transform="matrix(-1 0 0 1 487 710)" fill="#D9B89A" fill-opacity="0.45"/>
    <rect width="32" height="32" transform="matrix(-1 0 0 1 438 653)" fill="#577456"/>
    <rect width="32" height="32" transform="matrix(-1 0 0 1 438 764)" fill="#577456"/>
    <path d="M373 287V512.82H509.79V862.246H376.931V1443.87H507.366V1684.89H376.931V1947.53H520.35" stroke="#D9B89A" stroke-width="5" stroke-linecap="round"/>
    <g>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M353 271H394V312H353V271Z" fill="#D9B89A"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M353 493H394V534H353V493Z" fill="#D9B89A"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M353 842H394V883H353V842Z" fill="#D9B89A"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M357 1421H398V1462H357V1421Z" fill="#9B9B9B"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M357 1661H398V1702H357V1661Z" fill="#9B9B9B"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M357 1928H398V1969H357V1928Z" fill="#9B9B9B"/>
    </g>
    <text x="300" y="310" class="number">1</text>
    <text x="300" y="530" class="number">2</text>
    <text x="300" y="880" class="number">3</text>
    <text x="300" y="1460" class="number">4</text>
    <text x="300" y="1700" class="number">5</text>
    <text x="300" y="1970" class="number">6</text>
    <defs>
      <filter id="filter0_d" x="349" y="269" width="49" height="49" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
        <feOffset dy="2"/>
        <feGaussianBlur stdDeviation="2"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.607892 0 0 0 0 0.607803 0 0 0 0 0.607923 0 0 0 1 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
      </filter>
    </defs>
  </svg>

</template>

<script>
/**
 * This component is a metavisualization which visualizes chapter content by
 * It shares a lot of code with the the timeline vis
 */

import MetaVisualization from '@/mixins/vis/MetaVisualization'
import NavlineBucket from './NavlineBucket'
import * as d3 from 'd3'

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
  },
  vertical: true, // how to orient the navline
  showTicks: true // whether to show the axis ticks
}
export default {
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
    }
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
    }
  },
  methods: {
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
      console.log(this.getScale(bucket.id));
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
  .number { font: bold 50px Baskerville; fill:#4A4A4A }
  .small { font: bold 28px Baskerville; fill:#4A4A4A }
</style>
