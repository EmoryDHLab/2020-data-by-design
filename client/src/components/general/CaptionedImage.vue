<template>
  <div :style="{width: width, height: height}">
    <img :src="require(`@/views/img/${src}`)" width="100%" height="100%">
    <p><slot></slot></p>
  </div>
</template>

<script>
  export default {
    props: {
      src: String,
      width: {
        default: '50%'
      },
      height: {
        default: '50%'
      }
    }
  }
</script>

<style scoped>
  div {
    margin: auto;
  }
p {
  text-align: center;
  font-family: Consolas;
  font-size: 90%;
}
</style>
