<template lang="html">
  <slot></slot>
</template>

<script>
export default {
  props: {
    // all settings for the vis
    config: Object,
    // an function which will convert the data like the vis needs (passed in by the vis child)
    dataAdapter: Function,
    // has the dataset id, the event bus, and interfaces w/ vuex
    dataGroup: Number
  },
  data: {},
  computed: {},
  created () {
    const rawData = this.dataGroup.getRawData();
    this.data = this.dataAdapter(rawData);
  }
}
</script>

<style lang="css">
</style>
