<template lang="html">
  <div class="waypoint">
    <slot></slot>
  </div>
</template>

<script>
/**
 * This is an organizational element that can be used to put waypoints into the HTML
 * It emits events whenever the waypoint hits the top of the window (or the offset,
 * depending on conf).
 * The Waypoint is backed by the waypoints library. You can find it at the link below
 * http://imakewebthings.com/waypoints/
 */

require('waypoints/lib/noframework.waypoints.min');
export default {
  props: {
    enabled: {
      // wheter the waypoint should be emitting events
      type: Boolean,
      default: true,
    },
    offset: {
      // this is the offset of the waypoint from the top of the window
      type: [String, Number],
      default: 0
    }
  },
  data: () => ({
    waypoint: {}
  }),
  methods: {
    /**
     * Enables the waypoint
     */
    enable () {
      this.waypoint.enable()
    },
    /**
     * Disables the waypoint
     */
    disable () {
      this.waypoint.disable()
    }
  },
  mounted () {
    const vm = this;
    // set up the waypoint config
    const conf = {
      // attach to this element
      element: this.$el,
      // set the offset (from top) where the waypoint will trigger
      offset: this.offset,
      // set whether the waypoint is active (it won't emit events if it is off)
      enabled: this.enabled,
      handler: (direction) => {
        // emit a 'triggered' event no mater what
        vm.$emit('triggered')
        if (direction) {
          // emit triggered:up or triggered:down depending on direction
          vm.$emit(`triggered:${direction}`)
        }
      }
    }
    // actually create the waypoint (store it in component data)
    Object.assign(this.waypoint, {}, new Waypoint(conf))
  },
  beforeDestroy () {
    // make sure we destroy the waypoint before the component is destroyed
    if (this.waypoint) this.waypoint.destroy()
  }
}
</script>

<style scoped>
</style>
