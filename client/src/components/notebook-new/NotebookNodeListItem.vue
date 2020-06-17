<template>
  <div>
    <div v-if="item.html" v-html="item.html">
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
    currComponent () {
      if (this.isVis) {
        return this.item.metadata;
      }
    },
    currComponentProps () {
      return {
        isInNotebook: true,
        showIndicator: false,
        ...this.item.data.static && { staticDataset: this.item.data.static },
        ...this.item.data.mutable && { mutableDataset: this.item.data.mutable }
      }
    }
  },
  components: noteableVisualizations
}
</script>

<style scoped>

</style>
