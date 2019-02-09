<template lang="html">
  <main>
    <div class="header">
      <h1 class="title">A Look back at history with graphics</h1>
      <h3 class="subtitle">These features are still under development <br> but feel free to look around!</h3>
      <button class="blue_button">All Chapters</button>
    </div>

    <div class="chapters" align="center">
      <h1 class="title subclass">Chapters</h1>
      <h3 class="subtitle subclass">These features are still under development
        <br> but feel free to look around!</h3>
      <div class="chapter_slides">
        <button v-on: click= "prev">prev</button>
        <vue-card class="slides__card" src="#">
          <template slot="title">Chapters#1</template>
          <h3 class="card-grid__card__subtitle">Information about chapters</h3>
          <router-link to="/features/notebook" class="lmore">Learn More</router-link>
        </vue-card>
        <div class="slides_small">
        <vue-card class="chapter_slides_small" src="#">
          <template slot="title">Chapters#2</template>
          <h3 class="card-grid__card__subtitle">Information about chapters</h3>
          <router-link to="/features/notebook" class="lmore">Learn More</router-link>
        </vue-card>
          <vue-card class="chapter_slides_small" src="#">
            <template slot="title">Chapters#3</template>
            <h3 class="card-grid__card__subtitle">Information about chapters</h3>
            <router-link to="/features/notebook" class="lmore">Learn More</router-link>
          </vue-card>
        </div>
        <button v-on: click="next">next</button>
      </div>
      <router-link to="/chapters">
      <button class="midbutton">All Chapters</button>
      </router-link>
    </div>

    <div class="features" align="center">
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
      <router-link to="/features">
      <button class="midbutton">All Features</button>
      </router-link>
    </div>

    <div class="credits">
      <h1 class="title subclass">Credits</h1>
      <h3 style="text-align: center">These features are still under development
        <br> but feel free to look around!</h3>
        <div class="card-grid">
            <div class="nameCard">
                <img src="https://media.wired.com/photos/598e35994ab8482c0d6946e0/master/w_1164,c_limit/phonepicutres-TA.jpg"
                     alt="placeholder" width="250" height="250">
                <h3>Name1</h3>
                <h3 style="font-weight: 300">description</h3>
            </div>
            <div class="nameCard">
                <img src="https://media.wired.com/photos/598e35994ab8482c0d6946e0/master/w_1164,c_limit/phonepicutres-TA.jpg"
                     alt="placeholder" width="250" height="250">
                <h3>Name2</h3>
                <h3 style="font-weight: 300">description</h3>
            </div>
            <div class="nameCard">
                <img src="https://media.wired.com/photos/598e35994ab8482c0d6946e0/master/w_1164,c_limit/phonepicutres-TA.jpg"
                     alt="placeholder" width="250" height="250">
                <h3>Name3</h3>
                <h3 style="font-weight: 300">description</h3>
            </div>
            <div class="nameCard">
                <img src="https://media.wired.com/photos/598e35994ab8482c0d6946e0/master/w_1164,c_limit/phonepicutres-TA.jpg"
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
  },
  data: {
    chapter: {title:' ', info: ' ', link: ' '},
      chList: [
          {title:'chpater1', info:'someinfo', link:'/features/notebook'},
          {title:'chpater2', info:'someinfo', link:'/features/notebook'},
          {title:'chpater3', info:'someinfo', link:'/features/notebook'},
      ]
  },
  methods: {
    prev() {

    },
    next() {

    }
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
  grid-template-rows: 500px auto auto 700px;
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

.chapter_slides {
  margin-left: 150px;
  margin-right: 150px;
  display: grid;
  grid-gap: 50px;
  grid-template-columns: 30px 700px auto 30px;
  grid-template-rows: auto;
}

.chapter_slides_small {
  max-height: 200px;
  min-width: 150px;
  justify-content: space-evenly;
}

.slides_small {
  display: grid;
  grid-template-rows: auto auto;
  grid-gap: 15px;
}

.slides__card {
  min-width: 400px;
  height: 40vh;
  min-height: 450px;
  margin-bottom: 40px;
}

.card-grid__card {
  min-width: 400px;
  height: 40vh;
  min-height: 424px;
  margin-bottom: 40px;
}

.lmore {
  font-size: 20px;
  font-weight: 700;
  color: royalblue;
  font-family: 'Raleway', sans-serif;
}

.midbutton {
  background-color: royalblue;
  color: white;
  padding: 10px 24px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 5px 5px 5px rgba(65, 105, 225, 0.48);
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
  margin-top: 70px;
}

.nameCard {
  text-align: center;
}

img{
    border-radius: 50%;
}

</style>
