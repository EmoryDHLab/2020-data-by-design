<template>
  <div>
    <svg :id="id"
         :width='width'
         :height='height'
         :viewBox='getViewBox'>
      <rect class='bg' :width='getSVGWidth' :height='getSVGWidth'/>
      <g :style='translateCentury'>
        <year-square
          v-for='n in 100'
          :showSquares='showSquares'
          :key='n-1'
          :sizes="options.sizes"
          :actorColors="actorColors"
          :class='`year-square-${n}`'
          :style='translateYear(n)'
          :yearData='getYearData(n - 1)'
          :year='getYear(n - 1)'/>
      </g>
    </svg>
  </div>

</template>

<script>
import YearSquare from '@/components/vis/peabody/newpeabodygrid/YearSquare'
import Visualization from '@/mixins/vis/Visualization'
import { actorColors, dataToYears } from "../../../../helpers/PeabodyUtils";

const DEFAULT_OPTIONS = {
  sizes: {
    line: {
      sm: 1,
      md: 2,
      lg: 20
    },
    rect: 16
  }
}

  export default {
    props: {
      width: String,
      height: String,
      id: String,
      options: { // styles and other internal visualization stuff
        type: Object,
        required: false,
      default: () => DEFAULT_OPTIONS
    },
    staticDataset: {
      type: String
    },
    mutableDataset: {
      type: String
    },
    dynamicStartYear: {
      type: Boolean,
      default: false
    },
    showSquares: {
      type: Boolean,
      default: true
    },
    actorColors: {
      type: Object,
      default () {
        return actorColors;
      }
    }
  },
  mixins: [Visualization({ notebookName: "PeabodyGrid" })],
  components: {
    'year-square': YearSquare
  },
  computed: {
    // mutableId() {
    //   if (this.mutable) {
    //     return this.id;
    //   }
    // },
    // formattedData() {
    //   return this.dataFormatter(this.data)
    // },
    sizes () {
      return this.options.sizes
    },
    evtWidth () {
      return this.sizes.rect + this.sizes.line.sm
    },
    yearWidth () {
      return this.evtWidth * 3 + this.sizes.line.md - this.sizes.line.sm
    },
    years () {
      try {
        if (this.data && Array.isArray(this.data) && this.data.length > 0) {
          return dataToYears(this.data);
        }
      } catch (error) {
        console.error("Error in processing Peabody data", error)
      }
    },
    translateCentury () {
      return {
        'transform': 'translate('
        + this.sizes.line.lg + 'px,' + this.sizes.line.lg + 'px)'
      }
    },
    getSVGWidth () {
      return (this.sizes.rect * 30
        + this.sizes.line.sm * 20
        + this.sizes.line.md * 8
        + this.sizes.line.lg * 3).toString()
    },
    isEmpty () {
      if (this.years && typeof this.years === "object") {
        return Object.keys(this.years).length === 0
      }
      return true;
    },
    startYear () {
      if (this.isEmpty) return 0;
      return Math.min(...Object.keys(this.years))
    },
    getViewBox () {
      let width = this.getSVGWidth
      return '0 0 ' + width + ' ' + width
    }
  },
  methods: {
    getYear (n) {
      return this.startYear + n - 1
    },
    getYearData (n) {
      if (this.years) {
        return this.years[this.getYear(n)] || Array(9).fill(undefined)
      }
      return Array(9).fill(undefined)
    },
    getYearXFromIndex (ind) {
      let j = ind % 10
      return j * (this.yearWidth) + ((j > 4) ? 20 - this.sizes.line.md : 0)
    },
    getYearYFromIndex (ind) {
      let i = Math.floor(ind / 10)
      return i * (this.yearWidth) + ((i > 4) ? 20 - this.sizes.line.md : 0)
    },
    translateYear (n) {
      return {
        'transform': 'translate('
        + this.getYearXFromIndex(n - 1) + 'px,'
        + this.getYearYFromIndex(n - 1) + 'px)'
      }
    },
  }
}
</script>
<style scoped>
rect.bg {
  fill: rgb(219, 136, 42);
}
</style>

<!--
data = [
  {year: 1820, color: #fff, actor: greg, eventType: 0, description: ,},
  {year: 1827, color: #eee, actor: jan, eventType: 2, description: ,},
  {year: 1819, color: #ddd, actor: tony, eventType: 1, description: ,},
  {year: 1830, color: #ddd, actor: tony, eventType: 5, description: ,},
  {year: 1830, color: #ddd, actor: tony, eventType: 8, description: ,},
  {year: 1830, color: #ddd, actor: tony, eventType: 7, description: ,},
  {year: 1830, color: #eee, actor: jan, eventType: 7, description: ,},
  {year: 1830, color: #fff, actor: greg, eventType: 4, description: ,}
]
-->
