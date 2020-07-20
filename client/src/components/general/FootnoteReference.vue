<template>
  <div class="container">
    <div class="preview" v-if="showPreview && noteHTML" v-html="noteHTML"/>
    <div class="scrollTo" :id="id"/>
    <sup>
      <a class="note-link" :href="link"
            @mouseover="showPreview = true" @mouseout="showPreview = false">
      [{{number}}]
      </a>
    </sup>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    number: {
      required: true,
      type: Number,
      validator (val) {
        return val >= 1;
      }
    }
  },
  data () {
    return {
      showPreview: false
    }
  },
  computed: {
    id () {
      return `fn-ref-${this.number}`
    },
    link () {
      if (this.footnotes.updated) {
        return '#' + this.footnotes[this.number].contentId;
      }
    },
    noteHTML () {
      if (this.footnotes.updated) {
        return this.footnotes[this.number].html;
      }
    },
    ...mapState('footnotes', ['footnotes'])
  },
  methods: {
    ...mapActions('footnotes', {register: 'registerFootnoteRef'})
  },
  mounted () {
    this.register({refId: this.id, index: this.number});
  }
}
</script>

<style scoped>
  a.note-link {
    color: #4a90e2;
    text-decoration: none;
  }
  div.container {
    display: inline;
  }
  div.scrollTo {
    position: absolute;
    margin-top: -150px;
  }
  div.preview {
    position: absolute;
    left: 75%;
    padding: 5px;
    margin-top: -30px;
    background: #f8f8ff;
    border: 1px solid gray;
    border-radius: 4px;
    /*box-shadow: 1px 1px 1px;*/
  }
</style>
