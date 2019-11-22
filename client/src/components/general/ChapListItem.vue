<template lang="html">
  <div :class="`chapter-list-item card ${(isActive) ? '--active' : ''}`">
    <div class="chapter-list-item__header">
      <h2 class="title --uppercase" style="font-family: Roboto; color:#083871;">
        <slot name="title"></slot>
      </h2>
      <h3 class="tagline"><slot name="tag"></slot></h3>
    </div>
    <p class="overview">
      <slot></slot>
    </p>
  </div>
</template>

<script>
  export default {
    name: "ChapListItem",
    props: {
      isActive: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="css" scoped>
.chapter-list-item {
  padding: 1em 4em 1em 3em;
  margin-bottom: 25px;
  text-align:start;
  border-left-style: solid;
  border-left-color: #4a90e2;
  border-left-width: 10px;
}

.chapter-list-item.--active {
  border-left-color: #2c3e50;
}

.chapter-list-item__header {
  display: flex;
  align-items: baseline;
}

.chapter-list-item__header .title {
  margin-right: 2em;
}

</style>
