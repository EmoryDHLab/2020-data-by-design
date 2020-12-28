<template lang="html">
  <svg :width="width" :height="height" viewBox="70 100 600 2500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="250" y="210" class="heavy">Progress</text>
    <!--LEGENDS-->
    <g style="transform: translateY(20vh)">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M270 2191H305V2226H270V2191Z" :fill=styles.color.defaultBlock />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M480 2191H515V2226H480V2191Z" :fill=styles.color.image />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M270 2248H305V2283H270V2248Z" :fill=styles.color.intVis />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M480 2248H515V2283H480V2248Z" :fill=styles.color.stcVis />

      <text x="340" y="2150" class="number" fill="#4A4A4A">LEGENDS</text>
      <text x="320" y="2220" class="small">Highlights</text>
      <text x="520" y="2220" class="small">Images</text>
      <text x="520" y="2275" class="small">Visualization</text>
      <text x="320" y="2275" class="small">Scrollytell</text>
    </g>

    <!--Lines, ChapterBlocks, Numbers, Notes Init-->
    <rect :x="styles.line.left - styles.chapterBlock.width/2" :y="styles.line.start- styles.chapterBlock.width/2"
          :width="styles.chapterBlock.width" :height="styles.chapterBlock.width" :fill=styles.color.defaultBlock></rect>
    <text x="300" :y="styles.line.start + 15" class="number" fill="#4A4A4A">1</text>


    <g v-for="(lines, index) in startEndPoint(dataset.paragraphData)">
        <g v-if="index+1 <= getProgress">
          <!--Vertical Line-->
          <line :x1="lines.x1" :y1="lines.y1" :x2="lines.x2" :y2="lines.y2" style="stroke:#D9B89A; stroke-width:5; stroke-linecap:round"></line>
          <!--Horizontal Line-->
          <line :x1="373" :y1="lines.y2" x2="510" :y2="lines.y2" style="stroke:#D9B89A; stroke-width:5; stroke-linecap:round"></line>
          <!--chapter block-->
          <rect :x="styles.line.left - styles.chapterBlock.width/2" :y="lines.y2 - styles.chapterBlock.width/2"
                :width="styles.chapterBlock.width" :height="styles.chapterBlock.width" :fill=styles.color.defaultBlock></rect>
          <!--paragraph number-->
          <text x="300" :y="lines.y2 + 15" class="number" fill="#4A4A4A">{{index + 2}}</text>
        </g>
        <g v-else-if="index <= getProgress">
          <!--Vertical Line-->
          <line :x1="lines.x1" :y1="lines.y1" :x2="lines.x2" :y2="lines.y2" style="stroke:#D9B89A; stroke-width:5; stroke-linecap:round"></line>
          <!--Horizontal Line-->
          <line :x1="373" :y1="lines.y2" x2="510" :y2="lines.y2" style="stroke:#9B9B9B; stroke-width:5; stroke-linecap:round"></line>
          <!--chapter block-->
          <rect :x="styles.line.left - styles.chapterBlock.width/2" :y="lines.y2 - styles.chapterBlock.width/2"
                :width="styles.chapterBlock.width" :height="styles.chapterBlock.width" :fill=styles.color.gray></rect>
          <!--paragraph number-->
          <text x="300" :y="lines.y2 + 15" :fill=styles.color.gray class="number">{{index + 2}}</text>
        </g>
        <g>
            <g v-for="i in lines.blocks">
                <g>
                    <!--Notes Init-->
                    <!--(i-1) because v-for index start with 1 instead of 0-->
                    <rect v-on:click="click = goto(index, i-1)"
                          x="455"
                          :y="lines.y1 + styles.block.verGap + (i-1)*(styles.block.gap + styles.block.width)"
                          :width="styles.block.width" :height="styles.block.width"
                          :fill=styles.color.defaultBlock
                          :fill-opacity= dataset.highlights[index][i-1] ></rect>
                    <!--VIS-->
                    <!--10: largest number of subparts in section-->
                    <g v-on:click="click = goto(index, i-1)"
                       @mouseover="hover = index*10 + i"
                       @mouseleave="hover = null">
                      <rect v-if="dataset.vis[index][i-1] == VisTypes.IMAGE "
                            x="406"
                            :y="lines.y1 + styles.block.verGap + (i-1)*(styles.block.gap + styles.block.width)"
                            :width="styles.block.width" :height="styles.block.width"
                            :fill=styles.color.image ></rect>
                      <rect v-if="dataset.vis[index][i-1] == VisTypes.INTERACTION "
                            x="406"
                            :y="lines.y1 + styles.block.verGap + (i-1)*(styles.block.gap + styles.block.width)"
                            :width="styles.block.width" :height="styles.block.width"
                            :fill=styles.color.intVis ></rect>
                      <rect v-if="dataset.vis[index][i-1] == VisTypes.VISUALIZATION "
                            x="406"
                            :y="lines.y1 + styles.block.verGap + (i-1)*(styles.block.gap + styles.block.width)"
                            :width="styles.block.width" :height="styles.block.width"
                            :fill=styles.color.stcVis ></rect>

                      <rect v-if="hover == index*10 + i  && dataset.vis[index][i-1] != '0'"
                            x="406"
                            :y="lines.y1 + styles.block.verGap + (i-1)*(styles.block.gap + styles.block.width)"
                            :width="styles.block.width" :height="styles.block.width"
                            :fill=styles.color.lightgray ></rect>
                    </g>
                </g>
                <g v-if="index + i/10 > getProgress">
                  <!--gray line for progress-->
                  <line :x1="lines.x1" :y1="lines.y1+ (i-1)*(styles.block.gap + styles.block.width)"
                        :x2="lines.x2" :y2="lines.y1 + styles.block.verGap*2 + (i-1)*(styles.block.gap + styles.block.width) + styles.block.width"
                        style="stroke:#9B9B9B; stroke-width:5; stroke-linecap:round"></line>
                </g>
            </g>
        </g>
        <g v-if="index > getProgress">
          <!--Vertical Line-->
          <line :x1="lines.x1" :y1="lines.y1" :x2="lines.x2" :y2="lines.y2" style="stroke:#9B9B9B; stroke-width:5; stroke-linecap:round"></line>
          <!--Horizontal Line-->
          <line :x1="373" :y1="lines.y2" x2="510" :y2="lines.y2" style="stroke:#9B9B9B; stroke-width:5; stroke-linecap:round"></line>
          <!--chapter block-->
          <rect :x="styles.line.left - styles.chapterBlock.width/2" :y="lines.y2 - styles.chapterBlock.width/2"
                :width="styles.chapterBlock.width" :height="styles.chapterBlock.width" :fill=styles.color.gray></rect>
          <!--paragraph number-->
          <text x="300" :y="lines.y2 + 15" :fill=styles.color.gray class="number">{{index + 2}}</text>
        </g>
    </g>
  </svg>

