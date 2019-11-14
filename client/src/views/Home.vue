<template lang="html">
  <div class="">
    <main>
      <div id="home" class="header">
        <div class="text-content">
          <h1 class="title --biggest">Data by Design</h1>
          <h1 class="subtitle">
            An Interactive History of Data Visualization 1786&ndash;1900
          </h1>
          <hr>
          <h3 class="subtitle" style="font-size: 1em">What is the story we tell about the emergence of modern data visualization?
            <br>How might we tell that story differently?
          </h3>
          <div class="reading-progress">
            <button class="--uppercase btn"
              style="margin-right: 40px;"
              type="button"
              name="start-reading">Resume reading</button>
            <ProgressBar :range="[0, 160]" :value="155"/>
          </div>
        </div>
        <Picline :dataset="points" id="picline"/>
      </div>

      <div id="chapters" ref="chpts" class="chapters section" align="center">
        <h2 class="title subclass --bigger" style="margin-bottom: 40px;">Table of Contents</h2>
        <h3 class="subtitle" style="font-size: 1.5em">One sentence summary about the feature as a whole
          <br>the second line sine wim laenme
        </h3>
        <div class="chapter-links">
          <div class="card">
            <h2 class="boxHeading">A View “Simple and Complete”</h2>
            <h3 style="font-size: 1em; margin-top: 0em">William Playfair and the Origins of Objective Display</h3>
          </div>
          <div class="card">
            <h2 class="boxHeading">Every Datapoint a Person</h2>
          </div>
          <div class="card">
            <h2 class="boxHeading">Narratives of Possession</h2>
          </div>
          <div class="card">
            <h2 class="boxHeading">“Outlines to the Eye”</h2>
          </div>
          <div class="card">
            <h2 class="boxHeading">“The Color Line” as Data and Image</h2>
          </div>
        </div>
        <div class="chapter-list">
          <ChapListItem>
            <template slot="title">A View “Simple and Complete”</template>
            <template slot="tag">William Playfair and the Origins of Objective Display</template>
            Visualization has never been a neutral method. Each image carries an argument about how knowledge is produced, and who is authorized to produce it.
          </ChapListItem>
          <ChapListItem>
            <template slot="title">Every Datapoint a Person</template>
            <template slot="tag">The Brookes Diagram and the Humanity of Data</template>
            Images make arguments, but so too do people. How has the rhetorical force of visualization been wielded for political change?
          </ChapListItem>
          <ChapListItem>
            <template slot="title">Narratives of Possession</template>
            <template slot="tag"> Emma Willard, Shanawdithit, and the Power of Maps</template>
            Maps can make nations and break them apart. How can maps reflect multiple histories and futures?
          </ChapListItem>
          <ChapListItem>
            <template slot="title">“Outlines to the Eye”</template>
            <template slot="tag"> Elizabeth Palmer Peabody and the Work of Abstraction</template>
            We tend to think that data visualizations should be efficient and clear. But when happens when they are designed to make viewers pause and reflect?
          </ChapListItem>
          <ChapListItem>
            <template slot="title">“The Color Line” as Data and Image</template>
            <template slot="tag"> W. E. B. Du Bois and the Argument of Visual Display</template>
            Data has always been wielded as a tool of the state. How can it be used for liberation instead?
          </ChapListItem>
        </div>
      </div>

      <div id="features" class="features section" align="center">
        <h2 class="title subclass --bigger">Features</h2>
        <h3 class="subtitle subclass">These features are still under development
          <br> but feel free to look around!</h3>
        <div class="feature-list">
          <FeatureCard :largeMode="true" imageLink="bleh">
            <template slot="title">Take notes while you read</template>
            Take note while reading, and access them whenever.
          </FeatureCard>
          <FeatureCard :largeMode="false" imageLink="bleh">
            <template slot="title">Data Visualization For Reading</template>
            A short introduction on the chapter here and here.
          </FeatureCard>
          <FeatureCard :largeMode="false" imageLink="bleh">
            <template slot="title">Use Whiteboard For Idea Generation</template>
            A short introduction on the chapter here and here.
          </FeatureCard>
        </div>
      </div>

      <div id="credits" class="credits section">
        <h2 class="title subclass --bigger">Credits</h2>
        <h3 class="subtitle subclass">These features are still under development
          <br> but feel free to look around!</h3>
          <div class="card-grid">

            <div class="card name-card">
                <img src="https://media.wired.com/photos/598e35994ab8482c0d6946e0/master/w_1164,c_limit/phonepicutres-TA.jpg"
                     alt="placeholder" width="200" height="200">
                <h3 class="--big --uppercase">Dr. Lauren Klein</h3>
                <h3 class="description" style="font-weight: 300">description</h3>
            </div>
            <div class="card name-card">
                <img src="https://media.wired.com/photos/598e35994ab8482c0d6946e0/master/w_1164,c_limit/phonepicutres-TA.jpg"
                     alt="placeholder" width="200" height="200">
                <h3 class="--big --uppercase">Adam Hayward</h3>
                <h3 class="description" style="font-weight: 300">description</h3>
            </div>
            <div class="card name-card">
                <img src="https://media.wired.com/photos/598e35994ab8482c0d6946e0/master/w_1164,c_limit/phonepicutres-TA.jpg"
                     alt="placeholder" width="200" height="200">
                <h3 class="--big --uppercase">Jianing Fu</h3>
                <h3 class="description" style="font-weight: 300">description</h3>
            </div>
            <div class="card name-card">
                <img src="https://media.wired.com/photos/598e35994ab8482c0d6946e0/master/w_1164,c_limit/phonepicutres-TA.jpg"
                     alt="placeholder" width="200" height="200">
                <h3 class="--big --uppercase">Qing Tian</h3>
                <h3 class="description" style="font-weight: 300">description</h3>
            </div>
          </div>
      </div>
    </main>
    <footer>
      <p style="color: whitesmoke; padding: 1em">Designed and developed by Digital Humanities Lab</p>
    </footer>
  </div>
