<template lang="html">
  <div class="chapterList">
    <h3 class="title --bold --uppercase">
      <slot name="title"></slot>
    </h3>
    <p class="overview">
      <slot></slot>
    </p>
  </div>
</template>

<script>
    export default {
        name: "ChapList.vue",
    }
</script>

<style lang="css" scoped>
.chapterList {
  padding: 1em 1em 1em 3em;
  text-align:start;
  border-radius: 5px;
  box-shadow: 1px 2px 7px 1px rgba(0,0,0,0.46);
  border-left-style: solid;
  border-left-color: aquamarine;
  border-left-width: thick;
}

</style>