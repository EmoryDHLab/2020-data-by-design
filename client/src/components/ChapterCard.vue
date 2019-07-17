<template lang="html">
  <div class="card chapter-card">
    <div class="card-image">
      <slot name="image">
        <img :src="imageLink" alt="Elizabeth">
      </slot>
    </div>
    <div class="card-content">
      <div class="--vertical-center">
        <p class="tagline --dark-blue --bold --uppercase">
          <slot name="tagline"></slot>
        </p>
        <div class="divider"></div>
        <h2 class="title --bold --uppercase">
          <slot name="title"></slot>
        </h2>
        <p class="overview --text-yellow --bold">
          <slot></slot>
        </p>
        <button class="btn btn-link" @click="$router.push({name: chapterRouteName})">
          <slot name="button">Read chapter</slot>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // comes from the router name you set to the chapter!
    // allows button to link to the chapter
    chapterRouteName: {
      type: String,
      required: true
    },
    imageLink: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="css" scoped>
.chapter-card {
  display: flex;
  /* -webkit-box-shadow: 4px 4px 7px -1px rgba(0,0,0,0.46); */
  /* -moz-box-shadow: 4px 4px 7px -1px rgba(0,0,0,0.46); */
}

.--vertical-center {
  align-self: center;
}

.chapter-card .card-image {
  flex: 5 0;
  overflow: hidden;
}
.chapter-card .card-image img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.chapter-card .card-content {
  display: flex;
  flex: 4;
  padding: 2em;
  text-align: start;
}

.tagline {
  font-size: 15px;
  letter-spacing: 1.5px;
}

.divider {
  height: 5px;
  width: 60px;
  border-radius: 2px;
  background-color: rgb(180, 180, 180);
  margin-bottom: 48px;
}

.title {
  font-size: 36px;
}

.overview {
  margin-top: -12px;
  margin-bottom: 40px;
}

</style>
