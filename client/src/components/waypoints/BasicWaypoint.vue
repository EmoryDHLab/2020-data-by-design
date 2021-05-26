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

require('./waypoints');

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
    },
    contextId: {
      type: String
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
    },
    destroyWaypoint () {
      if (this.waypoint && this.waypoint.destroy) {
        this.waypoint.destroy();
      }
    },
    createWaypoint () {
      this.destroyWaypoint();
      const vm = this;
      // set up the waypoint config
      const context = document.getElementById(this.contextId) || window;
      const conf = {
        // attach to this element
        element: this.$el,
        // set the offset (from top) where the waypoint will trigger
        offset: this.offset,
        // set whether the waypoint is active (it won't emit events if it is off)
        enabled: this.enabled,
        // context,
        handler: (direction) => {
          // emit a 'triggered' event no mater what
          vm.$emit('triggered')
          if (direction) {
            // emit triggered:up or triggered:down depending on direction
            vm.$emit(`triggered:${direction}`)
          }
        },
        scrollHandler: ({newScroll, oldScroll, direction, lastWaypoint, nextWaypoint}) => {
          vm.$emit('scrolled', {newScroll, oldScroll, direction, lastWaypoint, nextWaypoint});
        }
      }
      // actually create the waypoint (store it in component data)
      const waypoint = new window.Waypoint(conf);
      Object.assign(this.waypoint, {}, waypoint)
    }
  },
  mounted () {
    setTimeout(this.createWaypoint, 800);
  },
  beforeDestroy () {
    // make sure we destroy the waypoint before the component is destroyed
    this.destroyWaypoint();
  },
  watch: {
    enabled (newVal, oldVal) {
      if (newVal === true) {
        this.enable();
      } else if (newVal === false) {
        this.disable();
      t }
    },
    offset (newVal, oldVal) {
      // this.createWaypoint();
    }
  }
}
</script>

<style scoped>
</style>
