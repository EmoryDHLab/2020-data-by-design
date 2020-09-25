<template>
  <div>
    <div class="container" :style="{width: width, height: width}">
      <svg viewBox="0 0 500 500" @mousemove="onMouseMove">
        <svg v-if="overlay" :x="overlay.x" :y="overlay.y">
          <rect :fill="overlayColor" fill-opacity="30%"
                 :width="overlay.width" :height="overlay.height"/>
          <rect :fill="overlayColor" fill-opacity="50%"
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
  const blankDimensions = {
    side: 0.046,
    box: 0.081,
    boxRatio: 1.01,
    boxBorder: 0.0088,
    boxLast: 0.081,
    middle: 0.021
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
        img: null,
        currColor: [0,0,0,0],
        currPixel: {x: 0, y: 0},
        newValue: false, //handle changes in the value prop before looking at new mouse inputs
        lastEmitted: null,
      }
    },
    computed: {
      isBlank () {
        return this.century === 0;
      },
      overlayColor () {
        return this.isBlank ? '#fcd547' : 'gray';
      },
      dimensions () {
        return this.isBlank ? blankDimensions : dimensions;
      },
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
        let subtractLeft = this.dimensions.side;
        let subtractTop = this.dimensions.side;
        if (this.pastMiddle.pastX) subtractLeft += this.dimensions.middle - (this.dimensions.boxBorder || 0);
        if (this.pastMiddle.pastY) subtractTop += this.dimensions.middle - (this.dimensions.boxBorder || 0);
        let boxHeight = this.dimensions.box * el.height;
        let boxWidth = this.dimensions.box * el.width;
        if (this.dimensions.boxRatio) boxWidth *= this.dimensions.boxRatio;
        if (this.dimensions.boxBorder) {
          boxHeight += this.dimensions.boxBorder * el.height;
          boxWidth += this.dimensions.boxBorder * el.width;
        }
        const left = (pix.x - subtractLeft * el.width) / (boxWidth);
        const top = (pix.y - subtractTop * el.height) / (boxHeight);
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
        const middleWidth = this.dimensions.middle / 2 * el.width;
        const middleHeight = this.dimensions.middle / 2 * el.height;

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

        const boxHeight = this.dimensions.box * 500;
        const boxWidth = this.dimensions.boxRatio ? boxHeight * this.dimensions.boxRatio : boxHeight;
        const boxLastWidth = this.dimensions.boxLast * 500;
        const sideWidth = this.dimensions.side * 500;
        const middleWidth = this.dimensions.middle * 500;

        let boxLeft = sideWidth + this.boxBorders.left + this.currBox.left * boxWidth;
        if (this.pastMiddle.pastX) boxLeft += middleWidth;

        let boxTop = sideWidth + this.boxBorders.top + this.currBox.top * boxHeight;
        if (this.pastMiddle.pastY) boxTop += middleWidth;

        return {
          x: boxLeft, y: boxTop,
          width: this.currBox.left == 9 ? boxLastWidth : boxWidth,
          height: boxHeight,
          miniX: (this.currNumber.x - 1) * boxWidth / 3,
          miniY: (this.currNumber.y - 1) * boxHeight / 3,
          miniWidth: boxWidth / 3,
          miniHeight: boxHeight / 3
        }
      },
      boxBorders () { //cumulative
        let boxBordersLeft = 0, boxBordersTop = 0;
        if (this.dimensions.boxBorder) {
          const borderWidth = this.dimensions.boxBorder * 500;
          boxBordersLeft = (this.currBox.left - this.pastMiddle.pastX) * borderWidth;
          boxBordersTop = (this.currBox.top - this.pastMiddle.pastY) * borderWidth;
        }
        return {left: boxBordersLeft, top: boxBordersTop}
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
      this.img = img;
      this.setImg();
    },
    methods: {
      setImg () {
        if (this.img) {
          const imgName = this.isBlank ? 'blank' : this.century + 's';
          this.img.src = require(`../../../assets/PeabodyImg/${imgName}.jpg`);
        }
      },
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
      },
      century () {
        this.setImg();
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
