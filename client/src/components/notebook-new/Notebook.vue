<template>
  <div class="notebook-container">
    <div class="notebook-header">
      <h2>Notebook</h2>
      <h4>Current Chapter Title</h4>
    </div>
    <div class="notebook-body">
      <NodeList></NodeList>
    </div>
  </div>
</template>

<script>
import NodeList from "./NotebookNodeList"
export default {
  components: {
    NodeList
  }
}

</script>

<style scoped>
.notebook-header h4, h2 {
  margin: 0px;
}
.notebook-header {
  padding-top: 20px;
}
.notebook-container {
  user-select: none;
}
</style>
