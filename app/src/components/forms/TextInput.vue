<template lang="html">
  <base-input
    type="text"
    v-on="inputListeners"
    :value="value"
    v-bind="$attrs"><slot></slot></base-input>
</template>

<script>
import BaseInput from './BaseInput'

export default {
  name: "TextInput",
  inheritAttrs: false,
  components: {
    BaseInput
  },
  props: ['value'],
  computed: {
    inputListeners () {
      const vm = this
      return Object.assign({},this.$listeners, {input: function (val) {
        vm.$emit('input', val)
      }})
    }
  }
}
</script>

<style lang="css">
</style>
