<template lang="html">
  <main>
    <div class="header">
      <h1 class="title">A Look back at history with graphics</h1>
      <h3 class="subtitle">These features are still under development <br> but feel free to look around!</h3>
      <button class="blue_button">All Chapters</button>
    </div>

    <div class="features">
      <h1 class="title subclass">Features</h1>
      <h3 class="subtitle subclass">These features are still under development
        <br> but feel free to look around!</h3>
      <div class="card-grid">
        <vue-card
          class="card-grid__card"
          src="#">
          <template slot="title">Features#1</template>
          <h3 class="card-grid__card__subtitle">Information about chapters</h3>
          <router-link to="/features/notebook" class="lmore">Learn More</router-link>
        </vue-card>
        <vue-card
          class="card-grid__card"
          src="#">
          <template slot="title">Features#2</template>
          <h3 class="card-grid__card__subtitle">
            Information about chapters
          </h3>
          <router-link to="/chapters" class="lmore">Learn More</router-link>
        </vue-card>
        <vue-card
                class="card-grid__card"
                src="#">
          <template slot="title">Features#3</template>
          <h3 class="card-grid__card__subtitle">
            Information about chapters
          </h3>
          <router-link to="/chapters" class="lmore">Learn More</router-link>
        </vue-card>
      </div>
    </div>

    <div class="chapters">
      <h1 class="title subclass">Chapters</h1>
      <h3 class="subtitle subclass">These features are still under development
        <br> but feel free to look around!</h3>
    </div>

    <div class="credits">
      <h1 class="title subclass">Credits</h1>
      <h3 style="text-align: center">These features are still under development
        <br> but feel free to look around!</h3>
        <div class="card-grid">
            <div class="nameCard">
                <img src="http://shapeofhistory.net/css/img/peabody_original_2.jpg"
                     alt="placeholder" width="250" height="250">
                <h3>Name1</h3>
                <h3 style="font-weight: 300">description</h3>
            </div>
            <div class="nameCard">
                <img src="http://shapeofhistory.net/css/img/peabody_original_2.jpg"
                     alt="placeholder" width="250" height="250">
                <h3>Name2</h3>
                <h3 style="font-weight: 300">description</h3>
            </div>
            <div class="nameCard">
                <img src="http://shapeofhistory.net/css/img/peabody_original_2.jpg"
                     alt="placeholder" width="250" height="250">
                <h3>Name3</h3>
                <h3 style="font-weight: 300">description</h3>
            </div>
            <div class="nameCard">
                <img src="http://shapeofhistory.net/css/img/peabody_original_2.jpg"
                     alt="placeholder" width="250" height="250">
                <h3>Name4</h3>
                <h3 style="font-weight: 300">description</h3>
            </div>
        </div>
    </div>
  </main>
</template>

<script>
import VueCard from '@/components/general/VueCard'
import BaseButton from '@/components/forms/BaseButton'
export default {
  components: {
    VueCard,
    BaseButton
  }
}
</script>

<style scoped>

.title, .subtitle {
  font-weight: 400;
  margin-top: 100px;
}
.subtitle {
  color: grey;
  margin-top: 0;
}

.header{
  padding-left: 50px;
  margin-bottom: 1000px;
}

main {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 500px 700px 700px 700px;
}
.blue_button {
  background-color: royalblue;
  color: white;
  padding: 10px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 5px 5px 5px rgba(65, 105, 225, 0.48);
  margin-top: 50px;
}

.subclass {
  margin-top: 40px;
  text-align: center;
}
.card-grid {
  margin-top: 70px;
  display: flex;
  justify-content: space-around;
}
.card-grid__card {
  width: auto;
  min-width: 400px;
  height: 40vh;
  min-height: 424px;
}

.lmore {
  font-size: 20px;
  font-weight: 700;
  color: royalblue;
  font-family: 'Raleway', sans-serif;
}

.card-grid__card__subtitle {
  color: grey;
  font-size: .9em;
}

.credits {
  color: white;
  background-color: #399687;
  margin-left: 50px;
  margin-right: 50px;
}

.nameCard {
  text-align: center;
}

img{
    border-radius: 50%;
}

</style>
