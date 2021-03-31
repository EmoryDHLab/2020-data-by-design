<template lang="html">
  <svg
    :width="styles.width + styles.margin.left + styles.margin.right + 'px'"
    :height="styles.height + styles.margin.top + styles.margin.bottom + 'px'">
    <g :transform="`translate(${styles.margin.left}, ${styles.margin.top})`">
      <!--gray bar-->
      <rect id="timeline"
        x='0' :y='(styles.height - styles.line.height)/2'
        :height="styles.line.height"
        :width="styles.line.width"
        fill="#989898"
        rx="6px" ry="6px"></rect>

      <g v-for="yearPoints in groupedByYear"
         :style = positionYear(yearPoints)>
        <!--blue bars-->
        <rect
                @mouseenter="$emit('focus-image', yearPoints.points[0].id)"
                :width="styles.line.height"
                :height="scaleY(yearPoints.count)"
                fill="#4A90E2"
                :rx="styles.line.height/2" :ry="styles.line.height/2"></rect>

        <!--year text-->
        <text
          v-if="yearPoints.year % 2 == 0"
          transform="rotate(45), translate(-40, 0)"
          style="font-size:14px">{{yearPoints.year}}</text>
        <text
          v-if="yearPoints.year % 2 != 0"
          :transform="`rotate(45),
            translate(${(10 + scaleY(yearPoints.count)) * 0.7071},
        ${(scaleY(yearPoints.count) + 15) * 0.7071})`"
          style="font-size:14px">{{yearPoints.year}}</text>


      </g>


      <g v-for="point in dataset" :style = positionPointX(point)>
        <!--frames-->
        <g v-if="point.year % 2 == 0"
           :transform="`translate(${point.yearCount * 10 - styles.frame.width/2 + posAdjust(point.year)},${(styles.height + styles.margin.bottom)/2 - 10})`"
           @mouseover="hover = point"
        >

          <g v-if = "hover != point">
            <rect x="0" width="30" :height="point.height" rx="1" fill="#989898"></rect>
            <g :transform="`translate(0)`">
              <polygon points="15,-5 10,1 20,1" style="fill:#989898"></polygon>
            </g>
            <image
                    :xlink:href="point.href"
                    :width="26"
                    :x="point.x"
                    :y="point.y"
                    ></image>
          </g>

          <g v-show="hover == point">
            <line x1="15" y1="-75" x2="15" y2="0" style="stroke:#4A90E2;stroke-width:2"></line>
            <polygon points="15,-85 10,-75 20,-75" style="fill:#4A90E2"></polygon>
          </g>

        </g>

        <g v-if="point.year % 2 != 0"
           :transform="`translate(${22 + point.yearCount * 10 + posAdjust(point.year)},${(styles.margin.top + styles.margin.bottom - styles.framepadding)/2})`"
           @mouseover="hover = point, hoverx = point.x, hovery = point.y"
        >
          <g v-if="hover != point">
          <g :transform="`translate(-40, 20)`">
            <rect :x="0"
                  :y="20-point.height"
                  :width="30"
                  :height="point.height"
                  rx="1" fill="#989898"
                  ></rect>
            <g :transform="`translate(30, 20) rotate(180)`">
              <polygon points="15,-5 10,1 20,1" style="fill:#989898"></polygon>
            </g>
          </g>
          <image
                  :xlink:href="point.href"
                  :width="26"
                  :x="point.x - 40"
                  :y="42.5-point.height"></image>
          </g>

          <g v-show="hover == point">
            <line x1="-25" y1="45" x2="-25" y2="120" style="stroke:#4A90E2;stroke-width:2"></line>
            <polygon points="-25,130 -20,120 -30,120" style="fill:#4A90E2"></polygon>
          </g>
        </g>
      </g>

      <g v-if="hover != null" :style = positionPointX(hover)>
        <g v-if="hover.year % 2 == 0"
           @mouseleave="hover = null"
           :transform="`translate(${hover.yearCount * 10 - styles.frame.width/2 + posAdjust(hover.year)},${(styles.height + styles.margin.bottom)/2 - 10})`">
          <rect x="-15" width="60" :height="hover.height*2" rx="1" fill="#989898"></rect>
          <polygon points="15,-5 10,1 20,1" style="fill:#989898"></polygon>
          <image
                  :xlink:href="hover.href"
                  :width="56"
                  :x="hoverx - 15"
                  :y="hovery"
          ></image>
        </g>

        <g v-if="hover.year % 2 != 0"
           @mouseleave="hover = null"
           :transform="`translate(${22 + hover.yearCount * 10 + posAdjust(hover.year)},${(styles.margin.top + styles.margin.bottom - styles.framepadding)/2})`">
          <g :transform="`translate(-40,0)`">
            <rect x="-15" :y="40-hover.height*2" width="60" :height="hover.height*2" rx="1" fill="#989898"></rect>
            <g :transform="`translate(30, 40) rotate(180)`">
              <polygon points="15,-5 10,1 20,1" style="fill:#989898"></polygon>
            </g>
          </g>
          <image
                  :xlink:href="hover.href"
                  :width="56"
                  :x="hover.x - 40 - 15"
                  :y="42.5-hover.height*2"
          ></image>
        </g>
      </g>

    </g>
  </svg>
</template>

<script>

const max = function (arr) {
  return arr.reduce((currMax, curr) => {
    return ((curr > currMax || currMax === undefined) ? curr : currMax)
  }, undefined)
}

const min = function (arr) {
  return arr.reduce((currMin, curr) => {
    return ((curr < currMin || currMin === undefined) ? curr : currMin)
  }, undefined)
}

const DEFAULT_OPTIONS = {
  styles: {
    height: 200,
    width: 1000,
    framepadding: 10,
    margin: {
      top: 50,
      right: 50,
      bottom: 50,
      left: 50,
    },
    line: {
      width: 900,
      height: 10,
    },
    frame: {
        width: 30,
        height: 20,
    },
  }
}

export default {
  mixins: [],
  data() {
      return {
          hover: null,
          hoverx: 0,
          hovery: 0,
      };
  },
  props: {
    options: {
      type: Object,
      required: false,
      default: () => DEFAULT_OPTIONS
    },
    dataset: {
      type: Object,
      required: true
    },
  },
  computed: {
    formattedData () {
      return this.dataFormatter(this.dataset)
    },
    styles () {
      return this.options.styles || {}
    },
    earliestDate () {
      let years = this.formattedData
        .map(point => point.year)
      return min(years)
    },
    latestDate () {
      let years = this.formattedData
        .map(point => point.year)
      return max(years)
    },
    groupedByYear() {
      const groupObject = this.formattedData.reduce((counts, point) => {
        if (counts[point.year] === undefined) {
          counts[point.year] = []
        }
        counts[point.year].push(point);
        return counts
      }, {})
      return Object.entries(groupObject).map(([year, points]) => ({
        year: parseInt(year),
        points,
        count: points.length
      }))
    },
    maxPicCount () {
      return max(this.groupedByYear.map(points => points.count))
    },
    minPicCount () {
      return min(this.groupedByYear.map(points => points.count))
    },
    scaleX () {
      const minYear = this.earliestDate;
      let dateRange = this.latestDate - this.earliestDate  + 1;
      if (dateRange == 0) return this.styles.line.width / 2
      return (year) => (year - minYear) * this.styles.line.width / (dateRange)
    },
    scaleY () {
      const minCount = this.minPicCount;
      const picRange = this.maxPicCount - this.minPicCount;
      console.log(picRange);
      return (count) => {
        let sz = (count - minCount) * (this.styles.height) / (picRange + 1)
        if (sz <= 0) {
          sz = 2 * this.styles.line.height
        }
        return sz
      }
    },
  },
  methods: {
    dataFormatter (d) {
      return Object.values(d)
    },
    positionYear (yearPoints) {
      const dx = this.scaleX(yearPoints.year) - this.styles.line.height/2
      const dy = (this.styles.height - this.scaleY(yearPoints.count))/2
      return `transform: translate(${dx}px, ${dy}px);`
    },
    positionYearX (yearPoints) {
      const dx = this.scaleX(yearPoints.year) - this.styles.line.height/2
      return dx
    },
    positionYearY (yearPoints) {
      const dy = (this.styles.height - this.scaleY(yearPoints.count))/2
      return dy
    },
    positionPointX (point) {
        const dx = this.scaleX(point.year) - this.styles.line.height/2
        return `transform: translate(${dx}px, 0px);`
    },
    posAdjust(year) {
        if (year === 1900) {
            return -160;
        }
        else {
            return 0;
        }
    },
    imgWidth (point) {
        let w, h;
        const frameHeight = this.styles.frame.height;
        // let img = document.
        // img.onload=function(){
        //     w=this.width;
        //     h=this.height;
        //     w=(frameHeight - 4) * w / h;
        //     h= frameHeight - 4;
        // };
        // return data;
    }
  }
}
</script>

<style lang="css" scoped>
</style>
