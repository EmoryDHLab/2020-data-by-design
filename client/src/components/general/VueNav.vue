<template lang="html">
  <nav>
    <slot></slot>
  </nav>
</template>

<script>
export default {
}
</script>

<style scoped>
nav {
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
  margin: 0 -16px;
}

nav >>> * {
  flex: 0 0 auto;
  white-space: nowrap;
  vertical-align: baseline;
  text-decoration: none;
}

</style>
