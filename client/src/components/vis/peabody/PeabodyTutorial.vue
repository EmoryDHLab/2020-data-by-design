<template>
  <div class='peabody-tutorial' aria-labelledby='' aria-describedby='right-hand-text'>
    <div class='tutorial-flex'>
      <PeabodyGrid class='the-grid'
        :class='gridClasses'
        :showIndicator="false"
        ref='grid'
        v-bind='$attrs'
        v-on='$listeners'
        :showSquares='showSquares'
        :id='id'
        />
<!--        <svg v-if='this.slideNumber === 2' class='big-line' :height='$attrs.height' viewBox ='0 0 90 600'>-->
<!--          <line x1='15' y1='1' x2='50' y2='1' stroke='orange'/>-->
<!--          <line x1='15' y1='599' x2='50' y2='599' stroke='orange'/>-->
<!--          <line x1='50' y1='599' x2='50' y2='1' stroke='orange'/>-->
<!--          <line x1='50' y1='302' x2='90' y2='302' stroke='orange'/>-->
<!--        </svg>-->
<!--        <div id="right-hand-text" class='right-hand-text'-->
<!--          :class="{'tutorial-flex-center': centerText}"-->
<!--          v-text='rightHandText'-->
<!--          :style='textStyles'>-->
<!--        </div>-->
    </div>
    <svg class='tutorial-overlay'
         viewBox='0 0 576 576' xmlns='http://www.w3.org/2000/svg'
         :width='$attrs.width'
         :height='$attrs.height'
          aria-label='Example Grid'
        >
      <defs>
        <!-- arrowhead marker definition -->
        <marker id='arrowhead' viewBox='0 0 10 10' refX='0' refY='3.5'
            markerWidth='10' markerHeight='7'
            orient='auto-start-reverse'>
          <!-- <path d='M 0 0 L 10 5 L 0 10 z' stroke='orange' fill='none'/> -->
          <polygon points='0 0, 10 3.5, 0 7' stroke='orange' fill='none'/>
        </marker>
      </defs>

<!--      <line v-if='this.slideNumber === 0' x1='576' y1='50' x2='90' y2='50' stroke='orange '-->
<!--        stroke-width='1.5' marker-end='url(#arrowhead)' />-->

      <template v-if='slideNumber > 0'>
        <text class='year' x='30' y='49'>1501</text>
        <text class='year' x='238' y='49'>1505</text>
        <text class='year' x='308' y='49'>1506</text>
        <text class='year' x='516' y='49'>1510</text>

        <text class='year' x='30' y='257'>1541</text>
        <text class='year' x='238' y='257'>1545</text>
        <text class='year' x='308' y='257'>1546</text>
        <text class='year' x='516' y='257'>1550</text>

        <text class='year' x='30' y='327'>1551</text>
        <text class='year' x='238' y='327'>1555</text>
        <text class='year' x='308' y='327'>1556</text>
        <text class='year' x='516' y='327'>1560</text>

        <text class='year' x='30' y='535'>1591</text>
        <text class='year' x='238' y='535'>1595</text>
        <text class='year' x='308' y='535'>1596</text>
        <text class='year' x='516' y='535'>1600</text>
      </template>
    </svg>

    <EventKey v-if='slideNumber > 2'
      :colors='eventKeyColors'
      :showNumbers= true
      :show-legend="false" :drop-shadow="false"
      :style='eventKeyStyles'></EventKey>
    <svg v-if='slideNumber === 5' viewBox='0 0 300 200' :style='countriesStyles'>
      <g v-for="(color, index) in eventKeyColors.filter(color => color && color !== 'none')" :key='index'>
        <rect :width='`30`' :height='`30`' :fill=color x='30' :y='index * 45'/>
        <text v-text='colorToCountry[color]' x='70' :y='20 + index * 45'/>
      </g>
    </svg>

    <svg v-if='showDots' :width='$attrs.width' aria-label="Tutorial slide selection"
    viewBox="0 0 576 200">

      <circle class="slide-circle"
        v-for="slide in maxSlideNumber + 1" :key="slide"
        :tabindex="slide"
        :cx="
          //current circle offset
          (slide - 1) * 40
          //starting offset to center the circles:
          + (576 - (maxSlideNumber + 1) * 40) / 2"
        stroke='lightgray'
        :stroke-width='slideNumber === slide - 1 ? 4 : 2'
        :fill='slideNumber === slide - 1 ? "lightgray" : "white"'
        cy=20
        r=10
      />
