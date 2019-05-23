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
          <h3 class="subtitle" style="font-size: 1.5em">What is the story we tell about the emergence of modern data visualization?
            <br>How might we tell that story differently?
          </h3>
          <div class="reading-progress">
            <button class="--uppercase btn"
              style="margin-right: 40px"
              type="button"
              name="start-reading">Resume reading</button>
            <ProgressBar :range="[0, 160]" :value="155"/>
          </div>
        </div>
        <Picline :points="points"/>
      </div>

      <div id="chapters" class="chapters section" align="center">
        <h1 class="title subclass --bigger" style="margin-bottom: 40px;">Table of Contents</h1>
        <div class="chapter-links">
          <div class="card">
            <h2 style="title --bold --uppercase">A View “Simple and Complete”</h2>
          </div>
          <div class="card">
            <h2 style="title --bold --uppercase">Every Datapoint a Person</h2>
          </div>
          <div class="card">
            <h2 style="title --bold --uppercase">Narratives of Possession</h2>
          </div>
          <div class="card">
            <h2 style="title --bold --uppercase">“Outlines to the Eye”</h2>
          </div>
          <div class="card">
            <h2 style="title --bold --uppercase">“The Color Line” as Data and Image</h2>
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
        <h1 class="title subclass --bigger">Features</h1>
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
        <h1 class="title subclass --bigger">Credits</h1>
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
      <button class="white_button">Sign in/Sign up </button>
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
    points: [{
        img: "blah/blah",
        year: 1786
      },
      {
        img: "blah/blah",
        year: 1786
      },
      {
        img: "blah/blah",
        year: 1786
      },
      {
        img: "blah/blah",
        year: 1788
      },
      {
        img: "blah/blah",
        year: 1801
      },
      {
        img: "blah/blah",
        year: 1801
      },
      {
        img: "blah/blah",
        year: 1801
      },
      {
        img: "blah/blah",
        year: 1801
      },
      {
        img: "blah/blah",
        year: 1801
      },
      {
        img: "blah/blah",
        year: 1801
      },
      {
        img: "blah/blah",
        year: 1821
      },
      {
        img: "blah/blah",
        year: 1821
      },
      {
        img: "bleh/bleh",
        year: 1858
      },
      {
        img: "bleh/bleh",
        year: 1829
      },
      {
        img: "bleh/bleh",
        year: 1829
      },
      {
        img: "bleh/bleh",
        year: 1829
      },
      {
        img: "bleh/bleh",
        year: 1829
      },
      {
        img: "bleh/bleh",
        year: 1829
      },
      {
        img: "bleh/bleh",
        year: 1829
      },
      {
        img: "bleh/bleh",
        year: 1829
      },
      {
        img: "bleh/bleh",
        year: 1829
      },
      {
        img: "bleh/bleh",
        year: 1829
      },
      {
        img: "bleh/bleh",
        year: 1829
      },
      {
        img: "bleh/bleh",
        year: 1829
      },
      {
        img: "bleh/bleh",
        year: 1829
      },
      {
        img: "bleh/bleh",
        year: 1829
      },
      {
        img: "bleh/bleh",
        year: 1829
      },
      {
        img: "bleh/bleh",
        year: 1829
      },
      {
        img: "bleh/bleh",
        year: 1829
      },
      {
        img: "bleh/blrh",
        year: 1846
      },
      {
        img: "bleh/blrh",
        year: 1856
      },
      {
        img: "bleh/blrh",
        year: 1856
      },
      {
        img: "bleh/blrh",
        year: 1856
      },
      {
        img: "bleh/blrh",
        year: 1856
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
    ]
  })
}
</script>

<style scoped>

.title {
  margin-top: 100px;
}

.--biggest {
  font-size: 4em;
}

.--bigger {
  font-size: 3em;
}

.--big {
  font-size: 1.5em;
}

.subtitle {
  color: grey;
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
  padding: 1em 1em;
  flex: 1;
  margin-right: 1em;
  max-width: 250px;
  display: flex;
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

main {
  max-width: 1500px;
  width: 80%;
  margin: 0px auto;
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
