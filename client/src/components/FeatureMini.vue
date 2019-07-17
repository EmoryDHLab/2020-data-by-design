<template lang="html">
  <div class="card chapter-mini" :style="getStyle">
    <h2 class="title --bold --uppercase">
      <slot name="title"></slot>
    </h2>
    <p class="overview --text-yellow">
      <slot></slot>
    </p>
  </div>
</template>

<script>
    export default {
        name: "FeatureMini",
        props: {
            chapterRouteName: {
                type: String,
                required: true
            },
            imageLink: {
                type: String,
                required: true
            },
            darken: {
                type: Number(),
                validator: (x) => (x <= 1 && x >= 0),
                default: 0
            }
        },
        computed: {
            getStyle () {
                let backgroundImage = `linear-gradient(rgba(0, 0, 0, ${this.darken}), `
                    + `rgba(0, 0, 0, ${this.darken})), url('${this.imageLink}')`
                return {
                    backgroundImage
                }
            }
        }
    }
</script>

<style lang="css" scoped>
  .chapter-mini {
    background-repeat: no-repeat;
    background-position: top;
    background-size: cover;
    padding: 1em;
    text-align: start;

  }

  .chapter-mini .title {
    margin-top: 0;
    color: white;
  }

</style>
