<template>
  <section class='chapter'>
    <h1>{{chapter.title}}</h1>
    <chapter-section
      v-for='section in chapter.section'
      :title='section.title'
      :body='section.body'
    />

  </section>
</template>

<script>
import DataWrap from './vis/DataWrap'
import PeabodyGrid from '@/components/vis/peabody/PeabodyGrid'

export default {
  name: 'HelloWorld',
  components: {
    DataWrap,
    PeabodyGrid
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
