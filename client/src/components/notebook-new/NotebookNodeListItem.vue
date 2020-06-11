<template>
  <div v-if="item.html" v-html="item.html">
  </div>
</template>

<script>
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
  }
}
</script>

<style scoped>

</style>