</template>

<script>
import ChapterCard from '../components/ChapterCard'
import Picline from '../components/vis/Picline'
import ChapterMini from '../components/ChapterMini'
import FeatureCard from "../components/FeatureCard";
import FeatureMini from "../components/FeatureMini";
import ChapListItem from '../components/general/ChapListItem';
import ProgressBar from '../components/vis/ProgressBar';
import * as d3 from 'd3';

// line1795.addEventListener('mouseover', function (e) {
//     e.target.setAttribute('fill', '#ff00cc');
// })

export default {
  components: {
      ChapListItem,
      FeatureMini,
      FeatureCard,
      ChapterCard,
      ChapterMini,
      Picline,
      ProgressBar
  },
  methods: {
    changeColor() {

    },
    colorBack() {

    }
  },
  data: () => ({
    points: [
      {
        id: 0,
        img: "blah/blah",
        year: 1786
      },
      {
        id: 1,
        img: "blah/blah",
        year: 1786
      },
      {
        id: 2,
        img: "blah/blah",
        year: 1786
      },
      {
        id: 3,
        img: "blah/blah",
        year: 1788
      },
      {
        id: 4,
        img: "blah/blah",
        year: 1801
      },
      {
        id: 5,
        img: "blah/blah",
        year: 1801
      },
      {
        id: 6,
        img: "blah/blah",
        year: 1801
      },
      {
        id: 7,
        img: "blah/blah",
        year: 1801
      },
      {
        id: 8,
        img: "blah/blah",
        year: 1801
      },
      {
        id: 9,
        img: "blah/blah",
        year: 1801
      },
      {
        id: 10,
        img: "blah/blah",
        year: 1821
      },
      {
        id: 11,
        img: "blah/blah",
        year: 1821
      },
      {
        id: 12,
        img: "bleh/bleh",
        year: 1858
      },
      {
        id: 13,
        img: "bleh/bleh",
        year: 1829
      },
      {
        id: 14,
        img: "bleh/bleh",
        year: 1829
      },
      {
        id: 15,
        img: "bleh/bleh",
        year: 1829
      },
      {
        id: 16,
        img: "bleh/bleh",
        year: 1829
      },
      {
        id: 17,
        img: "bleh/bleh",
        year: 1829
      },
      {
        id: 18,
        img: "bleh/bleh",
        year: 1829
      },
      {
        id: 19,
        img: "bleh/bleh",
        year: 1829
      },
      {
        id: 20,
        img: "bleh/bleh",
        year: 1829
      },
      {
        id: 21,
        img: "bleh/bleh",
        year: 1829
      },
      {
        id: 22,
        img: "bleh/bleh",
        year: 1829
      },
      {
        id: 23,
        img: "bleh/bleh",
        year: 1829
      },
      {
        id: 24,
        img: "bleh/bleh",
        year: 1829
      },
      {
        id: 25,
        img: "bleh/bleh",
        year: 1829
      },
      {
        id: 26,
        img: "bleh/bleh",
        year: 1829
      },
      {
        id: 27,
        img: "bleh/bleh",
        year: 1829
      },
      {
        id: 28,
        img: "bleh/bleh",
        year: 1829
      },
      {
        id: 29,
        img: "bleh/blrh",
        year: 1846
      },
      {
        id: 30,
        img: "bleh/blrh",
        year: 1856
      },
      {
        id: 31,
        img: "bleh/blrh",
        year: 1856
      },
      {
        id: 32,
        img: "bleh/blrh",
        year: 1856
      },
      {
        id: 33,
        img: "bleh/blrh",
        year: 1856
      },
      {
        id: 34,
        img: "bloo/bloo",
        year: 1900
      },
      {
        id: 35,
        img: "bloo/bloo",
        year: 1900
      },
      {
        id: 36,
        img: "bloo/bloo",
        year: 1900
      },
      {
        id: 37,
        img: "bloo/bloo",
        year: 1900
      },
      {
        id: 38,
        img: "bloo/bloo",
        year: 1900
      },
      {
        id: 39,
        img: "bloo/bloo",
        year: 1900
      },
      {
        id: 40,
        img: "bloo/bloo",
        year: 1900
      },
      {

        img: "bloo/bloo",
        year: 1900
      },
      {
        img: "bloo/bloo",
        year: 1900
      },
      {
        img: "bloo/bloo",
        year: 1900
      },
      {
        img: "bloo/bloo",
        year: 1900
      },
      {
        img: "bloo/bloo",
        year: 1900
      },
      {
        img: "bloo/bloo",
        year: 1900
      },
      {
        img: "bloo/bloo",
        year: 1900
      },
      {
        img: "bloo/bloo",
        year: 1900
      },
      {
        img: "bloo/bloo",
        year: 1900
      },
      {
        img: "bloo/bloo",
        year: 1900
      },
      {
        img: "bloo/bloo",
        year: 1900
      },
      {
        img: "bloo/bloo",
        year: 1900
      },
    ].reduce((obj, item, index) => ({
      ...obj,
      [index]: {
        year: item.year,
        href: item.img,
        id: index,
        x:0,
        y:0,
        width:10,
        height:10
      }
    }), {})
  })
}
</script>

