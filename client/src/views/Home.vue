<template lang="html">
  <main>
    <div class="header">
      <h1 class="title">An Interactive History of Data Visualization <br>1786-1900</h1>
      <h3 class="subtitle" style="padding-bottom: 80px">What is the story we tell about the emergence of modern data visualization?
        <br>How might we tell that story differently?
      </h3>
      <svg width="800px" height="300px">
        <rect id="timeline" x='0' y='96' height="12px" width="800px" fill="Silver" rx="6px" ry="6px"></rect>
        <text x="10" y="45" font-size="15px">1795</text>
        <rect id="1795" x='20' y='55' height="100px" width="12px"
              fill="#4A90E2" rx="6px" ry="6px"
              @mouseenter='changeColor'
              @mouseout='colorBack'></rect>
        <rect x='60' y='55' height="100px" width="12px" fill="#4A90E2" rx="6px" ry="6px"></rect>
        <rect x='100' y='55' height="100px" width="12px" fill="#4A90E2" rx="6px" ry="6px"></rect>
        <rect x='250' y='55' height="100px" width="12px" fill="#4A90E2" rx="6px" ry="6px"></rect>
        <rect x='400' y='55' height="100px" width="12px" fill="#4A90E2" rx="6px" ry="6px"></rect>
        <rect x='670' y='55' height="100px" width="12px" fill="#4A90E2" rx="6px" ry="6px"></rect>
        <g transform="translate(100.000000,160.000000) scale(0.050000,-0.05000)"
           fill="#4A90E2" stroke="none">
          <path d="M708 2530 l-76 -160 69 0 69 0 0 -970 c0 -963 0 -970 20 -970 20 0 20 7 20 970 l0 970 69 0 69 0 -76 160 c-42 88 -79 160 -82 160 -3 0 -40 -72 -82 -160z"/>
        </g>
      </svg>
    </div>

    <div class="chapters" align="center">
      <h1 class="title subclass">Chapters</h1>
      <h3 class="subtitle subclass">These features are still under development
        <br> but feel free to look around!</h3>
      <div class="chList">
        <ChapList>
          <template slot="title">A View “Simple and Complete”</template>
          <template slot="tag">William Playfair and the Origins of Objective Display</template>
          VIsualization has never been a neutral method. Each image carries an argument about how knowledge is produced, and who is authorized to produce it.
        </ChapList>
        <ChapList>
          <template slot="title">Every Datapoint a Person</template>
          <template slot="tag">The Brookes Diagram and the Humanity of Data</template>
          Images make arguments, but so too do people. How has the rhetorical force of visualization been wielded for political change?
        </ChapList>
        <ChapList>
          <template slot="title">Narratives of Possession </template>
          <template slot="tag"> Emma Willard, Shanawdithit, and the Power of Maps</template>
          Maps can make nations and break them apart. How can maps reflect multiple histories and futures?
        </ChapList>
        <ChapList>
          <template slot="title">“Outlines to the Eye”</template>
          <template slot="tag"> Elizabeth Palmer Peabody and the Work of Abstraction</template>
          We tend to think that data visualizations should be efficient and clear. But when happens when they are designed to make viewers pause and reflect?
        </ChapList>
        <ChapList>
          <template slot="title">“The Color Line” as Data and Image</template>
          <template slot="tag"> W. E. B. Du Bois and the Argument of Visual Display</template>
          Data has always been wielded as a tool of the state. How can it be used for liberation instead?
        </ChapList>
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
          <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
          <a class="next" onclick="plusSlides(1)">&#10095;</a>
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

    <footer>
      <p style="color: whitesmoke; padding: 1em">Designed and developed by Digital Humanities Lab</p>
      <button class="white_button">Sign in/Sign up </button>
    </footer>

  </main>
</template>

<script>
import ChapterCard from '../components/ChapterCard'
import ChapterMini from '../components/ChapterMini'
import FeatureCard from "../components/FeatureCard";
import FeatureMini from "../components/FeatureMini";
import ChapList from '../components/general/ChapList';
import * as d3 from 'd3';

// line1795.addEventListener('mouseover', function (e) {
//     e.target.setAttribute('fill', '#ff00cc');
// })

export default {
  components: {
      ChapList,
      FeatureMini,
      FeatureCard,
      ChapterCard,
      ChapterMini
  },

    data: {

    },
    methods: {
      changeColor() {

      },
      colorBack() {

      }
    }
}

// let slideIndex = 1;
// showSlides(slideIndex);
//
// // Next/previous controls
// function plusSlides(n) {
//     showSlides(slideIndex += n);
// }
//
// function showSlides(n) {
//     let i;
//     let slides = document.getElementsByClassName("slides_small");
//     if (n > slides.length) {slideIndex = 1}
//     if (n < 1) {slideIndex = slides.length}
//     for (i = 0; i < slides.length; i++) {
//         slides[i].style.display = "none";
//     }
//     slides[slideIndex-1].style.display = "block";
// }

</script>

<style scoped>

.title {
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
  grid-template-rows: 500px auto auto 700px auto;
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
  grid-template-columns: 200px 150px 150px;
  grid-gap: 100px;
}
.subclass {
  margin-top: 40px;
  text-align: center;
}

.chList {
  margin-right: 200px;
  margin-left: 200px;
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

.slides_small {
  display: grid;
  grid-template-rows: auto auto;
  grid-gap: 15px;
}

.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}

.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

.prev:hover, .next:hover {
  background-color: rgba(0,0,0,0.8);
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

footer {
  left: 0;
  bottom: 0;
  width: 100%;
  display: grid;
  grid-template-columns: auto 200px;
  background-color: slategrey;
}

.white_button {
  margin: 10px 10px 10px 10px;
  background-color: whitesmoke;
  color: black;
  padding: 5px 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}

img{
    border-radius: 50%;
}

</style>
