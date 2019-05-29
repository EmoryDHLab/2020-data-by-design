<template lang="html">
  <svg
    :width="styles.width + styles.margin.left + styles.margin.right + 'px'"
    :height="styles.height + styles.margin.top + styles.margin.bottom + 'px'">
    <g :transform="`translate(${styles.margin.left}, ${styles.margin.top})`">
      <rect id="timeline"
        x='0' :y='(styles.height - styles.line.height)/2'
        :height="styles.line.height"
        :width="styles.line.width"
        fill="#989898"
        rx="6px" ry="6px"></rect>
      <g v-for="yearPoints in groupedByYear"
        :style="positionYear(yearPoints)">
        <text
          v-if="yearPoints.year % 2 == 0"
          transform="rotate(45), translate(-40, 0)"
          style="font-size:14px">{{yearPoints.year}}</text>
        <text
          v-if="yearPoints.year % 2 != 0"
          :transform="`rotate(-45),
            translate(-${(55 + scaleY(yearPoints.count)) * 0.7071},
            ${(scaleY(yearPoints.count) + 15) * 0.7071})`"
          style="font-size:14px">{{yearPoints.year}}</text>
        <rect
          @mouseenter="$emit('focus-image', yearPoints.points[0].id)"
          :width="styles.line.height"
          :height="scaleY(yearPoints.count)"
          fill="#4A90E2"
          :rx="styles.line.height/2" :ry="styles.line.height/2"></rect>
      </g>
    </g>
  </svg>
</template>

<script>
import MetaVisualization from "@/mixins/vis/MetaVisualization"

const max = function (arr) {
  return arr.reduce((currMax, curr) => {
    return ((curr > currMax || currMax === undefined) ? curr : currMax)
  }, undefined)
}

const min = function (arr) {
  return arr.reduce((currMin, curr) => {
    return ((curr < currMin || currMin === undefined) ? curr : currMin)
  }, undefined)
}

const DEFAULT_OPTIONS = {
  styles: {
    height: 200,
    width: 1000,
    margin: {
      top: 50,
      right: 50,
      bottom: 50,
      left: 50,
    },
    line: {
      width: 1000,
      height: 10,
    }
  }
}

export default {
  mixins: [MetaVisualization],
  props: {
    options: {
      type: Object,
      required: false,
      default: () => DEFAULT_OPTIONS
    }
  },
  computed: {
    earliestDate () {
      let years = this.formattedData
        .map(point => point.year)
      return min(years)
    },
    latestDate () {
      let years = this.formattedData
        .map(point => point.year)
      return max(years)
    },
    groupedByYear() {
      const groupObject = this.formattedData.reduce((counts, point) => {
        if (counts[point.year] === undefined) {
          counts[point.year] = []
        }
        counts[point.year].push(point);
        return counts
      }, {})
      return Object.entries(groupObject).map(([year, points]) => ({
        year: parseInt(year),
        points,
        count: points.length
      }))
    },
    maxPicCount () {
      return max(this.groupedByYear.map(points => points.count))
    },
    minPicCount () {
      return min(this.groupedByYear.map(points => points.count))
    },
    scaleX () {
      const minYear = this.earliestDate;
      let dateRange = this.latestDate - this.earliestDate  + 1;
      if (dateRange == 0) return this.styles.line.width / 2
      return (year) => (year - minYear) * this.styles.line.width / (dateRange)
    },
    scaleY () {
      const minCount = this.minPicCount;
      const picRange = this.maxPicCount - this.minPicCount;
      console.log(picRange);
      return (count) => {
        let sz = (count - minCount) * (this.styles.height) / (picRange + 1)
        if (sz <= 0) {
          sz = 2 * this.styles.line.height
        }
        return sz
      }
    }
  },
  methods: {
    dataFormatter (d) {
      return Object.values(d)
    },
    positionYear (yearPoints) {
      const dx = this.scaleX(yearPoints.year) - this.styles.line.height/2
      const dy = (this.styles.height - this.scaleY(yearPoints.count))/2
      return `transform: translate(${dx}px, ${dy}px);`
    },
  }
}
</script>

<style lang="css" scoped>
</style>
