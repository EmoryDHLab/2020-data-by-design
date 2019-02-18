<template lang="html">
  <li @mouseenter="hovered=true" @mouseleave="hovered=false">
    <div v-handle class="drag-bar" v-if="useDragHandle">
      <div style="flex:1;" v-if="hovered">
        <slot name="drag-bar"/>
      </div>
      <div class="drag-bar__icon-wrap" v-if="hovered">
        <font-awesome-icon class="drag-bar__icon-wrap__icon":icon="icon"/>
      </div>
    </div>
    <slot/>
  </li>
</template>

<script>
import { faBars } from '@fortawesome/fontawesome-free-solid'
import { ElementMixin, HandleDirective } from 'vue-slicksort'

export default {
  mixins: [ElementMixin],
  directives: { handle: HandleDirective },
  props: {
    useDragHandle: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    hovered: false
  }),
  computed: {
    icon () {
      return faBars
    },
  }
}
</script>

<style lang="css" scoped>
li {
  list-style: none;
  background-image: none;
  background-repeat: none;
  background-position: 0;
}
.drag-bar {
  background: white;
  height: 20px;
  display: flex;
  cursor: move; /* fallback if grab cursor is unsupported */
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
  line-height: 15px;
  font-size: 15px;
}
li:hover .drag-bar {
  background-color: rgb(200,200,200);
}
.drag-bar:active {
  cursor: move;
  cursor: grabbing;
  cursor: -moz-grabbing;
  cursor: -webkit-grabbing;
}
.drag-bar__icon-wrap {
  align-self: center;
  flex: 0 1 40px;
  text-align: center;
  font-weight: 100;
}
.drag-bar__icon-wrap__icon {
  transform: scaleX(2);
  color: grey;
}
</style>
