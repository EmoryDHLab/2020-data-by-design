<template>
  <div id="image" :style="styles">
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
        default: 800
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
        forward: true,
      }
    },
    computed: {
      currViewport() {
        const currPos = this.positions[this.currentPosition];
        if (this.elapsed === 0) {
          return this.positions[this.currentPosition]
        }
        else {
          const fromPos = this.forward ? this.positions[this.currentPosition - 1] : this.positions[this.currentPosition + 1]
          if (currPos && fromPos) {
            const interp = (dimension) => d3.interpolateNumber(fromPos[dimension], currPos[dimension])(this.elapsed);
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
        if (newVal > oldVal)
          this.forward = true;
        else this.forward = false;

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
