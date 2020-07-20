<template>
  <div>
    <hr>
    <p v-for="slot in footnoteSlots" >
      <sup v-if="footnotes.updated"><a class="note-link" :href="'#' + (footnotes[slot] ? footnotes[slot].refId : '')">[{{slot}}]</a></sup>
      <span :ref="slot" :id="`fn-${slot}`">
        <slot :name="slot"></slot>
      </span>
    </p>
  </div>
</template>

<script>
  import { mapActions, mapState} from 'vuex'
  export default {
    computed: {
      footnoteSlots () {
        return Object.keys(this.$slots).filter(key => Number.isInteger(+key)).map(Number);
      },
      ...mapState('footnotes', ['footnotes'])
    },
    methods: {
      ...mapActions('footnotes', {register: 'registerFootnoteContent'})
    },
    mounted () {
      Object.entries(this.$refs).forEach(([index, el]) => {
        const html = el[0].innerHTML;
        const contentId = el[0].id;
        if (contentId) {
          this.register({index, html, contentId});
        }
      });
    },
  }
</script>

<style scoped>
  a.note-link {
    color: #4a90e2;
    text-decoration: none;
    padding-bottom: 100px; /*So when we scroll to the element, there's some room below it*/
  }
</style>
