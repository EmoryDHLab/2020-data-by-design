<template>
  <svg :width='width' :height='height' :viewBox='getViewBox'>
    <rect class='bg' :width='getSVGWidth' :height='getSVGWidth'/>
    <g :style='translateCentury'>
      <year-square
        v-for='n in 100'
        :key='n-1'
        :style='translateYear(n)'
        :dataset='getYearData(n)'
        :settings='settings'/>
    </g>
  </svg>
</template>

<script>
import YearSquare from '@/components/vis/peabody/YearSquare'
export default {
  props: ['width', 'height', 'dataset'],
  components: {
    'year-square': YearSquare
  },
  data: function () {
    return {
      settings: {
        sizes: {
          line: {
            sm: 1,
            md: 2,
            lg: 20
          },
          rect: 16
        }
      }
    }
  },
  computed: {
    sizes () {
      return this.settings.sizes
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
    getSVGWidth () {
      return (this.sizes.rect * 30
        + this.sizes.line.sm * 20
        + this.sizes.line.md * 8
        + this.sizes.line.lg * 3).toString()
    },
    startYear () {
      return Math.min(...Object.keys(this.dataset))
    },
    getViewBox () {
      let width = this.getSVGWidth
      return '0 0 ' + width + ' ' + width
    }
  },
  methods: {
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
    getYearData(n) {
      let year = n - 1 + this.startYear
      return this.dataset[year] || {}
    }
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
