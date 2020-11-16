<template>
  <div>
    <svg
      :width="width"
      :height="height"
      :viewBox="getViewBox">
      <rect class='bg' :width='getSVGWidth' :height='getSVGWidth'/>
      <g :style='translateCentury'>
        <g v-for="(n, i) in 100">
          <year-square :key="i"
                       :year="yearFromOffset(i)"
                       :yearData="getYearData(yearFromOffset(i))"
                       :style="translateYear(n)"
                       :actorColors="actorColors"
                       :sizes="sizes">
          </year-square>
          <text class="year-label" :style="translateYearLabel(n)">
            {{yearFromOffset(i)}}
          </text>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
  import YearSquare from "../newpeabodygrid/YearSquare";
  import Visualization from "../../../../mixins/vis/Visualization";
  import { actorColors, dataToYears} from "../../../../helpers/PeabodyUtils";
  /*
    Emits: Bubble up events defined in EventSquare:
    event-clicked
    hover-start
    hover-end
   */


  const sizes = {
    line: {
      sm: 1,
        md: 2,
        lg: 20
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
      century: {
        type: Number, //e.g. 1600
        required: true,
        validator (value) {
          return value % 100 === 0;
        }
      },
      actorColors: {
        type: Object,
        required: true
      },
      events: {
        type: Array
      }
    },
    mixins: [Visualization()],
    computed: {
      getSVGWidth () {
        return (this.sizes.rect * 30
          + this.sizes.line.sm * 20
          + this.sizes.line.md * 8
          + this.sizes.line.lg * 3).toString()
      },
      getViewBox () {
        let width = this.getSVGWidth
        return '0 0 ' + width + ' ' + width
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
      yearFromOffset(offset) {
        return this.century + 1 + offset;
      },
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
        let j = ind % 10
        return j * (this.yearWidth) + ((j > 4) ? 20 - this.sizes.line.md : 0)
      },
      getYearYFromIndex (ind) {
        let i = Math.floor(ind / 10)
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
