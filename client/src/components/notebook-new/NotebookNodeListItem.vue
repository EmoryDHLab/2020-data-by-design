<template>
  <div v-html="item.html">
  </div>
</template>

<script>
export default {
  mounted: function () {
    const span = this.$el;
    const onDragStart = (event) => {
      console.log("Dragging!")
      event.dataTransfer.setData("metadata", this.item.metadata);
      event.dataTransfer.setData("text/html", this.item.html);
      event.dataTransfer.setData("id", this.item.notebookId);
      console.dir(event.target);
      // event.dataTransfer.dropEffect = "link";
    }
    span.setAttribute("draggable", "true");
    span.addEventListener("dragstart", onDragStart);
  },
  props: {
    item: Object
  }
}
</script>

<style scoped>

</style>
