<template>
  <section :id="elementId">
    <h1 v-text="title"></h1>
    <slot></slot>
  </section>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

let staticCount = 0;
window.addEventListener('load', (e) => staticCount = 0);
export default {
  props: {
    title: String
  },
  data () {
    return {
      number: staticCount++
    }
  },
  mounted () {
    if (this.currChapterSections.length <= this.number) {
      debugger;
      this.registerSection({id: this.elementId});
    }
  },
  computed: {
    ...mapGetters('chapters', ['currChapterTitle', 'currChapterSections']),
    elementId () {
      return `${this.currChapterTitle}-section-${this.number}`
    }
  },
  methods: {
    ...mapActions({registerSection: 'chapters/registerSection'})
  },
}
</script>

<style scoped>

</style>
