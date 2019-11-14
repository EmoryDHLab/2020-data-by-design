<template lang="html">
  <div class="progress-bar">
    <h4 class="bar-text">{{percentage}}% Chapter one</h4>
    <svg
      class="bar-vis"
      preserveAspectRatio="none"
      width="100%"
      viewBox="0 0 104 10">
    <g transform="translate(2, 2)">
      <rect width="100" height="6"
      rx="3" ry="3"
      fill="transparent"
      stroke="rgb(74, 144, 226)"
      stroke-width="0.5"
      stroke-dasharray="1,1"></rect>
      <rect :width="scaledValue" height="6"
      rx="3" ry="3"
      stroke="rgb(74, 144, 226)"
      stroke-width="0.5"
      fill="rgb(74, 144, 226)"></rect>
    </g>
  </svg>
  </div>
</template>

<script>
export default {
  props: {
    range: {
      type: Array,
      default: [0, 100],
      validator: (arr) => {
        return (arr.length == 2) && (arr[1] > arr[0])
      }
    },
    value: {
      type: Number,
      required: true
    }
  },
  computed: {
    scaledValue () {
      const pct = (this.value - this.range[0]) / (this.range[1] - this.range[0])
      if (pct > 1) {
        return 100
      }
      if (pct < 0) {
        return 0
      }
      return 100 * pct
    },
    percentage () {
      return this.scaledValue.toFixed(0)
    }
  }
}
</script>

<style lang="css" scoped>
.progress-bar {
  display: flex;
  flex-flow: column;
  justify-content: space-around;
}
.bar-text {
  margin: 0;
  /* flex: 1; */
}
.bar-vis {
  /* flex: 1; */
}
</style>
