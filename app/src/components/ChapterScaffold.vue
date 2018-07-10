<template lang="html">
  <section class='chapter'>
    <h1 class='chapter__title'>
      <slot name='title'>
        Title
      </slot>
    </h1>
    <section class='chapter__content'>
      <slot name='content'>
        <p>No content found!</p>
      </slot>
    </section>
  </section>
</template>

<script>
import LoremIpsum from './LoremIpsum'
export default {
  name: 'ChapterScaffold'
}
</script>

<style scoped>
.chapter {
  display: grid;
  grid-template-columns: 15% 60% 25%;
  grid-template-rows: auto;
}
.chapter__title {
  grid-column: 2 / span 1;
  grid-row: 1 / span 1;
  margin-bottom: 0;
}
.chapter__content {
  grid-column-start: 2;
  grid-column-end: span 1;
}

.centered {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
