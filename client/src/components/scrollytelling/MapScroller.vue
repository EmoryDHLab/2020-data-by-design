<template>
  <div id="image" :style="styles">
    <img :src="src" :style="{ width: this.width }" alt=""/>
    {{ viewLeft }}
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
        viewLeft: 0,
        viewTop: 0,
        viewWidth: 100,
        viewHeight: 100,
      }
    },
    computed: {
      src () {
        return require(`../../assets/${this.asset}`)
      },
      styles () {
        return {
          backgroundImage: `url(${this.src})`,
          backgroundSize: `${this.viewWidth}vh ${this.viewHeight}vh`,
          backgroundPosition: `${this.viewLeft}vh ${this.viewTop}vh`,
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
        const positions = this.positions[newVal];
        if (positions) {
          const interpolateLeft = d3.interpolateNumber(this.viewLeft, positions.left);
          const interpolateTop = d3.interpolateNumber(this.viewTop, positions.top);
          const interpolateWidth = d3.interpolateNumber(this.viewWidth, positions.width);
          const interpolateHeight = d3.interpolateNumber(this.viewHeight, positions.height);

          const timer = d3.timer( elapsed => {
            const t = elapsed / this.animationTime;
            this.viewLeft = interpolateLeft(t);
            this.viewTop = interpolateTop(t);
            this.viewWidth = interpolateWidth(t);
            this.viewHeight = interpolateHeight(t);
            if (elapsed > this.animationTime) {
              timer.stop();
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  #image img {
    visibility: hidden;
  }
</style>
