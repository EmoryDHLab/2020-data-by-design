<template lang="html">
  <svg
    :width="width + margin.left + margin.right + 'px'"
    :height="height + margin.top + margin.bottom + 'px'">
    <g :transform="`translate(${margin.left}, ${margin.top})`">
      <rect id="timeline"
      x='0' :y='(height - line.height)/2'
      :height="line.height"
      :width="line.width"
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
        :width="line.height"
        :height="scaleY(yearPoints.count)"
        fill="#4A90E2"
        :rx="line.height/2" :ry="line.height/2"></rect>
      </g>
    </g>
  </svg>
</template>

<script>

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

export default {
  props: {
    points: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    height: 200,
    width: 1000,
    margin: {
      top:50,
      right:50,
      bottom:50,
      left:50,
    },
    line: {
      width: 1000,
      height: 10,
    }
  }),
  computed: {
    earliestDate () {
      let years = this.points
        .map(point => point.year)
      return min(years)
    },
    latestDate () {
      let years = this.points
        .map(point => point.year)
      return max(years)
    },
    groupedByYear() {
      const groupObject = this.points.reduce((counts, point) => {
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
      if (dateRange == 0) return this.line.width / 2
      return (year) => (year - minYear) * this.line.width / (dateRange)
    },
    scaleY () {
      const minCount = this.minPicCount;
      const picRange = this.maxPicCount - this.minPicCount;
      console.log(picRange);
      return (count) => {
        let sz = (count - minCount) * (this.height) / (picRange + 1)
        if (sz <= 0) {
          sz = 2 * this.line.height
        }
        return sz
      }
    }
  },
  methods: {
    positionYear (yearPoints) {
      const dx = this.scaleX(yearPoints.year) - this.line.height/2
      const dy = (this.height - this.scaleY(yearPoints.count))/2
      return `transform: translate(${dx}px, ${dy}px);`
    },
  }
}
</script>

<style lang="css" scoped>
</style>
