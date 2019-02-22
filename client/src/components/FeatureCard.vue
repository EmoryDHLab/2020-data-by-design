<template lang="html">
  <div class="card feature-card">
    <div class="card-image">
      <slot name="image">
        <img :src="imageLink" alt="Feature">
      </slot>
    </div>
    <div class="card-content">
      <div class="--vertical-center">
        <h2 class="title --bold">
          <slot name="title"></slot>
        </h2>
        <p class="overview --text-grey">
          <slot></slot>
        </p>
        <button class="btn btn-link" @click="$router.push({name: featureRouteName})">
          <slot name="button">Learn More</slot>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "FeatureCard",
        props: {
            // comes from the router name you set to the feature!
            // allows button to link to the feature
            featureRouteName: {
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

  .feature-card {
    display: flex;
    /* -webkit-box-shadow: 4px 4px 7px -1px rgba(0,0,0,0.46); */
    /* -moz-box-shadow: 4px 4px 7px -1px rgba(0,0,0,0.46); */
  }

  .--vertical-center {
    align-self: center;
  }

  .feature-card .card-image {
    flex: 5 0;
    overflow: hidden;
  }
  .feature-card .card-image img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  .feature-card .card-content {
    display: flex;
    flex: 4;
    padding: 2em;
    text-align: start;
  }

  .title {
    font-size: 36px;
  }

  .overview {
    margin-top: -12px;
    margin-bottom: 40px;
  }

</style>