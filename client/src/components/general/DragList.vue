<template lang="html">
  <ul>
    <slot></slot>
  </ul>
</template>

<script>
import { ContainerMixin } from 'vue-slicksort'

export default {
  name: 'NodeList',
  mixins: [ContainerMixin]
}
</script>

<style lang="css" scoped>
ul {
  list-style: none;
  padding: 0;
}
</style>
