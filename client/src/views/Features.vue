<template lang="html">
  <main>
    <h1 class="title --text-center">Features</h1>
    <div class="slides">
      <div class="minis">
        <FeatureMini class="mini" v-for="i in 2" :key="i"
                     imageLink="https://cdn.britannica.com/s:300x300/37/21537-004-83DFAD79.jpg"
                     chapterRouteName="PeabodyChapter"
                     darken="0.3">
          <template slot="title">Features </template>
          Some Features Introduced Here.
        </FeatureMini>
      </div>
      <FeatureCard
              chapterRouteName="PeabodyChapter"
              imageLink="https://cdn.britannica.com/s:300x300/37/21537-004-83DFAD79.jpg"
              class="main-slide">
        <template slot="tagline">An Investigation on Time</template>
        <template slot="title">Take Nodes While You Read</template>
        Some Features Introduced Here.
      </FeatureCard>
    </div>
  </main>
</template>

<script>
    import FeatureCard from '@/components/FeatureCard'
    import FeatureMini from '@/components/FeatureMini'
    export default {
        components: {
            FeatureCard,
            FeatureMini
        }
    }
</script>

<style scoped>
  .slides {
    display: flex;
    height: 600px;
    padding: 0 15em;
  }
  .main-slide {
    flex: 4;
  }
  .minis {
    padding: 0 36px;
    flex: 2;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .mini {
    width: 300px;
    margin-bottom: 20px;
  }

</style>
