<template lang="html">
  <p
    @keydown.enter.stop.prevent="addNextNode($event)"
    @keydown.delete="checkDelete()"
    @focus="$emit('focus')"
    class="node-input"
    contenteditable="true"></p>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "TextNode",
  props: {
    id: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['focused', 'focusedId'])
  },
  watch: {
    text (newText, oldText) {
      this.$el.innerText = newText;
    },
    focusedId (newFocus, oldFocus) {
      if (newFocus === this.id) {
        this.$el.focus()
      }
    }
  },
  methods: {
    eText () {
      return this.$el.innerText
    },
    save (e) {
      console.log(this.$el.innerText, e)
      e.returnValue = false;
      // emit the call to save the updates node
      this.$emit('update', { id: this.id, text: this.eText()})
    },
    textAfterCursor () {
      return this.eText().substring(this.getCaretIndex())
    },
    textBeforeCursor () {
      return this.eText().substring(0, this.getCaretIndex())
    },
    addNextNode (e) {
      const nextText = this.textAfterCursor()
      this.$el.innerText = this.textBeforeCursor()
      this.save(e)
      console.log(nextText);
      this.$emit('create', { id: this.id, text: nextText })
      // emit the call to add a new node
    },
    getCaretIndex () {
      const range = window.getSelection().getRangeAt(0)
      console.log(range);
      return range.startOffset
    },
    checkDelete () {
      if (this.getCaretIndex() === 0) {
        this.$emit('delete', { id: this.id, text: this.textAfterCursor() })
      }
    }
  },
  mounted () {
    this.$el.innerText = this.text
    if (this.focused(this.id)) {
      this.$el.focus()
    }
  }
}
</script>

<style lang="css" scoped>
.node-input {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  margin: 0px;
}
</style>