</template>

<script>
/**
 * This component is a metavisualization which visualizes chapter content by
 * It shares a lot of code with the the timeline vis
 */

import NavlineBucket from './NavlineBucket'
import NavlineMixin from "../../../../mixins/vis/NavlineMixin";
import ch_mut from '@/store/chapters-old/types'
import { mapState, mapGetters, mapActions } from 'vuex'

// import * as d3 from 'd3'

const DEFAULT_OPTIONS = {
  styles: {
    width: 50, // navline width
    height: 500, // the height of the navline
    margin: { // margins for the vis (helps avoid axis overflow)
      top: 10,
      left: 10,
      bottom: 10,
      right: 10
    },
    timelineEvent: { // styles for each navline event
      width: 5,
      height: 5,
      gap: 1 // space between each event
    },
    line: {
      left: 373,
      right:510,
      start: 292
    },
    chapterBlock: {
      width: 40
    },
    block: {
      width: 32,
      gap: 22,
      margin: 18,
      verGap: 38//chapterBlock/2 + margin
    },
    color: {
      defaultBlock:"#D9B89A",
      gray: "#9B9B9B",
      image: "#577456",
      intVis: "#801201",
      stcVis: "#CA6E11",
      lightgray: "#dddddd"
    }
  },
  vertical: true, // how to orient the navline
  showTicks: true // whether to show the axis ticks
};
export default {
  components: {
    NavlineBucket
  },
  mixins: [NavlineMixin(DEFAULT_OPTIONS)],
  methods: {
    /**
     * calculate line positions
     **/
    startEndPoint: function (paragraphData) {
      let start = this.styles.line.start;
      let x = this.styles.line.left;
      let arr = [];
      for (let i = 0; i < paragraphData.length; i++) {
        let lines = paragraphData[i];
        let end = lines * this.styles.block.width
          + (lines - 1) * this.styles.block.gap + this.styles.block.verGap * 2 + start;
        arr.push({
          x1: x,
          y1: start,
          x2: x,
          y2: end,
          blocks: lines,
        });
        start = end;
        x = (x === this.styles.line.left) ? this.styles.line.right : this.styles.line.left;
      }
      return arr;
    },

  }
}
</script>

<style scoped>
  .heavy { font: bold 70px Baskerville; fill:#4A4A4A }
  .number { font: bold 50px Baskerville}
  .small { font: bold 28px Baskerville; fill:#4A4A4A }
</style>
