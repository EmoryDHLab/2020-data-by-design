<template>
  <div>
    <img :src="require(`@/views/img/${src}`)" :width="width">
    <p><slot></slot></p>
  </div>
</template>

<script>
  export default {
    props: {
      src: String,
      width: {
        default: '50%',
      },
    },
    mounted () {
      this.$store.dispatch('chapters/registerImage', {element: this.$el});
    }
  }
</script>

<style scoped>
div {
  margin: auto;
  text-align: center;
}
p {
  text-align: center;
  font-family: Consolas;
  font-size: 90%;
}
</style>
