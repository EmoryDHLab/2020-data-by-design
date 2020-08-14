<template lang="html">
  <svg :id="id" :width='width' :height='height' :viewBox='getViewBox'>
    <g :style='marginTransform'>
      <g class='timeline-buckets'>
        <timeline-bucket
          v-for='timelineBucket in formattedData'
          :options="options"
          :key='timelineBucket.id'
          :bucketId='timelineBucket.id'
          :dataset='timelineBucket.events'
          :style='placeBucket(timelineBucket.id)'/>
      </g>
      <rect class="hover-year" v-for="i in 100"
            :class="{'highlighted': Math.floor(highlighted) == i}"
            @mouseover="$emit('hover', i)"
            :style="placeBucket(i + startPoint - 1)"
            :y="(options.styles.timelineEvent.height * -4) + options.styles.timelineEvent.gap * -3"
            :width="options.styles.timelineEvent.width"
            :height="(options.styles.timelineEvent.height + options.styles.timelineEvent.gap) * 9">
      </rect>
      <g v-show='options.showTicks' class='axis' :style='axisTransform' v-axis:x='getScale'></g>
    </g>
  </svg>
</template>

<script>
import Visualization from '@/mixins/vis/Visualization'
import TimelineBucket from './TimelineBucket'
import {actorColors} from "../../../helpers/PeabodyUtils";
import * as d3 from 'd3'

const DEFAULT_OPTIONS = {
  styles: {
    width: 500,
    height: 50,
    margin: {
      top: 10,
      left: 10,
      bottom: 10,
      right: 10
    },
    timelineEvent: {
      width: 5,
      height: 5,
      gap: 1
    },
  },
  showTicks: true,
  getPosition: (event) => event.year,
  getColor: (event) => event.actors.map(actor => actorColors[actor])
}
export default {
  components: {
    TimelineBucket
  },
  mixins: [Visualization()],
  props: {
    height: String,
    mutableDataset: String,
    staticDataset: String,
    id: String,
    highlighted: Number,
    options: {
      type: Object,
      required: false,
      default: () => DEFAULT_OPTIONS
    }
  },
  computed: {
    formattedData() {
      return this.dataFormatter(this.data)
    },
    styles ()  {
      return this.options.styles;
    },
    innerWidth () {
      return this.styles.width - this.styles.margin.left - this.styles.margin.right
    },
    innerHeight () {
      return this.styles.height - this.styles.margin.top - this.styles.margin.bottom
    },
    marginTransform () {
      return { transform: 'translate('
        + this.styles.margin.left + 'px, '
        + this.styles.margin.top + 'px)' }
    },
    axisTransform () {
      return { transform: 'translateY(' + (this.innerHeight) + 'px)'}
    },
    getViewBox () {
      return '0 0 ' + (this.styles.width + this.styles.margin.left) + ' ' + this.styles.height
    },
    startPoint () {
      if (this.formattedData)
        return Math.round(this.formattedData[0].id / 100) * 100 + 1;
        // return Math.min(...this.formattedData.map(bucket => bucket.id))
    },
    endPoint () {
      if (this.formattedData)
        return Math.round(this.formattedData[this.formattedData.length - 1].id / 100) * 100;
        // return Math.max(...this.formattedData.map(bucket => bucket.id))
    },
    getScale() {
      return d3.scaleLinear()
        .domain([this.startPoint, this.endPoint])
        .range([this.styles.margin.left, this.innerWidth]);
    }
  },
  methods: {
    dataFormatter (d) {
      if (d && Array.isArray(d) && d.length > 0) {
        const data = d
          .map(evt => ({
            position: this.options.getPosition(evt),
            color: this.options.getColor(evt),
            ...evt
          }))
          .reduce((buckets, evt) => {
            if (!buckets[evt.position]) {
              buckets[evt.position] = {id: evt.position, events: []}
            }
            const squares = (evt.squares === "full") ? [1,2,3,4,5,6,7,8,9] : evt.squares;
            squares.forEach(square => buckets[evt.position].events.push(evt));
            return buckets
          }, {})
        return Object.values(data);
      }
    },
    placeBucket (year) {
      // console.log(this.getScale(bucket.id));
      return {transform: 'translateX('
        + (this.getScale(year))
        + 'px)'}
        // // + (this.innerHeight - (this.styles.timelineEvent.height + this.styles.timelineEvent.gap))
        // + 'px)'}
    },
  },
  directives: {
    axis(el, binding) {
      const axis = binding.arg; // :x or :y
      const axisMethod = { x: "axisBottom", y: "axisLeft" }[axis];
      const methodArg = binding.value;
      // console.log(d3[axisMethod]);
      d3.select(el).call(d3.axisBottom(methodArg).tickFormat(d3.format("d")));
    }
  }
}
</script>

<style scoped>
  .hover-year {
    fill-opacity: 0
  }
  .hover-year:hover, .hover-year.highlighted {
    fill-opacity: 0.1;
    stroke-width: 1;
    stroke: gold
  }
</style>
