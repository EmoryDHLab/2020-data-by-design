<template lang="html">
  <label>
    <span class='label'><slot>Input</slot></span>
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
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}
.label {
  display: block;
  flex: 0 0 9em;
  white-space: nowrap;
}
input[type="text"],
input[type="password"],
input[type="textarea"] {
  border-radius: 4px;
  border: 1px solid grey;
  padding: 4px;
  flex: 1;
}
</style>
