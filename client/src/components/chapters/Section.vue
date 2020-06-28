<template>
  <section :id="elementId">
    <slot></slot>
  </section>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

let staticCount = 0;
export default {
  props: {
    // chapter: {
    //   type: String,
    //   required: true
    // },
  },
  data () {
    return {
      number: staticCount++
    }
  },
  mounted () {
    this.registerSection({id: this.elementId});
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
