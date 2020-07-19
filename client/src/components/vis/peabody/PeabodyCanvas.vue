<template>
  <div>
    <div class="container" :style="{width: width, height: width}">
      <svg viewBox="0 0 500 500" @mousemove="onMouseMove">
        <rect v-if="overlay"
              fill="gray" fill-opacity="50%"
              :x="overlay.x" :y="overlay.y" :width="overlay.width" :height="overlay.height"/>
      </svg>
      <canvas ref="canvas"></canvas>
    </div>
    <div class="swatch" :style="{ backgroundColor: currRgba }"></div>
    <div v-if="currBox">({{ currBox.left }}, {{currBox.top}}) {{currYear}}</div>
  </div>
</template>

<script>
  import Visualization from "@/mixins/vis/Visualization";
  const dimensions = {
    side: 0.060,
    box: 0.085,
    middle: 0.029
  }
  export default {
    mixins: [Visualization()],
    data () {
      return {
        canvas: null,
        currColor: [0,0,0,0],
        currPixel: {x: 0, y: 0}
      }
    },
    computed: {
      currRgba () {
        return "rgba(" + this.currColor.reduce((acc, curr) => `${acc},${curr}`) + ")";
      },
      currBox () {
        const el = this.$refs["canvas"];
        if (!this.canvas || !el ) return;
        const pix = this.currPixel;
        let subtractLeft = dimensions.side;
        let subtractTop = dimensions.side;
        if (this.pastMiddle.x) subtractLeft += dimensions.middle;
        if (this.pastMiddle.y) subtractTop += dimensions.middle;
        const left = (pix.x - subtractLeft * el.width) / (dimensions.box * el.width);
        const top = (pix.y - subtractTop * el.height) / (dimensions.box * el.height);
        return {left: Math.trunc(left), top: Math.trunc(top)}
      },
      pastMiddle () {
        const el = this.$refs["canvas"];
        const middleBoundW = el.width / 2 + dimensions.middle * el.width;
        const middleBoundH = el.height / 2 + dimensions.middle * el.height;
        const x = this.currPixel.x > middleBoundW
        const y = this.currPixel.y > middleBoundH
        return { x, y }
      },
      currYear () {
        return 1601 + this.currBox.top * 10 + this.currBox.left;
      },
      overlay () {
        if (!this.canvas) return;
        const boxWidth = dimensions.box * 500;
        const sideWidth = dimensions.side * 500;
        const middleWidth = dimensions.middle * 500;

        let boxLeft = sideWidth + this.currBox.left * boxWidth;
        if (this.pastMiddle.x) boxLeft += middleWidth;

        let boxTop = sideWidth + this.currBox.top * boxWidth
        if (this.pastMiddle.y) boxTop += middleWidth;

        return {x: boxLeft, y: boxTop, width: boxWidth, height: boxWidth }
      }
    },
    mounted () {
      const canvas = this.$refs["canvas"];
      canvas.width = 500;
      canvas.height = 500;
      const ctx = canvas.getContext("2d");
      this.canvas = ctx;
      const img = new Image();
      img.addEventListener('load', () => {
        ctx.drawImage(img, 0, 0, 500, 500);
      })
      img.src = require('../../../assets/1600s.jpg');
    },
    methods: {
      onMouseMove (event) {
        const el = this.$refs["canvas"];
        const width = el.offsetWidth;
        const height = el.offsetHeight;
        const pixelX = event.offsetX / width * el.width;
        const pixelY = event.offsetY / height * el.height;

        this.currPixel = {x: pixelX, y: pixelY }

        const imgData = this.canvas.getImageData(pixelX, pixelY, 1, 1);
        this.currColor = imgData.data;

      }
    }
  }
</script>

<style scoped>

  .container {
    position: relative;
  }

  .swatch {
    width: 50px;
    height: 50px;
  }

  canvas {
    width: 100%;
    height: 100%;
  }

  svg {
    position: absolute;
    left: 0;
    top: 0;
    position: absolute;
  }

</style>
