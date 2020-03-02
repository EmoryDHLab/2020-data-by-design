<template>
  <div class="notebook-container">
    <div class="notebook-header">
      <h2>Current Chapter Title</h2>
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

</style>