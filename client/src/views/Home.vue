<template lang="html">
  <main>
    <div class="header">
      <h1 class="title">A Look back at history with graphics</h1>
      <h3 class="subtitle">These features are still under development <br> but feel free to look around!</h3>
      <div class="info">
      <button class="blue_button">All Chapters</button>
        <p>some</p>
        <p>some</p>
      </div>
    </div>

    <div class="chapters" align="center">
      <h1 class="title subclass">Chapters</h1>
      <h3 class="subtitle subclass">These features are still under development
        <br> but feel free to look around!</h3>
      <div class="chapter_slides">
        <ChapterCard
                chapterRouteName="PeabodyChapter"
                imageLink="https://cdn.britannica.com/s:300x300/37/21537-004-83DFAD79.jpg"
                class="main-slide">
          <template slot="tagline">An Investigation on Time</template>
          <template slot="title">Shape of History</template>
          Elizabeth Peabody's interactive approach to visualizing history
        </ChapterCard>
        <div class="slides_small">
          <ChapterMini class="mini" v-for="i in 3" :key="i"
                       imageLink="https://cdn.britannica.com/s:300x300/37/21537-004-83DFAD79.jpg"
                       chapterRouteName="PeabodyChapter"
                       darken="0.3">
            <template slot="title">Shape of History</template>
            Elizabeth Peabody's interactive approach to visualizing history
          </ChapterMini>
        </div>
      </div>
      <router-link to="/chapters">
      <button class="midbutton">All Chapters</button>
      </router-link>
    </div>

    <div class="features" align="center">
      <h1 class="title subclass">Features</h1>
      <h3 class="subtitle subclass">These features are still under development
        <br> but feel free to look around!</h3>
      <div class="feature_slides">
        <div class="slides_small">
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
import ChapterCard from '@/components/ChapterCard'
import ChapterMini from '@/components/ChapterMini'
import FeatureCard from "../components/FeatureCard";
import FeatureMini from "../components/FeatureMini";
export default {
  components: {
      FeatureMini,
      FeatureCard,
      ChapterCard,
      ChapterMini
  },
  data: {
    chapter: {title:' ', info: ' ', link: ' '},
      chList: [
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
  grid-gap: 100px;
}

.blue_button {
  background-color: #081F38;
  color: white;
  padding: 10px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 5px 5px 5px #081F30;
  margin-top: 50px;
}

.info{
  display: grid;
  grid-template-columns: 200px 200px 200px;
  grid-gap: 100px;
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
.feature_slides {
  margin-left: 200px;
  margin-right: 200px;
  margin-bottom: 50px;
  display: grid;
  grid-gap: 50px;
  grid-template-columns: auto 750px ;
  grid-template-rows: auto;
}

.chapter_slides {
  margin-left: 200px;
  margin-right: 200px;
  margin-bottom: 50px;
  display: grid;
  grid-gap: 50px;
  grid-template-columns: 750px auto;
  grid-template-rows: auto;
}

.slides_small {
  display: grid;
  grid-template-rows: auto auto;
  grid-gap: 15px;
}

.midbutton {
  background-color: #081F30;
  color: white;
  padding: 10px 24px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 5px 5px 5px #081F30;
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
