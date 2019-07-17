<template lang="html">
<svg :width="styles.width" :height="styles.height">
  <mask id="mask">
    <rect
      x="0" y="0"
      :width="styles.width"
      :height="styles.height"
      fill="black"></rect>
    <circle
      :cx="styles.width/2"
      :cy="styles.height/2"
      :r="styles.width/2"
      fill="white"/>
  </mask>
  <g mask="url(#mask)">
    <g class="image-group" :transform="positionImages">
      <image
        v-for="image in formattedData"
        :xlink:href="image.href"
        :width="image.width"
        :height="image.height"
        :x="image.x"
        :y="image.y"/>
    </g>
  </g>
</svg>
</template>

<script>
import MetaVisualization from "@/mixins/vis/MetaVisualization"

const DEFAULT_OPTIONS = {
  styles: {
    width: 500,
    height: 500,
  }
}

export default {
  mixins: [MetaVisualization],
  props: {
    focusedImg: {
      required: true
    },
    options: {
      type: Object,
      required: false,
      default: () => DEFAULT_OPTIONS
    }
  },
  computed: {
    positionImages () {
      if (this.focusedImg === undefined
        || this.dataset[this.focusedImg] === undefined) {
        throw new Error(`Image by id '${this.focusedImg}' cannot be accessed`)
      }
      const img = this.dataset[this.focusedImg];
      const dx = (this.styles.width / 2) - (img.x + (img.width / 2));
      const dy = (this.styles.height / 2) - (img.y + (img.height / 2));
      return `translate(${dx}, ${dy})`
    }
  },
  methods: {
    dataFormatter (d) {
      return Object.values(d)
    }
  },
}
</script>

<style lang="css" scoped>
.image-group {
  -moz-transition: all 1s ease-in-out;
  -o-transition: all 1s ease-in-out;
  -webkit-transition: all 1s ease-in-out;
  transition: all 1s ease-in-out;
}
</style>
