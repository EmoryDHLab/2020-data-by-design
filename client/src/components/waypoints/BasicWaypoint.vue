<template lang="html">
  <div class="waypoint">
    <slot></slot>
  </div>
</template>

<script>
require('waypoints/lib/noframework.waypoints.min');
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
      handler: () => {
        vm.$emit('triggered')
      }
    }
    this.waypoint = new Waypoint(conf)
  },
  beforeDestroy () {
    this.waypoint.destroy()
  }
}
</script>

<style scoped>
</style>
