<template lang="html">
  <div class="card">
    <div class="card__image" :style="imageStyles"></div>
    <div class="card__main">
      <h2 class="card__title">
        <slot name="title">The Shape of History</slot>
      </h2>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "VueCard",
  props: {
    src: {
      type: String,
      required: true,
    }
  },
  computed: {
    imageStyles () {
      return {
        'background-image': `url(${this.src})`
      }
    }
  }
}
</script>

<style scoped>
.card {
  overflow: hidden;
  text-align: center;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0px 0px 20px 1px grey;
}
.card__image {
  /* background-color: black; */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height:40%;
}

.card__main {
  height: 60%;
  padding: 24px;
  padding-top: 30px;
  box-sizing: border-box;
}

.card__content {
  height: calc(100% - 45px)
}

.card__title {
  margin-top: 0;
  margin-bottom: 16px;
  line-height: 32px;
}
.card__subtitle {
  color: grey;
  font-size: .9em;
}
</style>
