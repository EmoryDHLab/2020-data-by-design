<template lang="html">
  <base-button
    class="submit-button"
    type="submit"
    v-bind="$attrs"
    v-on="$listeners">
    <slot>Submit</slot>
  </base-button>
</template>

<script>
import BaseButton from './BaseButton'
export default {
  name: "SubmitButton",
  inheritAttrs: false,
  components: {
    BaseButton
  }
}
</script>

<style scoped>
.submit-button {
  background-color: #49A038;
  border-color: #49A038;
  color: white;
}
</style>
