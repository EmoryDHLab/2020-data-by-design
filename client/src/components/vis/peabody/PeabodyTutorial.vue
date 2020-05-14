<template>
  <div class="tutorial-flex">
    <PeabodyGrid class="the-grid"
      :class="gridClasses"
      ref="grid"
      v-bind="$attrs"
      v-on="$listeners"
      :showSquares="showSquares"
      :datasetId="'tutorial'"
      :id="id"
      @event-clicked="handleEventClick"
      />
      <div class="right-hand-text"
        :class="{'tutorial-flex-center': centerText}"
        :style="{maxWidth: `calc(${gridWidth} * 0.5)`}">
        Read the grid from left to right, top to bottom {{this.gridWidth}}
      </div>
      <input type="number" v-model.number="slideNumber">
  </div>
</template>

<script>
import PeabodyGrid from './PeabodyGrid'

export default {
  inheritAttrs: false,
  components: {
    PeabodyGrid
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      slideNumber: 0,
      gridWidth: 0,
      centerText: false,
    }
  },
  mounted () {
    this.gridWidth = getComputedStyle(this.$refs.grid.$el).width;
  },
  computed: {
    showSquares () {
      return this.slideNumber !== 0;
    },
    gridClasses() {
      return {
        grayed: this.slideNumber === 0
      }
    }
  },
  methods: {
    handleEventClick({year, type, data}) {

    }
  }
}
</script>
<style scoped>
  .the-grid {

  }
  .grayed {
    filter: grayscale(1) brightness(140%)
  }
  .tutorial-flex {
    display: flex;
  }

  .tutorial-flex-center {
    align-items: center
  }
  .right-hand-text {
    margin-left: 10px;
  }
</style>
