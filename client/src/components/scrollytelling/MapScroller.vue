<template>
  <div ref="div" id="image" :style="styles">
    <img ref="img" :src="src" :style="{ width: this.width }" alt=""/>
  </div>

</template>

<script>
  import Visualization from "@/mixins/vis/Visualization";
  import * as d3 from "d3";

  //TODO: Think about what to do when dragged to notebook
  export default {
    mixins: [Visualization({notebookName: "MapScroller", saveProps: ["asset", "positions", "animationTime"]})],
    props: {
      asset: {
        type: String,
        required: true,
      },
      positions: {
        type: Array, //[{left, top, width, height}] percentages
        // required: true,
      },
      animationTime: {
        type: Number,
        default: 1000
      },
      currentPosition: {
        type: Number,
        default: 0
        // required: true
      },
      elapsePercent: { //Number between zero and 1. Overrides default animation behavior!!
        type: Number,
      },
      easing: {
        type: Function,
        default: d3.easePolyInOut
      }
    },
    data () {
      return {
        elapsed: 0,
        prevView: null
      }
    },
    computed: {
      currViewport() {
        const currPos = this.positions[this.currentPosition];

        const interpolate = elapsed => (dimension) =>
          d3.interpolateNumber(this.prevView[dimension], currPos[dimension])(this.easing(elapsed));

        if (this.elapsePercent === 0) {
          return this.positions[this.currentPosition - 1];
        }
        if (this.elapsed === 0 && !this.elapsePercent) {
          return this.positions[this.currentPosition]
        }
        if (this.elapsePercent) {
          this.prevView = this.positions[this.currentPosition - 1];
          const interp = interpolate(this.elapsePercent);
          return {
            top: interp('top'),
            left: interp('left'),
            width: interp('width'),
            height: interp('height')
          }
        }
        else {
          if (currPos && this.prevView) {
            console.log(this.elapsed);
            const interp = interpolate(this.elapsed)
            return {
              top: interp('top'),
              left: interp('left'),
              width: interp('width'),
              height: interp('height')
            }
          }
        }
      },
      src () {
        return require(`../../assets/${this.asset}`)
      },
      styles () {
        const viewport = this.currViewport;
        const dim = dimension => this.widthTimes(viewport[dimension] / 100);
        // console.log(dim('width'), dim('height'), dim('left'), dim('top'))
        return {
          backgroundImage: `url(${this.src})`,
          backgroundSize: `${dim('width')} ${dim('height')}`,
          backgroundPosition: `${dim('left')} ${dim('top')}`,
          width: this.width
        }
      }
    },
    watch: {
      currentPosition (newVal, oldVal) {
        if (this.elapsed == 0) {
          this.prevView = this.positions[oldVal];
        } else {
          let left, top, width, height;
          const imgWidth = Number(window.getComputedStyle(this.$refs['img']).width.replace(/px/g, ''));
          console.log(imgWidth);
          [left, top] = window.getComputedStyle(this.$refs['div']).backgroundPosition
            .replace(/px/g, '')
            .split(' ')
            .map(n => Number(n) / imgWidth * 100);
          [width, height] = window.getComputedStyle(this.$refs['div']).backgroundSize
            .replace(/px/g, '')
            .split(' ')
            .map(n => Number(n) / imgWidth * 100);
          console.log(left, top, width, height);
          this.prevView = { left, top, width, height };
        }

        const timer = d3.timer(elapsed => {
          if (elapsed > this.animationTime) {
            timer.stop();
            this.elapsed = 0;
          } else {
            this.elapsed = elapsed / this.animationTime;
          }
        })
      }
    }
  }
</script>

<style scoped>
  #image img {
    visibility: hidden;
  }
</style>
