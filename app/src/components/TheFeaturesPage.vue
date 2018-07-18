<template lang="html">
  <main>
    <h1 class="title">Features</h1>
    <h3 class="subtitle">These features are still under development, but feel free to look around!</h3>
    <div class="card-grid">
      <vue-card
        class="card-grid__card"
        src="#"
        v-for="n in 4" :key="n">
        <template slot="title">Notebook</template>
        <h3 class="card-grid__card__subtitle">
          Drag and drop quotes, images, and interactive content from the chapters, then write up your own notes around them
        </h3>
        <div style="background-color: grey;width: 100%; height:15%">vis</div>
        <router-link to="/features/notebook">Learn More</router-link>
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
    grid-template-columns: repeat(auto-fill, minmax(20vw, 300px));
    grid-gap: 2rem;
    justify-content: space-around;
  }
  .card-grid__card {
    width: 20vw;
    min-width: 300px;
    height: 60vh;
    min-height: 424px;
  }
  .card-grid__card__title {
    margin-top: 0;
    margin-bottom: 16px;
  }
  .card-grid__card__subtitle {
    color: grey;
    font-size: .9em;
  }
</style>
