<template lang="html">
  <section class='chapter'>
    <h1 class='chapter__title'>Chapter 1</h1>
    <div class='chapter__left-margin'></div>
    <section class='chapter__sections'>
      <section v-for='n in 10' v-key='n'>
        <h3>{{n}}. Section</h3>
        <lorem-ipsum v-for='i in 3' v-key='i'/>
      </section>
    </section>
  </section>
</template>

<script>
import LoremIpsum from './LoremIpsum'
export default {
  components: {
    LoremIpsum
  }
}
</script>

<style lang="css">
.chapter {
  display: grid;
  grid-template-columns: 60px auto 60px;
  grid-template-rows: 50px auto;
}
.chapter__title {
  grid-column: 2 / span 1;
  grid-row: 1 / span 1;
}
.chapter__sections {
  grid-column-start: 2;
  grid-column-end: span 1;
}
</style>
