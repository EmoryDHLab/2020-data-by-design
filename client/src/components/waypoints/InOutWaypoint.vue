<template lang="html">
  <div class="waypoint">
    <slot></slot>
  </div>
</template>

<script>
require('waypoints/lib/noframework.waypoints.min');
require('waypoints/lib/shortcuts/inview.min');
export default {
  props: {
    enabled: {
      type: Boolean,
      default: true,
    }
  },
  data: () => ({
    waypoint: {}
  }),
  mounted () {
    const vm = this;
    const conf = {
      element: this.$el,
      enter: function (direction) {
        vm.$emit('enter', { direction })
        if (direction)
          vm.$emit(`enter:${direction}`)
      },
      entered: function (direction) {
        vm.$emit('entered', direction)
        if (direction)
          vm.$emit(`entered:${direction}`)
      },
      exit: function (direction) {
        vm.$emit('exit', direction)
        if (direction)
          vm.$emit(`exit:${direction}`)
      },
      exited: function (direction) {
        vm.$emit('exited', direction)
        if (direction)
          vm.$emit(`exited:${direction}`)
      }
    }
    this.waypoint = new Waypoint.Inview(conf)
  },
  beforeDestroy () {
    this.waypoint.destroy()
  }
}
</script>

<style scoped>
</style>
