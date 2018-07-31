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
    },
    offset: {
      type: [String, Number],
      default: 0
    }
  },
  data: () => ({
    waypoint: {}
  }),
  methods: {
    enable () {
      this.waypoint.enable()
    }
  },
  mounted () {
    const vm = this;
    const conf = {
      element: this.$el,
      offset: this.offset,
      enabled: this.enabled,
      handler: (direction) => {
        vm.$emit('triggered')
        if (direction) {
          vm.$emit(`triggered:${direction}`)
        }
      }
    }
    Object.assign(this.waypoint, {}, new Waypoint(conf))
  },
  beforeDestroy () {
    this.waypoint.destroy()
  }
}
</script>

<style scoped>
</style>
