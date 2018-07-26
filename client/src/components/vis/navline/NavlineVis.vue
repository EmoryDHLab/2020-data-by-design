<template lang="html">
  <svg :id="id" :width='width' :height='height' :viewBox='getViewBox'>
    <g :style='marginTransform'>
      <g class='timeline-buckets'>
        <navline-bucket
          v-for='timelineBucket in formattedData'
          :key='timelineBucket.id'
          :bucketId='timelineBucket.id'
          :dataset='timelineBucket.events'
          :style='placeBucket(timelineBucket)'/>
      </g>
      <g v-show='options.showTicks' class='axis' :style='axisTransform' v-axis:y='getScale'></g>
    </g>
  </svg>
</template>

<script>
import MetaVisualization from '@/mixins/vis/MetaVisualization'
import NavlineBucket from './NavlineBucket'
import * as d3 from 'd3'

const DEFAULT_OPTIONS = {
  styles: {
    width: 50,
    height: 500,
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
  vertical: true,
  showTicks: true
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
    formattedData () {
      return this.dataFormatter(this.dataset.data || {})
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
      return { transform: `translateX(-${5}px)` }
    },
    getViewBox () {
      return `0 0 ${this.styles.width} ${this.styles.height}`
    },
    startPoint () {
      if (!this.dataset.range) {
        return 0
      }
      return this.dataset.range[0]
    },
    endPoint () {
      if (!this.dataset.range) {
        return 0
      }
      return this.dataset.range[1]
    },
    getScale() {
      return d3.scaleLinear()
        .domain([this.startPoint, this.endPoint])
        .range([this.styles.margin.top, this.innerHeight]);
    }
  },
  methods: {
    dataFormatter (d) {
      const data = Object.values(d)
        .map(evt => ({
          color: "black",
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
  svg {
  }
</style>
