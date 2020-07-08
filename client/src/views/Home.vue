<template lang="html" xmlns:https="http://www.w3.org/1999/xhtml">
  <div class="wholePage">
    <main>
      <div id="home" class="header">
        <div class="text-content">
          <h1 class="title --biggest --color-grey">Data by Design</h1>
          <h1 class="subtitle --color-grey">
            An Interactive History of Data Visualization 1786&ndash;1900
          </h1>
          <hr>
          <h3 class="subtitle --color-grey" style="font-size: 1em">What is the story we tell about the emergence of modern data visualization?
            <br>How might we tell that story differently?
          </h3>
          <!--<div class="reading-progress">-->
          <!--<button class="&#45;&#45;uppercase btn"-->
          <!--style="margin-right: 40px;"-->
          <!--type="button"-->
          <!--name="start-reading">Resume reading</button>-->
          <!--<ProgressBar :range="[0, 160]" :value="155"/>-->
          <!--</div>-->
        </div>
        <Picline :dataset="points" id="picline"/>
      </div>

      <div id="chapters" ref="chpts" class="chapters section" align="center">
        <h2 class="title subclass --bigger --color-dark-grey" style="margin-bottom: 40px;">Table of Contents</h2>
        <h3 class="subtitle --color-grey" style="font-size: 1.5em">One sentence summary about the feature as a whole
          <br>the second line sine wim laenme
        </h3>
        <div class="chapter-links">
          <div class="card"
               :style="{'background-image': 'url(' + require('./img/_northamerica.jpg') + ')'}"
               style=" background-size: cover;
               background-color: rgba(255, 255, 255, 0.7);
               background-position: center;
               background-blend-mode: lighten;">
            <h2 class="boxHeading">A View “Simple and Complete”</h2>
            <h3 style="font-size: 1em; margin-top: -1em">William Playfair and the Origins of Objective Display</h3>
          </div>
          <div class="card"
               :style="{'background-image': 'url(' + require('./img/_brookes.jpg') + ')'}"
          style = "background-size: cover;
               background-color: rgba(255, 255, 255, 0.7);
               background-position: center;
               background-blend-mode: lighten;">
            <h2 class="boxHeading">Every Datapoint a Person</h2>
          </div>
          <div class="card"
               :style="{'background-image': 'url(' + require('./img/_fig2.jpg') + ')'}"
               style=" background-size: cover;
               background-color: rgba(255, 255, 255, 0.7);
               background-position: center;
               background-blend-mode: lighten;">
            <h2 class="boxHeading">Narratives of Possession</h2>
          </div>
          <div class="card"
               :style="{'background-image': 'url(' + require('./img/duboisdata04.jpg') + ')'}"
               style=" background-size: cover;
               background-color: rgba(255, 255, 255, 0.7);
               background-position: center;
               background-blend-mode: lighten;">
            <h2 class="boxHeading">“Outlines to the Eye”</h2>
          </div>
          <div class="card"
               :style="{'background-image': 'url(' + require('./img/_duboisdata01.jpg') + ')'}"
               style=" background-size: cover;
               background-color: rgba(255, 255, 255, 0.7);
               background-position: center;
               background-blend-mode: lighten;">
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
        <h2 class="title subclass --bigger --color-dark-grey">Features</h2>
        <h3 class="subtitle subclass --color-grey">These features are still under development
          <br> but feel free to look around!</h3>
        <div class="feature-list">
          <FeatureCard :largeMode="true" imageLink="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_660,h_382/https://discoverpods.com/wp-content/uploads/2018/12/maps-atlantic-oldtimer-car-compass-vintage-1442539-pxhere.com_-660x382.jpg">
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
        <h2 class="title subclass --bigger --color-dark-grey">Credits</h2>
        <h3 class="subtitle subclass --color-grey">These features are still under development
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
    import PicCollage from "../components/vis/PicCollage";
    export default {
        components: {
            PicCollage,
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
                    img: require('./img/_northamerica.jpg'),
                    year: 1786,
                    yearCount: 0,
                    width:30,
                    height: 19
                },
                {
                    id: 1,
                    img: require('./img/_northamerica.jpg'),
                    year: 1786,
                    yearCount: 1,
                    width:30,
                    height: 19
                },
                {
                    id: 2,
                    year: 1786,
                    yearCount: 2,
                    img: require('./img/_duboisdata01.jpg'),
                    width:30,
                    height: 38
                },
                {
                    id: 3,
                    img: require('./img/duboisdata04.jpg'),
                    year: 1788,
                    yearCount: 0,
                    width:30,
                    height: 38
                },
                {
                    id: 4,
                    img: require('./img/_brookes.jpg'),
                    year: 1801,
                    yearCount: 0,
                    width:30,
                    height: 20
                },
                {
                    id: 5,
                    img: require('./img/_northamerica.jpg'),
                    year: 1801,
                    yearCount: 1,
                    width:30,
                    height: 19
                },
                {
                    id: 6,
                    year: 1801,
                    yearCount: 2,
                    img: require('./img/_duboisdata01.jpg'),
                    width:30,
                    height: 38
                },
                {
                    id: 7,
                    year: 1801,
                    yearCount: 3,
                    img: require('./img/_duboisdata01.jpg'),
                    width:30,
                    height: 38
                },
                {
                    id: 8,
                    year: 1801,
                    yearCount: 4,
                    img: require('./img/_duboisdata01.jpg'),
                    width:30,
                    height: 38
                },
                {
                    id: 9,
                    year: 1801,
                    yearCount: 5,
                    img: require('./img/_brookes.jpg'),
                    width:30,
                    height: 20
                },
                {
                    id: 10,
                    year: 1821,
                    yearCount: 0,
                    img: require('./img/_brookes.jpg'),
                    width:30,
                    height: 20
                },
                {
                    id: 11,
                    img: require('./img/_brookes.jpg'),
                    year: 1821,
                    yearCount: 1,
                    width:30,
                    height: 20
                },
                {
                    id: 12,
                    year: 1858,
                    yearCount: 0,
                    img: require('./img/_brookes.jpg'),
                    width:30,
                    height: 20
                },
                {
                    id: 13,
                    year: 1829,
                    yearCount: 0,
                    img: require('./img/_duboisdata01.jpg'),
                    width:30,
                    height: 38
                },
                {
                    id: 14,
                    year: 1829,
                    yearCount: 1,
                    img: require('./img/_duboisdata01.jpg'),
                    width:30,
                    height: 38
                },
                {
                    id: 15,
                    year: 1829,
                    yearCount: 2,
                    img: require('./img/duboisdata04.jpg'),
                    width:30,
                    height: 38
                },
                {
                    id: 16,
                    year: 1829,
                    yearCount: 3,
                    img: require('./img/duboisdata04.jpg'),
                    width:30,
                    height: 38
                },
                {
                    id: 17,
                    year: 1829,
                    yearCount: 4,
                    img: require('./img/_duboisdata01.jpg'),
                    width:30,
                    height: 38
                },
                {
                    id: 18,
                    year: 1829,
                    yearCount: 5,
                    img: require('./img/_duboisdata01.jpg'),
                    width:30,
                    height: 38
                },
                {
                    id: 19,
                    year: 1829,
                    yearCount: 6,
                    img: require('./img/_northamerica.jpg'),
                    width:30,
                    height: 19
                },
                {
                    id: 20,
                    year: 1829,
                    yearCount: 7,
                    img: require('./img/_northamerica.jpg'),
                    width:30,
                    height: 19
                },
                {
                    id: 21,
                    year: 1829,
                    yearCount: 8,
                    img: require('./img/_northamerica.jpg'),
                    width:30,
                    height: 19
                },
                {
                    id: 22,
                    year: 1829,
                    yearCount: 9,
                    img: require('./img/_northamerica.jpg'),
                    width:30,
                    height: 19
                },
                {
                    id: 23,
                    year: 1829,
                    yearCount: 10,
                    img: require('./img/_duboisdata01.jpg'),
                    width:30,
                    height: 38
                },
                {
                    id: 24,
                    year: 1829,
                    yearCount: 11,
                    img: require('./img/duboisdata04.jpg'),
                    width:30,
                    height: 38
                },
                {
                    id: 25,
                    year: 1829,
                    yearCount: 12,
                    img: require('./img/duboisdata04.jpg'),
                    width:30,
                    height: 38
                },
                {
                    id: 26,
                    year: 1829,
                    yearCount: 13,
                    img: require('./img/_brookes.jpg'),
                    width:30,
                    height: 20
                },
                {
                    id: 27,
                    year: 1829,
                    yearCount: 14,
                    img: require('./img/_brookes.jpg'),
                    width:30,
                    height: 20
                },
                {
                    id: 28,
                    year: 1829,
                    yearCount: 15,
                    img: require('./img/_brookes.jpg'),
                    width:30,
                    height: 20
                },
                {
                    id: 29,
                    img: require('./img/_northamerica.jpg'),
                    year: 1846,
                    yearCount: 0,
                    width: 30,
                    height: 19
                },
                {
                    id: 30,
                    year: 1856,
                    yearCount: 0,
                    img: require('./img/_duboisdata01.jpg'),
                    width:30,
                    height: 38
                },
                {
                    id: 31,
                    year: 1856,
                    yearCount: 1,
                    img: require('./img/_northamerica.jpg'),
                    width:30,
                    height: 19
                },
                {
                    id: 32,
                    year: 1856,
                    yearCount: 2,
                    img: require('./img/_duboisdata01.jpg'),
                    width:30,
                    height: 38
                },
                {
                    id: 33,
                    year: 1856,
                    yearCount: 3,
                    img: require('./img/duboisdata04.jpg'),
                    width:30,
                    height: 38
                },
                {
                    id: 34,
                    year: 1900,
                    yearCount: 0,
                    img: require('./img/duboisdata04.jpg'),
                    width:30,
                    height: 38
                },
                {
                    id: 35,
                    year: 1900,
                    yearCount: 1,
                    img: require('./img/_duboisdata01.jpg'),
                    width:30,
                    height: 38
                },
                {
                    id: 36,
                    year: 1900,
                    yearCount: 2,
                    img: require('./img/_duboisdata01.jpg'),
                    width:30,
                    height: 38
                },
                {
                    id: 37,
                    year: 1900,
                    yearCount: 3,
                    img: require('./img/_duboisdata01.jpg'),
                    width:30,
                    height: 38
                },
                {
                    id: 38,
                    year: 1900,
                    yearCount: 4,
                    img: require('./img/duboisdata04.jpg'),
                    width:30,
                    height: 38
                },
                {
                    id: 39,
                    year: 1900,
                    yearCount: 5,
                    img: require('./img/duboisdata04.jpg'),
                    width:30,
                    height: 38
                },
                {
                    id: 40,
                    year: 1900,
                    yearCount: 6,
                    img: require('./img/_duboisdata01.jpg'),
                    width:30,
                    height: 38
                },
            ].reduce((obj, item, index) => ({
                ...obj,
                [index]: {
                    year: item.year,
                    href: item.img,
                    id: index,
                    yearCount: item.yearCount,
                    x:2.5,
                    y:2,
                    width:item.width,
                    height:item.height
                }
            }), {})
        })
    }
</script>

<style scoped>
  .title {
    margin-top: 0px;
    padding-top: 100px;
  }
  .wholePage {
    background-image: url("./img/grid.png");
    background-repeat: no-repeat;
    background-position: top right;
    background-size: 600px;
  }
  .header .text-content {
    max-width: 50%;
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
  .section .subtitle {
    margin-top: -20px;
    margin-bottom: 40px;
  }
  .card-grid {
    display: flex;
    justify-content: space-around;
  }
  .boxHeading{
    text-transform: capitalize;
    font-weight: bold;
    font-family: Roboto;
    font-size: 1.5em;
    color: #083871;
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
  .feature-list div:not(:last-child) {
    margin-bottom: 48px;
  }
  img{
    border-radius: 50%;
  }
</style>