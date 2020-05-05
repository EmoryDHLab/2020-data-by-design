<template>
  <div class="notebook-container">
    <div class="notebook-header">
      <div>
        <h2>Notebook</h2>
        <h4>Current Chapter Title</h4>
      </div>
      <div>
        <h4>Welcome, Dan!</h4>
      </div>
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
.notebook-header {
  display: flex;
  justify-content: space-between;
  margin-right: 60px;
}
.notebook-header h4, h2 {
  margin: 0px;
}
.notebook-header {
  padding-top: 20px;
}
.notebook-container {
  user-select: none;
}
.notebook-body {
  margin-right: 60px;
}
</style>
