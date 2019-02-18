<template lang="html">
  <div class="waypoint">
    <slot></slot>
  </div>
</template>

<script>
/**
 * This is an organizational element that can be used to put waypoints into the HTML
 * It emits events whenever the InviewWaypoint enters or exits the window.
 * The InviewWaypoint is backed by the waypoints library. You can find it at the link below
 * http://imakewebthings.com/waypoints/shortcuts/inview/
 */

require('waypoints/lib/noframework.waypoints.min');
require('waypoints/lib/shortcuts/inview.min');
export default {
  props: {
    enabled: {
      // whether the waypoint is enabled
      type: Boolean,
      default: true,
    }
  },
  data: () => ({
    waypoint: {} // placeholder for the InviewWaypoint we will create on mount
  }),
  mounted () {
    const vm = this;
    const conf = {
      element: this.$el, // attach it to this component
      /**
       * fires when the waypoint enters the view (from top or bottom of view)
       * Emits 'enter' and 'enter:<direction>' (if direction is defined)
       * @param {string} direction either 'down' or 'up' depending on scroll dir
       */
      enter (direction) {
        vm.$emit('enter', { direction })
        if (direction)
          vm.$emit(`enter:${direction}`)
      },
      /**
       * fires when the waypoint has entered the view (from top or bottom of view)
       * Emits 'entered' and 'entered:<direction>' (if direction is defined)
       * @param {string} direction either 'down' or 'up' depending on scroll dir
       */
      entered: function (direction) {
        vm.$emit('entered', direction)
        if (direction)
          vm.$emit(`entered:${direction}`)
      },
      /**
       * fires when the waypoint exits the view (from top or bottom of view)
       * Emits 'exit' and 'exit:<direction>' (if direction is defined)
       * @param {string} direction either 'down' or 'up' depending on scroll dir
       */
      exit: function (direction) {
        vm.$emit('exit', direction)
        if (direction)
          vm.$emit(`exit:${direction}`)
      },
      /**
       * fires when the waypoint has exited the view (from top or bottom of view)
       * Emits 'exited' and 'exited:<direction>' (if direction is defined)
       * @param {string} direction either 'down' or 'up' depending on scroll dir
       */
      exited: function (direction) {
        vm.$emit('exited', direction)
        if (direction)
          vm.$emit(`exited:${direction}`)
      }
    }
    // create and store the waypoint
    Object.assign(this.waypoint, {}, new Waypoint.Inview(conf))
  },
  beforeDestroy () {
    if (this.waypoint) this.waypoint.destroy()
  }
}
</script>

<style scoped>
</style>
