<template lang="html">
  <div class="text-node" @mouseenter="hovered=true" @mouseleave="hovered=true">
    <div class="--top-right" v-show="hovered">
      <BaseButton class="node-menu-button" @click="menuOpen=!menuOpen">
        <font-awesome-icon :icon="icon"/>
      </BaseButton>
      <ul class="node-menu" v-show="menuOpen">
        <li @click="alert('not set up')">
          <a>Move</a>
        </li>
        <li>
          <a @click="$emit('delete', { id, text:''})">Delete</a>
        </li>
      </ul>
    </div>
    <p
      @keydown.enter.stop.prevent="addNextNode($event)"
      @keydown.delete="checkDelete()"
      @focus="$emit('focus')"
      class="node-input"
      :contenteditable="editing"></p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { faEllipsisV } from '@fortawesome/fontawesome-free-solid'
import BaseButton from '@/components/forms/BaseButton'
export default {
  name: "TextNode",
  components: {
    BaseButton
  },
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
  data: () => ({
    editing: true,
    hovered: false,
    menuOpen: false
  }),
  computed: {
    icon () {
      return faEllipsisV
    },
    ...mapGetters(['focused', 'focusedId'])
  },
  watch: {
    text (newText, oldText) {
      this.setText(newText);
    },
    focusedId (newFocus, oldFocus) {
      if (newFocus === this.id) {
        this.$el.querySelector('.node-input').focus()
      }
    }
  },
  methods: {
    getText () {
      return this.$el.querySelector('.node-input').innerText
    },
    setText (t) {
      this.$el.querySelector('.node-input').innerText = t
    },
    save (e) {
      console.log(this.getText(), e)
      e.returnValue = false;
      // emit the call to save the updates node
      this.$emit('update', { id: this.id, text: this.getText()})
    },
    textAfterCursor () {
      return this.getText().substring(this.getCaretIndex())
    },
    textBeforeCursor () {
      return this.getText().substring(0, this.getCaretIndex())
    },
    addNextNode (e) {
      const nextText = this.textAfterCursor()
      this.setText(this.textBeforeCursor())
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
    },
    caretToEnd () {
      this.getText().setSelectionRange(this.getText().length - 1, this.getText().length - 1)
    }
  },
  mounted () {
    this.setText(this.text)
    if (this.focused(this.id)) {
      this.$el.querySelector('.node-input').focus()
    }
  }
}
</script>

<style lang="css" scoped>
.text-node {
  position: relative;
  padding-top: 35px;
  padding-right: 35px;
}

.node-input {
  width: 100%;
  box-sizing: border-box;
  margin: 0px;
}

.--top-right {
  /* display: block; */
  display: flex;
  align-items: flex-end;
  /* position: absolute; */
  /* top: 0; */
  /* left: 100%; */
  /* transform:  translateX(-100%); */
}
.node-menu-button {
  flex:0 0 auto;
  box-shadow: none;
  border: none;
  outline: none;
  padding-right: 0;
}
.node-menu-button:active {
  box-shadow: none;
  border: none;
  outline: none;
}
.node-menu {
  text-decoration: none;
  list-style: none;
  font-size: 1.5em;
  border: 2px solid grey;
  z-index: 2;
  position: absolute;
  top: 25px;
  left: 100%;
  transform: translateX(-100%);
  background-color: white;
  margin:0;
  padding: 0;
}

.node-menu li {
  padding: 0px 10px;
}

.node-menu li:not(:last-child) {
  border-bottom: 1px solid grey;
}

</style>
