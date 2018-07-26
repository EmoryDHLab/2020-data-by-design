<template lang="html">
  <base-card class="card">
    <div class="card__image" :style="imageStyles"></div>
    <div class="card__main">
      <h2 class="card__title">
        <slot name="title">The Shape of History</slot>
      </h2>
      <slot></slot>
    </div>
  </base-card>
</template>

<script>
import BaseCard from './BaseCard'
export default {
  name: "VueCard",
  components: {
    BaseCard
  },
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
  text-align: center;
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
  display: flex;
  flex-flow: column;
  justify-content: space-around;
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
