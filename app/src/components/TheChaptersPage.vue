<template lang="html">
  <main>
    <h1 class="title">Chapters</h1>
    <h3 class="subtitle">These chapters are still under development, but feel free to look around!</h3>
    <div class="card-grid">
      <vue-card
        class="card-grid__card"
        src="http://shapeofhistory.net/css/img/peabody_original_2.jpg"
        v-for="n in 5" :key="n">
        <template slot="title">The Shape of History</template>
        <h3 class="card-grid__card__subtitle">
          Why do we visualize data? This non-standard
          visualization provides a unique perspective.
        </h3>
        <div style="background-color: grey;width: 100%; height:15%">vis</div>
        <router-link to="/chapters/shape-of-history">View Chapter</router-link>
      </vue-card>
    </div>
  </main>
</template>

<script>
import VueCard from './general/VueCard'
export default {
  components: {
    VueCard
  }
}
</script>

<style scoped>
  .title, .subtitle {
    text-align: center;
    margin: 16px 0;
  }
  .subtitle {
    color: grey;
    margin-top: 0;
  }

  main {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 80px 80px auto;
  }

  .card-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 2em;
    justify-items: center;
  }
  .card-grid__card {
    break-inside: avoid;
    max-width: 500px;
    width: 20vw;
    min-width: 300px;
    height: 60vh;
    min-height: 424px;
  }
  @media (max-width: 1024px) {
    .card-grid {
      grid-template-columns: 1fr;
    }
  }
  .card-grid__card__subtitle {
    color: grey;
    font-size: .9em;
  }
</style>
