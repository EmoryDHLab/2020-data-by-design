<template>
  <g>
    <rect :width='sizes.rect' :height='sizes.rect' />
  </g>
</template>
<script>
export default {
  props: ['sizes']
}
</script>
<style scoped>
  rect {
    fill: #ffffff;
  }
  rect:hover {
    fill: #d8d8d8;
  }
</style>
