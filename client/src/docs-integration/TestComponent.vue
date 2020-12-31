<template>
  <div>
    <span v-for="i in count" v-html="word"></span>
  </div>
</template>

<script>
  export default {
    props: {
      count: Number,
      word: String
    }
  }
</script>

<style scoped>
  span {
    margin-right: 2px;
  }
</style>
