<template lang="html">
  <svg :width='width' :height='height' :viewBox='getViewBox'>
    <g :style='marginTransform'>
      <g class='timeline-buckets'>
        <timeline-bucket
          v-for='timelineBucket in formattedData'
          :key='timelineBucket.id'
          :bucketId='timelineBucket.id'
          :dataset='timelineBucket.events'
          :style='placeBucket(timelineBucket)'
          :config='config'/>
      </g>
      <g v-show='config.showTicks' class='axis' :style='axisTransform' v-axis:x='getScale'></g>
    </g>
  </svg>
</template>

<script>
import TimelineBucket from './TimelineBucket'
import * as d3 from 'd3'
export default {
  components: {
    TimelineBucket
  },
  props: {
    width: String,
    height: String,
    dataset: Object
  },
  data () {
    return {
      config: {
        width: 500,
        height: 50,
        margin: {
          top: 10,
          left: 10,
          bottom: 10,
          right: 10
        },
        showTicks: true,
        timelineEvent: {
          width: 5,
          height: 5,
          gap: 1
        },
        getPosition: (event) => event.year,
        getColor: (event) => event.color
      },
      scale: () => {}
    }
  },
  computed: {
    formattedData () {
      const data = Object.values(this.dataset)
        .map(evt => ({
          position: this.config.getPosition(evt),
          color: this.config.getColor(evt),
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
    innerWidth () {
      return this.config.width - this.config.margin.left - this.config.margin.right
    },
    innerHeight () {
      return this.config.height - this.config.margin.top - this.config.margin.bottom
    },
    marginTransform () {
      return { transform: 'translate('
        + this.config.margin.left + 'px, '
        + this.config.margin.top + 'px)' }
    },
    axisTransform () {
      return { transform: 'translateY(' + (this.innerHeight) + 'px)'}
    },
    getViewBox () {
      return '0 0 ' + this.config.width + ' ' + this.config.height
    },
    startPoint () {
      return Math.min(...this.formattedData.map(bucket => bucket.id))
    },
    endPoint () {
      return Math.max(...this.formattedData.map(bucket => bucket.id))
    },
    getScale() {
      return d3.scaleLinear()
        .domain([this.startPoint, this.endPoint])
        .range([this.config.margin.left, this.innerWidth]);
    }
  },
  methods: {
    placeBucket (bucket) {
      // console.log(this.getScale(bucket.id));
      return {transform: 'translate('
        + (this.getScale(bucket.id) - (this.config.timelineEvent.width / 2))
        + 'px, '
        + (this.innerHeight - (this.config.timelineEvent.height + this.config.timelineEvent.gap))
        + 'px)'}
    }
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

<style lang="css">
</style>
