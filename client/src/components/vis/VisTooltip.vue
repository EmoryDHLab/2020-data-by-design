<template lang="html">
  <g v-if='active' class='svg-tooltip'>
    <text v-wrap='20'><slot></slot></text>
  </g>
</template>

<script>
import * as d3 from 'd3'

export default {
  props: {
    wrap: {
      type: Number,
      default: -1
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      wrapped: false
    }
  },
  directives: {
    wrap (el, binding) {
      console.log('wrap');
      const width = binding.value;
      var text = d3.select(el),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          console.log('too long')
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
      }
    }
  }
}
</script>

<style scoped>
text {
  font-size: 10px;
  font-family: 'Raleway', sans-serif;
  text-anchor: middle;
}
</style>