<style scoped>

.title {
  margin-top: 100px;
}

.--biggest {
  font-size: 4em;
  color: #5b5b5b;
}

.--bigger {
  font-size: 3em;
  color:#4a4a4a;
}

.--big {
  font-size: 1.5em;
}

.subtitle {
  color: #5b5b5b;
  margin-top: 0;
}

.header {
  /* padding-left: 50px; */
}

.header .text-content {
  max-width: 50%;
}

.section {
  margin-top: 70px;
}

.reading-progress {
  display: flex;
}

.text-content h1.subtitle {
  margin-top: -30px;
}

.chapter-links {
  display: flex;
  align-items: stretch;
  justify-content: space-around;
  margin-bottom: 50px;
}

.chapter-links .card {
  padding: 1em;
  flex: 1;
  margin-right: 0.5em;
  margin-left: 0.5em;
  max-width: 250px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.chapter-links .card .title {
  flex: 1;
}

/* main {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 500px auto auto 700px auto;
  grid-gap: 100px;
} */

.section .subtitle {
  margin-top: -20px;
  margin-bottom: 40px;
}

.subclass {
  margin-top: 40px;
  text-align: center;
}
/*
.chapter-list {
  margin-right: 200px;
  margin-left: 200px;
} */
.card-grid {
  display: flex;
  justify-content: space-around;
}

.boxHeading{
  title: --bold --uppercase;
  font-family: Roboto;
  font-size: 1.3em;
}
main {
  max-width: 1500px;
  width: 80%;
  margin: 0px auto;
}

button {
  background-color:#4a90e2;
  color:white;
  border: 2px solid #4a90e2;
}
button:hover {
  color: #083871;
  border: 2px solid #083871;
  background-color: white;
}
button:active {
  color: white;
  border: 2px solid #083871;
  background-color: #083871;
}

.credits {
  margin-bottom: 50px;
}

.name-card {
  text-align: center;
  padding: 30px 30px;
  flex: 1;
  max-width: 250px;
}

.name-card .description {
  margin: 0
}

footer {
  left: 0;
  bottom: 0;
  display: grid;
  grid-template-columns: auto 200px;
  background-color: slategrey;
  /* margin: 0px -100px; */
  padding: 10px 100px;
}

/* .feature-list {
  margin-top: 70px;
} */

.feature-list div:not(:last-child) {
  margin-bottom: 48px;
}

img{
    border-radius: 50%;
}

</style>
