<template lang="html">
  <label>
    <slot>Input</slot>
    <input v-bind="$attrs" v-on="inputListeners" :value="value"/>
  </label>
</template>

<script>
export default {
  name: "BaseInput",
  inheritAttrs: false,
  props: ['value'],
  computed: {
    inputListeners () {
      const vm = this
      return Object.assign({},this.$listeners, {input: function (event) {
        vm.$emit('input', event.target.value)
      }})
    }
  }
}
</script>

<style scoped>
label {
  display: block;
}
</style>
