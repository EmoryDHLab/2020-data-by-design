<template lang="html">
  <div class="base-card">
    <slot></slot>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
div.base-card {
  background-color: white;
  border-radius: 4px;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: 0px 0px 20px 1px grey;
}
</style>
