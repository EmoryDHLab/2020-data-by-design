<template>
  <div class="node-list-container">
    <ul>
        <li v-for="item in items" :key="item.html" v-html="item.html">
        </li>
    </ul>
  </div>
</template>

<script>

import ListItem from "./NotebookNodeListItem"
export default {
  components: {
    ListItem
  },
  mounted: function () {
    const container = document.getElementsByClassName("node-list-container")[0];
    container.addEventListener("drop", this.onDrop);
    container.addEventListener("dragover", this.onDragOver);
    container.addEventListener("dragenter", this.onDragEnter);
  },
  methods: {
    onDrop (event) {
      console.log("Dropped");
      const metadata = event.dataTransfer.getData("text/plain");
      const html = event.dataTransfer.getData("text/html");
      this.items.push({html: html, metadata: metadata});
      event.preventDefault();

    },
    onDragOver (event) {
      // event.dataTransfer.dropEffect = 'link'
      console.log("Dragging Over")
      event.preventDefault();

    },
    onDragEnter (event) {
      event.preventDefault();
    }
  },
  data: function () {
    return {
      items: [
        {
          html: "<mark>this is a highlight, yay</mark>",
          metadata: "serialization info goes here",
        },
        {
          html: "<mark>so is <i>this</i> one",
          metadata: "serialization info goes here",
        }
      ]
    }
  }
}
</script>

<style scoped>
.node-list-container {
  background-color:lavender;
}
ul {
  list-style: square;
}
</style>