<!--        @click='slideNumber = slide - 1'-->
<!--        @keydown='event => {-->
<!--            if (event.keyCode == 13) {-->
<!--              slideNumber = slide - 1;-->
<!--            }-->
<!--          }'-->
<!--        />-->

    </svg>
  </div>
</template>

<script>
import PeabodyGrid from './PeabodyGrid'
import EventKey from './EventKey'
import Visualization from "../../../mixins/vis/Visualization";

export default {
  inheritAttrs: false,
  components: {
    PeabodyGrid,
    EventKey
  },
  mixins:[],
  props: {
    id: {
      type: String,
      required: true
    },
    showDots: {
      type: Boolean,
      default: true
    },
    slideNumber: {
      type: Number,
      default: 0,
    }
  },
  data () {
    return {
      // slideNumber: 0,
      maxSlideNumber: 7,
      gridWidth: 0,
      centerText: false,
      colors: {
        //Colors must be unique
        blue: 'rgb(50, 91, 103)',
        green: 'rgb(69, 136, 103)',
        red: 'rgb(141, 43, 29)'
      }
    }
  },
  mounted () {
  },
  computed: {
    colorToCountry () {
      return {
        [this.colors.blue]: 'Spain',
        [this.colors.green]: 'France',
        [this.colors.red]: 'England'
      }
    },
    //No longer in use.
    rightHandText () {
      const arr =
      ['one year',
      'Read the grid from left to right, top to bottom',
      'one century',
      'Each year of the century is divided into nine squares.',
      'The position of each square corresponds to a specific type of event.',
      'Colors indicate the countries involved in each event.',
      'A loss for England, a revolution for Spain, the birth of a Frenchman.',
      'These are major events of the 50th year of the century.'];
      return arr[this.slideNumber];
    },
    showSquares () {
      return this.slideNumber > 1
    },
    gridClasses() {
      return {
        grayed: this.slideNumber === 0
      }
    },
    eventKeyColors() {
      if (this.slideNumber > 4) {
        return [false, false, this.colors.blue,
                false, this.colors.green, false,
                this.colors.red, false, false]
      }
    },
    textStyles() {
      const gridWidth = this.$attrs.width;
      return {
        'margin-top': this.slideNumber === 0 ? `calc(${gridWidth} * 0.06)` : 0,
        maxWidth: `calc(${gridWidth} * 0.45)`
      }
    },
    eventKeyStyles() {
      const gridWidth = this.$attrs.width;
      // if (this.slideNumber > 5) {
        return {
          height: `calc(${gridWidth} / 8.8)`,
          position: 'absolute',
          left: `calc(${gridWidth} - ${gridWidth} / 9)`,
          top: `calc(${gridWidth} / 2 - ${gridWidth} / 9)`,
          // left: gridWidth,
          // top: `calc(${gridWidth} / 3)`,
          transform: 'translate(-5%, 5%)'
        }
      // }
      // return {
      //   height: `calc(${gridWidth} / 5)`,
      //   position: 'absolute',
      //   left: gridWidth,
      //   top: `calc(${gridWidth} / 1.5)`,
      //   transform: 'translate(-30%, -40%)',
      // }
    },
    countriesStyles() {
      return {
        position: 'absolute',
        left: `calc(${this.$attrs.width})`,
        top: `calc(${this.$attrs.width} / 2.5)`,
        width: `calc(${this.$attrs.width}) / 2`,
        height: `calc(${this.$attrs.width}) / 4`,
      }
    }
  },
  methods: {
    handleEventClick({year, type, data}) {

    }
  },
  watch: {
    slideNumber (newVal) {
      if (newVal > this.maxSlideNumber) {
        this.slideNumber = 0;
      }
    }
  }
}
</script>
<style scoped>

  .peabody-tutorial {
    position: relative;
    display: inline-block;
    user-select: none;
  }

  .tutorial-overlay {
    position: absolute;
    top: 0;
    left: 0;
  }

  .right-hand-text {
    font-weight: 400;
    font-family: 'Roboto';
    font-size: 16pt;
  }

  .the-grid {

  }

  .year {
    font-family: monospace;
    fill: #939393
  }

  .grayed >>> > rect {
    fill: lightgray;
  }

  .grayed >>> .year-square-1 {
    stroke: orange;
    stroke-width: 2;
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

  .slide-circle:hover {
    stroke-width: 4
  }
  /* .event-key { Now using feDropShadow within EventKey
    filter: drop-shadow( 0px 0px 3px)
  } */

</style>
