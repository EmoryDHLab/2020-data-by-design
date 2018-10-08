<template lang="html">
  <p>{{ text }}</p>
</template>

<script>
export default {
  name: "TextNode",
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="css">
</style>
