<template>
  <div ref="image" id="image" :style="styles">
    <img :src="src" :style="{ width: this.width }" alt=""/>
  </div>

</template>

<script>
  import Visualization from "@/mixins/vis/Visualization";
  import * as d3 from "d3";

  export default {
    mixins: [Visualization()],
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
        if (this.elapsed === 0) {
          return this.positions[this.currentPosition]
        }
        else {
          if (currPos && this.prevView) {
            const interp = (dimension) => d3.interpolateNumber(this.prevView[dimension], currPos[dimension])
                                          (d3.easePolyInOut(this.elapsed));
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
        return {
          backgroundImage: `url(${this.src})`,
          backgroundSize: `${viewport.width}vh ${viewport.height}vh`,
          backgroundPosition: `${viewport.left}vh ${viewport.top}vh`,
          width: 'fit-content'
        }
      }
    },
    mounted () {
      console.log("D3");
      console.dir(d3);
    },
    watch: {
      currentPosition (newVal, oldVal) {
        if (this.elapsed == 0) {
          this.prevView = this.positions[oldVal];
        } else {
          let left, top, width, height;
          [left, top] = this.$refs['image'].style.backgroundPosition.replace(/vh/g, '').split(' ').map(n => Number(n));
          [width, height] = this.$refs['image'].style.backgroundSize.replace(/vh/g, '').split(' ').map(n => Number(n));
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
