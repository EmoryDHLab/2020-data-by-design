<template>
  <div class="container">
    <textarea v-model="note" name="note"></textarea>
    <button type="button" name="add note" @click="onButtonClick">Add Note</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      note: ""
    }
  },
  methods: {
    onButtonClick() {
      this.$emit('addNote', this.note);
      this.note = "";
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
}
textarea {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
