<template>
  <div class="node-list-container">
    <ul>
        <div class="drag-target" data-insert-at="0"></div>
        <li v-for="(item, index) in items" :key="item.notebookId">
          <ListItem :item="item"></ListItem>
          <div class="drag-target" :data-insert-at="index + 1"></div>
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
    container.addEventListener("dragleave", this.onDragLeave);

    this.registerDropTargetEvents();
  },
  methods: {
    onDrop (event) {
      this.$el.classList.remove("dragging");
      event.target.classList.remove("dragging-over");
      const metadata = event.dataTransfer.getData("metadata");
      const html = event.dataTransfer.getData("text/html");
      console.log("metadata: " + metadata);
      console.log("html: " + html);
      const prevId = event.dataTransfer.getData("id");
      let insertAt = event.target.dataset.insertAt;
      if (prevId) {
        console.log("started searching for prevId " + prevId)
        for (let i = 0; i < this.items.length; i++) {
          if (this.items[i].notebookId == prevId) {
            console.log("found the prevId");
            this.items.splice(i, 1);
            if (i < insertAt) {
              insertAt--;
            }
            break;
          }
        }
      }
      const newItem = {html: html, notebookId: prevId ? prevId : ++this.greatestId, metadata: metadata}
      if (insertAt) {
        console.log("insert at " + insertAt);
        this.items.splice(insertAt, 0, newItem)
      } else {
        this.items.push(newItem);
      }

      setTimeout(this.registerDropTargetEvents, 10);

      event.preventDefault();
      event.stopPropagation();

    },
    onDragOver (event) {
      event.preventDefault();
    },
    onDragEnter (event) {
      this.$el.classList.toggle("dragging");
      event.preventDefault();
    },
    onDragLeave (event) {
      this.$el.classList.toggle("dragging");
      event.preventDefault();
    },

    registerDropTargetEvents() {
    document.querySelectorAll(".drag-target").forEach((element) => {
      if (!element.dataset.listenersAttached) {
        element.addEventListener("dragenter", function() {
          element.classList.add("dragging-over");
          event.preventDefault();
        });
        element.addEventListener("dragleave", function() {
          element.classList.remove("dragging-over");
          event.preventDefault();
        });
        element.addEventListener("dragover", this.onDragOver);
        element.addEventListener("drop", this.onDrop);
        element.setAttribute("data-listeners-attached", "true");
      }
    });
    }
  },
  data: function () {
    return {
      greatestId: 1,
      items: [
        {
          html: "<mark>this is a highlight, yay</mark>",
          notebookId: 0,
          metadata: "serialization info goes here",
        },
        {
          html: "<mark>so is <i>this</i> one</mark>",
          notebookId: 1,
          metadata: "serialization info goes here",
        },
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
.drag-target {
  width: 100%;
  margin: auto;
  height: 3px;
}

.dragging .drag-target {
  height: 6px;
  background-color: lightgray;
}

.drag-target.dragging-over {
  background-color: gray;
}
</style>
