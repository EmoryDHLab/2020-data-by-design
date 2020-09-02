<template>
  <div>
    <svg
      :width="width"
      :height="height"
      :viewBox="getViewBox">
      <rect class='bg' :width='getSVGWidth' :height='getSVGWidth'/>
      <g :style='translateCentury'>
        <g v-for="(n, i) in 4">
          <year-square :key="i"
                       :year="years[i]"
                       :yearData="getYearData(years[i])"
                       :style="translateYear(n)"
                       :actorColors="actorColors"
                       :sizes="sizes">
          </year-square>
          <text class="year-label" :style="translateYearLabel(n)">
            {{years[i]}}
          </text>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
  import YearSquare from "../newpeabodygrid/YearSquare";
  import Visualization from "../../../../mixins/vis/Visualization";
  import { dataToYears} from "../../../../helpers/PeabodyUtils";

  const sizes = {
    line: {
      sm: 1,
        md: 2,
        lg: 5
    },
    rect: 16
  }
  export default {
    components: {YearSquare},
    props: {
      width: String,
      height: String,
      sizes: {
        type: Object,
        default () {
          return sizes;
        }
      },
      years: {
        type: Array,
        default () {
          return [2001, 2002, 2003, 2004]
        }
      },
      actorColors: {
        type: Object,
        default () {
          return {
            "Americas": "rgb(222,145,49)",
            "India": "rgb(60,100,100)",
            "Indonesia": "rgb(68,108,73)",
            "Ukraine": "rgb(217,182,17)"
          }
        },
      },
      events: {
        type: Array
      }
    },
    mixins: [Visualization()],
    computed: {
      getViewBox () {
        let width = this.getSVGWidth
        return '0 0 ' + width + ' ' + width
      },
      getSVGWidth () {
        return (this.sizes.rect * 6
          + this.sizes.line.sm * 5
          + this.sizes.line.md
          + this.sizes.line.lg * 2).toString()
      },
      evtWidth () {
        return this.sizes.rect + this.sizes.line.sm
      },
      yearWidth () {
        return this.evtWidth * 3 + this.sizes.line.md - this.sizes.line.sm
      },
      translateCentury () {
        return {
          'transform': 'translate('
            + this.sizes.line.lg + 'px,' + this.sizes.line.lg + 'px)'
        }
      },
      yearsObj () {
        if (Array.isArray(this.events) && this.events.length > 0) {
          return dataToYears(this.events)
        }
      }
    },
    methods: {
      getYearData (year) {
        if (this.yearsObj) {
          return this.yearsObj[year] || Array(9).fill(undefined)
        }
        return Array(9).fill(undefined)
      },
      translateYear (n) {
        return {
          'transform': 'translate('
            + this.getYearXFromIndex(n - 1) + 'px,'
            + this.getYearYFromIndex(n - 1) + 'px)'
        }
      },
      translateYearLabel (n) {
        return {
          'transform': 'translate('
            + (14 + this.getYearXFromIndex(n - 1)) + 'px,'
            + (29 + this.getYearYFromIndex(n - 1)) + 'px'
        }
      },
      getYearXFromIndex (ind) {
        let j = ind % 2
        return j * (this.yearWidth) + ((j > 4) ? 20 - this.sizes.line.md : 0)
      },
      getYearYFromIndex (ind) {
        let i = Math.floor(ind / 2)
        return i * (this.yearWidth) + ((i > 4) ? 20 - this.sizes.line.md : 0)
      },
    }

  }
</script>

<style scoped>
  rect.bg {
    fill: rgb(219, 136, 42);
  }

  .year-label {
    font-family: monospace;
    font-size: 8pt;
    opacity: 0.2;
    pointer-events: none;
  }
</style>
