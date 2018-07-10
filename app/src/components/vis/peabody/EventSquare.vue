<template>
  <g @click='selectEvents'>
    <rect
      :width='sizes.rect'
      :height='sizes.rect'
      :fill='color(0)'/>
    <polygon v-if='dataset.length == 2' :points='trianglePoints' :fill='color(1)'/>
  </g>
</template>
<script>
import VisStateMixin from '@/mixins/vis/VisStateMixin'

export default {
  mixins: [VisStateMixin],
  props: ['year', 'type'],
  computed: {
    sizes () {
      return this.config.sizes
    },
    checker () {
      if (this.dataset.length > 2) {
        console.log(this.dataset[0], this.dataset.length);
      }
      return this.dataset.length
    },
    trianglePoints () {
      return (
        '0,' + this.sizes.rect + ' '
        + '0,0 '
        + this.sizes.rect + ',0'
      )
    }
  },
  methods: {
    color (i) {
      if (this.dataset[i])
        return this.dataset[i].color
    },
    selectEvents (e) {}
  }
}
</script>
<style scoped>
  rect:not([fill]) {
    fill: #ffffff;
  }
  rect:not([fill]):hover {
    fill: #d8d8d8;
  }
</style>
