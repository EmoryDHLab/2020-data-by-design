<template>
  <div>
    <div v-if="item.html" v-html="item.html" :class="{highlight: isHighlight}">
    </div>
    <component v-if="isVis" :is="currComponent" v-bind="currComponentProps">
    </component>
  </div>
</template>

<script>

import noteableVisualizations from "../../noteableVisualizations";
import { notebookTypes } from "dxd-common"

export default {
  mounted: function () {
    const span = this.$el;
    const onDragStart = (event) => {
      console.log("Dragging!")
      this.$store.dispatch("startDrag", this.item)
      console.dir(event.target);
      // event.dataTransfer.dropEffect = "link";
    }
    span.setAttribute("draggable", "true");
    span.addEventListener("dragstart", onDragStart);
  },
  props: {
    item: Object
  },
  computed: {
    isVis () {
      return this.item.type == notebookTypes.VISUALIZATION;
    },
    isHighlight () {
      return this.item.type == notebookTypes.TEXT_HIGHLIGHT;
    },
    currComponent () {
      if (this.isVis) {
        return this.item.metadata.name;
      }
    },
    staticDataset () {
      if (this.item && this.item.data) {
        return this.item.data.static;
      }
    },
    mutableDataset () {
      if (this.item && this.item.data) {
        return this.item.data.mutable;
      }
    },
    itemProps () {
      if (this.item && this.item.metadata && this.item.metadata.props) {
        return this.item.metadata.props;
      }
      return {}
    },
    currComponentProps () {
      return Object.assign({
        isInNotebook: true,
        showIndicator: false,
        width: '216px',
        ...this.staticDataset && { staticDataset: this.staticDataset },
        ...this.mutableDataset && { mutableDataset: this.mutableDataset }
      }, this.itemProps)
    }
  },
  components: noteableVisualizations
}
</script>

<style scoped>
.highlight {
  display: inline;
  background-color: yellow;
}
</style>
