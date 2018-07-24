<template lang="html">
  <svg :width='width' :height='height' :viewBox='getViewBox'>
    <g :style='marginTransform'>
      <g class='timeline-buckets'>
        <timeline-bucket
          v-for='timelineBucket in formattedData'
          :key='timelineBucket.id'
          :bucketId='timelineBucket.id'
          :dataset='timelineBucket.events'
          :style='placeBucket(timelineBucket)'/>
      </g>
      <g v-show='options.showTicks' class='axis' :style='axisTransform' v-axis:x='getScale'></g>
    </g>
  </svg>
</template>

<script>
import MetaVisualization from '@/mixins/vis/MetaVisualization'
import TimelineBucket from './TimelineBucket'
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
  showTicks: true
}
export default {
  components: {
    TimelineBucket
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
      return this.dataFormatter(this.dataset) || {range:[0,10], data: {}}
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
      return '0 0 ' + this.styles.width + ' ' + this.styles.height
    },
    startPoint () {
      return this.dataset.startPoint
    },
    endPoint () {
      return this.dataset.endPoint
    },
    getScale() {
      return d3.scaleLinear()
        .domain([this.startPoint, this.endPoint])
        .range([this.styles.margin.left, this.innerWidth]);
    }
  },
  methods: {
    dataFormatter (d) {
      const data = Object.values(d.data)
        .map(evt => ({
          color: "black",
          ...evt
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
      return {transform: 'translate('
        + (this.getScale(bucket.id) - (this.styles.timelineEvent.width / 2))
        + 'px, '
        + (this.innerHeight - (this.styles.timelineEvent.height + this.styles.timelineEvent.gap))
        + 'px)'}
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
  svg {
    transform: rotateX(90);
  }
</style>
