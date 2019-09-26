<template lang="html">
  <svg
    :width="styles.width + styles.margin.left + styles.margin.right + 'px'"
    :height="styles.height + styles.margin.top + styles.margin.bottom + 'px'">
    <g :transform="`translate(${styles.margin.left}, ${styles.margin.top})`">

      <!--gray bar-->
      <rect id="timeline"
        x='0' :y='(styles.height - styles.line.height)/2'
        :height="styles.line.height"
        :width="styles.line.width"
        fill="#989898"
        rx="6px" ry="6px"></rect>

      <g v-for="yearPoints in groupedByYear"
         :style = positionYear(yearPoints)>
        <!--blue bars-->
        <rect
                @mouseenter="$emit('focus-image', yearPoints.points[0].id)"
                :width="styles.line.height"
                :height="scaleY(yearPoints.count)"
                fill="#4A90E2"
                :rx="styles.line.height/2" :ry="styles.line.height/2"></rect>

        <!--year text-->
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
      </g>

      <g v-for="point in dataset" :style = positionPointX(point)>
        <!--frames-->
        <g v-if="point.year % 2 == 0"
           :transform="`translate(${-22},${(styles.height+styles.margin.top + styles.margin.bottom + styles.framepadding)/2})
          ,scale(0.008,-0.008)`"
           fill="#989898" stroke="white" stroke-width="50">
          <path d="M3212 5793 c-18 -9 -44 -28 -57 -42 -12 -14 -61 -69 -106 -121 -46
-52 -86 -97 -89 -100 -3 -3 -34 -39 -70 -80 -36 -41 -85 -96 -109 -122 l-44
-48 -928 -2 -929 -3 -27 -28 -28 -27 0 -1410 0 -1410 28 -27 27 -28 2450 0
2450 0 27 28 28 27 0 1410 0 1410 -28 27 -27 28 -959 3 -958 2 -44 48 c-24 26
-73 81 -109 122 -36 41 -67 77 -70 80 -3 3 -43 48 -89 100 -45 52 -94 107
-107 121 -51 57 -161 77 -232 42z"/>
        </g>

        <g v-if="point.year % 2 != 0"
           :transform="`translate(${22},${(styles.margin.top + styles.margin.bottom - styles.framepadding)/2})
          ,scale(0.008,-0.008), rotate(180)`"
           fill="#989898" stroke="white" stroke-width="50">
          <path d="M3212 5793 c-18 -9 -44 -28 -57 -42 -12 -14 -61 -69 -106 -121 -46
-52 -86 -97 -89 -100 -3 -3 -34 -39 -70 -80 -36 -41 -85 -96 -109 -122 l-44
-48 -928 -2 -929 -3 -27 -28 -28 -27 0 -1410 0 -1410 28 -27 27 -28 2450 0
2450 0 27 28 28 27 0 1410 0 1410 -28 27 -27 28 -959 3 -958 2 -44 48 c-24 26
-73 81 -109 122 -36 41 -67 77 -70 80 -3 3 -43 48 -89 100 -45 52 -94 107
-107 121 -51 57 -161 77 -232 42z"/>
        </g>

        <!--images-->
        <g :style="`transform: translate(-22,${(styles.height+styles.margin.top + styles.margin.bottom)/2}`">
          <image xlink:href="yearPoints.img" width="10%" height="10%"/>
        </g>

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
    framepadding: 10,
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
    positionYearX (yearPoints) {
      const dx = this.scaleX(yearPoints.year) - this.styles.line.height/2
      return dx
    },
    positionYearY (yearPoints) {
      const dy = (this.styles.height - this.scaleY(yearPoints.count))/2
      return dy
    },
    positionPointX (point) {
        const dx = this.scaleX(point.year) - this.styles.line.height/2
        return `transform: translate(${dx}px, 0px);`
    }
  }
}
</script>

<style lang="css" scoped>
</style>
