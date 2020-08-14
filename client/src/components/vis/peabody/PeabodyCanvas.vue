<template>
  <div>
    <div class="container" :style="{width: width, height: width}">
      <svg viewBox="0 0 500 500" @mousemove="onMouseMove">
        <svg v-if="overlay" :x="overlay.x" :y="overlay.y">
          <rect fill="gray" fill-opacity="30%"
                 :width="overlay.width" :height="overlay.height"/>
          <rect fill="gray" fill-opacity="50%"
                :x="overlay.miniX" :y="overlay.miniY"
                :width="overlay.miniWidth" :height="overlay.miniHeight"></rect>
        </svg>
      </svg>
      <canvas ref="canvas"></canvas>
    </div>
    <div v-if="debug">
      <div class="swatch" :style="{ backgroundColor: currRgba }">
      </div>
      <div>{{ currColor }}: {{ nearestColor }}</div>
      <div v-if="currBox">{{currBoxIndex}} ({{ currBox }} </div>
    </div>
  </div>
</template>

<script>
  import Visualization from "@/mixins/vis/Visualization";
  const dimensions = {
    side: 0.060,
    box: 0.085,
    boxLast: 0.09,
    middle: 0.029
  }
  const referenceColors = {
    red: [119, 43, 21],
    green: [68, 108, 73],
    orange: [222, 145, 49],
    yellowgreen: [184, 175, 109],
    turquoise: [60, 100, 100],
    empty: [225, 200, 172]
  }
  export default {
    mixins: [Visualization()],
    props: {
      value: {
        type: Number,
        validator (number) {
          if (isNaN(number)) return false;
          const oneDigitDecimal = String(number).slice(String(number).indexOf(".") + 1).length == 1;
          return oneDigitDecimal && number >= 1 && number < 101;
        }
      },
      century: {
        type: Number,
        default: 1600
      },
      debug: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        canvas: null,
        currColor: [0,0,0,0],
        currPixel: {x: 0, y: 0},
        newValue: false, //handle changes in the value prop before looking at new mouse inputs
        lastEmitted: null,
      }
    },
    computed: {
      currRgba () {
        return "rgba(" + this.currColor.reduce((acc, curr) => `${acc},${curr}`) + ")";
      },
      currBox () {
        const el = this.$refs["canvas"];
        if (!this.canvas || !el ) return;
        if (this.newValue) {
          const squareIndex = Math.floor(this.value);
          const miniIndex = Math.round(10 * (this.value - squareIndex));
          const top = Math.floor((squareIndex - 1) / 10);
          const left = (squareIndex - 1) % 10;
          const topProgress = (1 + Math.floor((miniIndex - 1) / 3)) / 3;
          const leftProgress = (((miniIndex - 1) % 3) + 1) / 3;
          return {top, left, topProgress, leftProgress }
        }
        const pix = this.currPixel;
        let subtractLeft = dimensions.side;
        let subtractTop = dimensions.side;
        if (this.pastMiddle.pastX) subtractLeft += dimensions.middle;
        if (this.pastMiddle.pastY) subtractTop += dimensions.middle;
        const left = (pix.x - subtractLeft * el.width) / (dimensions.box * el.width);
        const top = (pix.y - subtractTop * el.height) / (dimensions.box * el.height);
        const leftTrunc = Math.trunc(left);
        const topTrunc = Math.trunc(top);
        return {
          left: leftTrunc,
          top: topTrunc,
          leftProgress: Number(left - leftTrunc),
          topProgress: Number(top - topTrunc)
        }
      },
      pastMiddle () {
        if (this.newValue) {
          return {
            pastX: this.currBox.left > 4, pastY: this.currBox.top > 4,
            inMiddleX: false, inMiddleY: false
          }
        }
        const el = this.$refs["canvas"];
        const middleWidth = dimensions.middle / 2 * el.width;
        const middleHeight = dimensions.middle / 2 * el.height;

        const middleBoundW = after => el.width / 2 + (after ? middleWidth : -middleWidth);
        const middleBoundH = below => el.height / 2 + (below ? middleHeight : -middleHeight);
        const pastX = this.currPixel.x > middleBoundW(true)
        const pastY = this.currPixel.y > middleBoundH(true)
        const inMiddleX = !pastX && this.currPixel.x > middleBoundW(false);
        const inMiddleY = !pastY && this.currPixel.y > middleBoundH(false);
        return { pastX, pastY, inMiddleX, inMiddleY}
      },
      currBoxIndex () {
        return 1 + this.currBox.top * 10 + this.currBox.left
      },
      currYear () {
        return this.century + this.currBoxIndex;
      },
      currNumber () {
        if (!this.currBox) return;
        const x = Math.ceil(this.currBox.leftProgress * 3);
        const y = Math.ceil(this.currBox.topProgress * 3);
        if (x >= 0 && y >= 0) {
          const number = 3 * (y - 1) + x;
          return {number, x, y};
        }
      },
      nearestColor () {
        if (!this.currColor)
          return;
        const sq = n => n * n;
        const distance = (c1, c2) => Math.sqrt(sq(c1[0] - c2[0]) + sq(c1[1] - c2[1]) + sq(c1[2] - c2[2]));
        let shortestKey = null;
        let shortestDist = 1000;
        Object.keys(referenceColors).forEach(key => {
          const dist = distance(referenceColors[key], this.currColor);
          if (dist < shortestDist) {
            shortestDist = dist;
            shortestKey = key;
          }
        });
        return shortestKey;
      },
      overlay () {
        if (!this.canvas || this.pastMiddle.inMiddleX || this.pastMiddle.inMiddleY
              ||  this.currBox.left > 9 || this.currBox.top > 9 || !this.currNumber)
          return;

        const boxWidth = dimensions.box * 500;
        const boxLastWidth = dimensions.boxLast * 500;
        const sideWidth = dimensions.side * 500;
        const middleWidth = dimensions.middle * 500;

        let boxLeft = sideWidth + this.currBox.left * boxWidth;
        if (this.pastMiddle.pastX) boxLeft += middleWidth;

        let boxTop = sideWidth + this.currBox.top * boxWidth
        if (this.pastMiddle.pastY) boxTop += middleWidth;

        return {
          x: boxLeft, y: boxTop,
          width: this.currBox.left == 9 ? boxLastWidth : boxWidth,
          height: boxWidth,
          miniX: (this.currNumber.x - 1) * boxWidth / 3,
          miniY: (this.currNumber.y - 1) * boxWidth / 3,
          miniWidth: boxWidth / 3,
          miniHeight: boxWidth / 3
        }
      },
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
        this.newValue = false;

        const el = this.$refs["canvas"];
        const width = el.offsetWidth;
        const height = el.offsetHeight;
        const pixelX = event.offsetX / width * el.width;
        const pixelY = event.offsetY / height * el.height;

        this.currPixel = {x: pixelX, y: pixelY }

        const imgData = this.canvas.getImageData(pixelX, pixelY, 1, 1);
        this.currColor = imgData.data;

      }
    },
    watch: {
      value (newVal, oldVal) {
        if (newVal != oldVal && newVal !== this.lastEmitted) {
          this.newValue = true;
        }
      },
      currNumber (newVal, oldVal) {
        if (newVal && newVal.number) {
          if (oldVal && newVal.number === oldVal.number) return;
          if (newVal.number === this.lastEmitted) return;
          const validNum = newVal.number >= 1 && newVal.number <= 9;
          const validBox = this.currBoxIndex >=1 && this.currBoxIndex <= 100;
          if (validNum && validBox) {
            const toEmit = Number(`${this.currBoxIndex}.${newVal.number}`);
            this.lastEmitted = toEmit;
            this.$emit('input', toEmit);
          }
        }
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
