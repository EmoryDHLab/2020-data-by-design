<template lang="html" xmlns:https="http://www.w3.org/1999/xhtml">
  <div class="wholePage">
    <main>
      <div id="home" class="header">
        <div class="text-content">
          <h1 class="title --biggest --color-grey">Data by Design</h1>
          <h1 class="subtitle --color-grey">
            An Interactive History of Data Visualization, 1786&ndash;1900
          </h1>
          <hr>
          <h3 class="subtitle --color-grey" style="font-size: 20px; line-height: 1.5;">What is the story we tell about the emergence of modern data visualization? How might we tell that story differently?
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
        <h3 class="subtitle --color-grey" style="font-size: 1.25em; line-height: 1.25"><i>Data by Design</i> is a work in progress. We will release a draft of each chapter <br>as it is completed. Please send any feedback to <a href="mailto:lauren.klein@emory.edu">Lauren Klein</a>.
          <br>.
        </h3>

<!--        <div class="chapter-links">
          <div class="card"
               :style="{'background-image': 'url(' + require('./img/_northamerica.jpg') + ')'}"
               style=" background-size: cover;
               background-color: rgba(255, 255, 255, 0.7);
               background-position: center;
               background-blend-mode: lighten;">
            <h2 class="boxHeading">A View “Simple and Complete”</h2>
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
               :style="{'background-image': 'url(' + require('./img/sketch2.jpg') + ')'}"
               style=" background-size: cover;
               background-color: rgba(255, 255, 255, 0.7);
               background-position: center;
               background-blend-mode: lighten;">
            <h2 class="boxHeading">Narratives of Possession</h2>
          </div>
          <div class="card"
               :style="{'background-image': 'url(' + require('./img/_fig2.jpg') + ')'}"
               style=" background-size: cover;
               background-color: rgba(255, 255, 255, 0.7);
               background-position: center;
               background-blend-mode: lighten;">
            <h2 class="boxHeading">A Method of Making History</h2>
          </div>
          <div class="card"
               :style="{'background-image': 'url(' + require('./img/duboisdata04.jpg') + ')'}"
               style=" background-size: cover;
               background-color: rgba(255, 255, 255, 0.7);
               background-position: center;
               background-blend-mode: lighten;">
            <h2 class="boxHeading">“The Color Line” as Data and Image</h2>
          </div>
        </div> -->
        <div class="chapter-list">
          <router-link to="/chapters/playfair" style="text-decoration: none;">
            <ChapListItem>
              <template slot="title">Visualization as Argument</template>
              <template slot="tag">William Playfair's Time-Series Charts</template>
            Data visualization has never been neutral or objective. There is a meaning -- and an argument -- conveyed through the design of each image.
              <img src= "./img/navlinePic/playfair.png">
            </ChapListItem>
          </router-link>
          <ChapListItem style="-webkit-filter: grayscale(1);">
            <template slot="title">Every Datapoint a Person</template>
            <template slot="tag">The Brookes Diagram and the Humanity of Data</template>
            Before there are data, there are people. People who offer up their lives to be counted as data -- or whose lives become data without consent.
            <img src= "./img/navlinePic/everyData.png">
          </ChapListItem>
          <ChapListItem style="-webkit-filter: grayscale(1);">
            <template slot="title">Narratives of Possession</template>
            <template slot="tag"> Emma Willard, Shanawdithit, and the Power of Maps</template>
            Maps can create nations and challenge them. How have maps been used to document multiple pasts?
            <img src= "./img/navlinePic/possession.png">
          </ChapListItem>
          <router-link to="/chapters/peabody" style="text-decoration: none;">
            <ChapListItem>
              <template slot="title">The Work of Knowledge</template>
              <template slot="tag"> Elizabeth Palmer Peabody's Chronological Grids</template>
            We have come to believe that data visualizations should be clear and efficient. But there is value in designs that make us pause and reflect.
              <img src= "./img/navlinePic/peabody.png">
              </ChapListItem>
          </router-link>
          <ChapListItem style="-webkit-filter: grayscale(1);">
            <template slot="title">“The Color Line” as Data and Image</template>
            <template slot="tag"> W. E. B. Du Bois and the Argument of Visual Display</template>
            Data has always been wielded as a tool of the state. How can it be used for liberation instead?
            <img src= "./img/navlinePic/dubois.png">
          </ChapListItem>
        </div>
      </div>

      <div id="features" class="features section" align="center">
        <h2 class="title subclass --bigger --color-dark-grey" style="margin-bottom: 40px;">Features</h2>
        <h3 class="subtitle subclass --color-grey" style="font-size: 1.25em; line-height: 1.25">
          This section is still under development.
          In the meanwhile, please visit our <a href="https://dhlab.lmc.gatech.edu/category/databydesign/">research blog</a> <br>
          to learn more about our features as we develop them. <br>
          Please also feel free to <a href="mailto:lauren.klein@emory.edu">get in touch</a> with any suggestions or bug reports.
        </h3>
        <!--<div class="feature-list">-->
          <!--<FeatureCard :largeMode="true" imageLink="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_660,h_382/https://discoverpods.com/wp-content/uploads/2018/12/maps-atlantic-oldtimer-car-compass-vintage-1442539-pxhere.com_-660x382.jpg">-->
            <!--<template slot="title">Take notes while you read</template>-->
            <!--Take note while reading, and access them whenever.-->
          <!--</FeatureCard>-->
          <!--<FeatureCard :largeMode="false" imageLink="bleh">-->
            <!--<template slot="title">Data Visualization For Reading</template>-->
            <!--A short introduction on the chapter here and here.-->
          <!--</FeatureCard>-->
          <!--<FeatureCard :largeMode="false" imageLink="bleh">-->
            <!--<template slot="title">Use Whiteboard For Idea Generation</template>-->
            <!--A short introduction on the chapter here and here.-->
          <!--</FeatureCard>-->
        <!--</div>-->
      </div>

      <div id="credits" class="credits section">
        <h2 class="title subclass --bigger --color-dark-grey" style="margin-bottom: 40px;">Credits</h2>
        <h3 class="subtitle subclass --color-grey" style="font-size: 1.25em; line-height: 1.25;">
          The Data by Design website and reading platform is being designed and developed
          by <br>the Georgia Tech / Emory <a href="http://dhlab.lmc.gatech.edu/">Digital Humanities Lab</a>,
          directed by Dr. Lauren Klein. <br>Meet the Data by Design project team.
        </h3>
        <div class="card-grid">

          <div class="card name-card">
            <img src="http://lklein.com/wp-content/uploads/2018/12/Lauren-Klein-square-med-forweb.jpg"
                 alt="placeholder" width="170" height="170">
            <h3 class="--big --uppercase">Dr. Lauren Klein</h3>
            <h3 class="description" style="font-weight: 300">Project Director</h3>
            <!--<p style="font-size: 15px"></p>-->
          </div>
          <div class="card name-card">
            <img src="./img/credit/Dan.png"
                 alt="placeholder" width="170" height="170">
            <h3 class="--big --uppercase">Dan Jutan</h3>
            <h3 class="description" style="font-weight: 300">Project design and development</h3>
            <!--<p>Georgia Tech BS Computer Science, ’22</p>-->
          </div>
          <div class="card name-card">
            <img src="./img/credit/Jianing.png"
                 alt="placeholder" width="170" height="170">
            <h3 class="--big --uppercase">Jianing Fu</h3>
            <h3 class="description" style="font-weight: 300">Project design and development</h3>
          </div>
          <div class="card name-card">
            <img src="./img/credit/Qing.png"
                 alt="placeholder" width="170" height="170">
            <h3 class="--big --uppercase">Qing Tian</h3>
            <h3 class="description" style="font-weight: 300">Initial project design</h3>
          </div>
          <div class="card name-card">
            <img src="./img/credit/Adam.jpeg"
                 alt="placeholder" width="170" height="170">
            <h3 class="--big --uppercase">Adam Hayward</h3>
            <h3 class="description" style="font-weight: 300">Project prototype</h3>
          </div>
        </div>
        <p style="text-align: center">
          <br><br>Data by Design has been generously funded by a 2018-2019
          <a href="https://www.neh.gov/grants/research/neh-mellon-fellowships-digital-publication">
            NEH-Mellon Fellowship for Digital Publication
          </a>.
          <br><br>Additional research for this project was completed through fellowships from the <br>American Antiquarian Society and the Library Company of Philadelphia.
        </p>
      </div>
    </main>
    <footer>
      <p style="color: whitesmoke; padding: 1em; font-weight: normal">
        Designed and developed by the Georgia Tech / Emory Digital Humanities Lab
      </p>
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
                 // img: require('./img/timeline/ch1-playfair/1786-2.jpg'),
                    img: require('./img/timeline-new/1787-1-320px-playfair.png'),
                    year: 1786,
                    yearCount: 0,
                    width: 40,
                    height: 21
                },
          //      {
          //          id: 1,
          //          img: require('./img/timeline/ch1-playfair/1786-3.png'),
          //          year: 1786,
          //          yearCount: 1,
          //          width:30,
          //          height: 23
          //      },
                {
                    id: 2,
                    year: 1801,
                    yearCount: 0,
                //  img: require('./img/timeline/ch1-playfair/1801-0.jpg'),
                    img: require('./img/timeline-new/1801-1-320px-northamerica.jpg'),
                    width: 40,
                    height: 20
                },
                {
                    id: 3,
                //  img: require('./img/timeline/ch1-playfair/1801-1(1).jpg'),
                    img: require('./img/timeline-new/1801-2-320px-Playfair_piecharts.jpg'),
                    year: 1801,
                    yearCount: 1,
                    width: 40,
                    height: 22
                },
          //      {
          //          id: 4,
          //          img: require('./img/timeline/ch1-playfair/1801-1.jpg'),
          //          year: 1801,
          //          yearCount: 2,
          //          width:30,
          //          height: 20
          //      },
          //      {
          //          id: 5,
          //          img: require('./img/timeline/ch1-playfair/1801-2.jpg'),
          //          year: 1801,
          //          yearCount: 3,
          //          width:30,
          //          height: 19
          //      },
          //      {
          //          id: 6,
          //          year: 1801,
          //          yearCount: 4,
          //          img: require('./img/timeline/ch1-playfair/1801-3.jpg'),
          //          width:30,
          //          height: 20
          //      },
          //      {
          //          id: 7,
          //          year: 1801,
          //          yearCount: 4,
          //          img: require('./img/timeline/ch1-playfair/1801-4.jpg'),
          //        width:30,
          //          height: 20
          //      },
                {
                    id: 8,
                    year: 1821,
                    yearCount: 0,
                  //  img: require('./img/timeline/ch1-playfair/1821-2.jpg'),
                    img: require('./img/timeline-new/1821-1-320px-Wheat.png'),
                    width: 40,
                    height: 18
                },
                {
                    id: 9,
                    year: 1801,
                    yearCount: 2,
                    img: require('./img/timeline/ch2-brookes/1801-1.jpg'),
                    width:30,
                    height: 22
                },
                {
                    id: 10,
                    year: 1788,
                    yearCount: 0,
                    img: require('./img/timeline/ch2-brookes/1788-1.jpg'),
                    width:30,
                    height: 20
                },
                {
                    id: 11,
                    img: require('./img/timeline/ch3-willard-shanawdithit/1829-00.jpg'),
                    year: 1829,
                    yearCount: 0,
                    width:30,
                    height: 21
                },
                // {
                //     id: 12,
                //     img: require('./img/timeline/ch3-willard-shanawdithit/1829-01.jpg'),
                //     year: 1829,
                //     yearCount: 1,
                //     width:30,
                //     height: 43
                // },
                // {
                //     id: 13,
                //     img: require('./img/timeline/ch3-willard-shanawdithit/1829-02.jpg'),
                //     year: 1829,
                //     yearCount: 2,
                //     width:30,
                //     height: 13
                // },
                {
                    id: 14,
                    img: require('./img/timeline/ch3-willard-shanawdithit/1829-03.jpg'),
                    year: 1829,
                    yearCount: 1,
                    width:30,
                    height: 22
                },
                {
                    id: 15,
                    img: require('./img/timeline/ch3-willard-shanawdithit/1829-04.jpg'),
                    year: 1829,
                    yearCount: 2,
                    width:30,
                    height: 17
                },
                // {
                //     id: 16,
                //     img: require('./img/timeline/ch3-willard-shanawdithit/1829-05.jpg'),
                //     year: 1829,
                //     yearCount: 5,
                //     width:30,
                //     height: 21
                // },
                // {
                //     id: 17,
                //     img: require('./img/timeline/ch3-willard-shanawdithit/1829-06.gif'),
                //     year: 1829,
                //     yearCount: 6,
                //     width:30,
                //     height: 21
                // },
                {
                    id: 20,
                    img: require('./img/timeline/ch3-willard-shanawdithit/1829-09.jpg'),
                    year: 1829,
                    yearCount: 3,
                    width:30,
                    height: 21
                },
                // {
                //     id: 21,
                //     img: require('./img/timeline/ch3-willard-shanawdithit/1829-10.jpg'),
                //     year: 1829,
                //     yearCount: 8,
                //     width:30,
                //     height: 21
                // },
                {
                    id: 22,
                    img: require('./img/timeline/ch3-willard-shanawdithit/1829-11.jpg'),
                    year: 1829,
                    yearCount: 4,
                    width:30,
                    height: 21
                },
                {
                    id: 23,
                    img: require('./img/timeline/ch3-willard-shanawdithit/1829-12.jpg'),
                    year: 1829,
                    yearCount: 5,
                    width:30,
                    height: 37
                },
                {
                    id: 24,
                    img: require('./img/timeline/ch3-willard-shanawdithit/1829-13.jpg'),
                    year: 1829,
                    yearCount: 6,
                    width:30,
                    height: 37
                },
                {
                    id: 25,
                    img: require('./img/timeline/ch3-willard-shanawdithit/1829-14.jpg'),
                    year: 1829,
                    yearCount: 7,
                    width:30,
                    height: 37
                },
                {
                    id: 26,
                    img: require('./img/timeline/ch3-willard-shanawdithit/1829-15.jpg'),
                    year: 1829,
                    yearCount: 8,
                    width:30,
                    height: 37
                },
                {
                    id: 27,
                    img: require('./img/timeline/ch3-willard-shanawdithit/1829-16.jpg'),
                    year: 1829,
                    yearCount: 9,
                    width:30,
                    height: 37
                },
                // {
                //     id: 28,
                //     img: require('./img/timeline/ch3-willard-shanawdithit/1829-17.jpg'),
                //     year: 1829,
                //     yearCount: 15,
                //     width:30,
                //     height: 25
                // },
                {
                    id: 29,
                    img: require('./img/timeline/ch3-willard-shanawdithit/1829-18.jpg'),
                    year: 1829,
                    yearCount: 10,
                    width:30,
                    height: 28
                },
                {
                    id: 30,
                    // img: require('./img/timeline/ch3-willard-shanawdithit/1846-1.jpg'),
                    img: require('./img/timeline-new/1846-320px-willard.jpg'),
                    year: 1846,
                    yearCount: 0,
                    width: 40,
                    height: 23
                },
                {
                    id: 31,
                //    img: require('./img/timeline/ch4-peabody/1856-1.jpg'),
                    img: require('./img/timeline-new/1856-1-320px-1500s-rect.jpg'),
                    year: 1856,
                    yearCount: 0,
                    width: 40,
                    height: 30
                },
                {
                    id: 32,
                //    img: require('./img/timeline/ch4-peabody/1856-2.jpg'),
                    img: require('./img/timeline-new/1856-2-320px-1600s-rect.jpg'),
                    year: 1856,
                    yearCount: 1,
                    width: 40,
                    height: 30
                },
                {
                    id: 33,
                    // img: require('./img/timeline/ch4-peabody/1856-3.jpg'),
                    img: require('./img/timeline-new/1856-3-320px-1700s-rect.jpg'),
                    year: 1856,
                    yearCount: 2,
                    width: 40,
                    height: 30
                },
                {
                    id: 34,
                //    img: require('./img/timeline/ch4-peabody/1856-4.jpg'),
                    img: require('./img/timeline-new/1856-4-320px-1800s-rect.jpg'),
                    year: 1856,
                    yearCount: 3,
                    width: 40,
                    height: 30
                },
                {
                    id: 35,
                    img: require('./img/timeline/ch5-dubois/1900-01.png'),
                    year: 1900,
                    yearCount: 0,
                    width:30,
                    height: 38
                },
                {
                    id: 36,
                    img: require('./img/timeline/ch5-dubois/1900-02.png'),
                    year: 1900,
                    yearCount: 1,
                    width:30,
                    height: 38
                },
                {
                    id: 37,
                    img: require('./img/timeline/ch5-dubois/1900-03.png'),
                    year: 1900,
                    yearCount: 2,
                    width:30,
                    height: 37
                },
                {
                    id: 38,
                    img: require('./img/timeline/ch5-dubois/1900-04.png'),
                    year: 1900,
                    yearCount: 3,
                    width:30,
                    height: 37
                },
                {
                    id: 39,
                    img: require('./img/timeline/ch5-dubois/1900-05.jpg'),
                    year: 1900,
                    yearCount: 4,
                    width:30,
                    height: 37
                },
                {
                    id: 40,
                    img: require('./img/timeline/ch5-dubois/1900-06.jpg'),
                    year: 1900,
                    yearCount: 5,
                    width:30,
                    height: 40
                },
                {
                    id: 41,
                    img: require('./img/timeline/ch5-dubois/1900-07.jpg'),
                    year: 1900,
                    yearCount: 6,
                    width:30,
                    height: 36
                },
                {
                    id: 42,
                    img: require('./img/timeline/ch5-dubois/1900-08.jpg'),
                    year: 1900,
                    yearCount: 7,
                    width:30,
                    height: 37
                },
                {
                    id: 43,
                    img: require('./img/timeline/ch5-dubois/1900-09.jpg'),
                    year: 1900,
                    yearCount: 8,
                    width:30,
                    height: 37
                },
                {
                    id: 44,
                    img: require('./img/timeline/ch5-dubois/1900-10.jpg'),
                    year: 1900,
                    yearCount: 9,
                    width:30,
                    height: 37
                },
                {
                    id: 45,
                    img: require('./img/timeline/ch5-dubois/1900-11.jpg'),
                    year: 1900,
                    yearCount: 10,
                    width:30,
                    height: 37
                },
                {
                    id: 46,
                    img: require('./img/timeline/ch5-dubois/1900-12.jpg'),
                    year: 1900,
                    yearCount: 11,
                    width:30,
                    height: 37
                },
                {
                    id: 47,
                    img: require('./img/timeline/ch5-dubois/1900-13.jpg'),
                    year: 1900,
                    yearCount: 12,
                    width:30,
                    height: 37
                },
                {
                    id: 48,
                    img: require('./img/timeline/ch5-dubois/1900-14.jpg'),
                    year: 1900,
                    yearCount: 13,
                    width:30,
                    height: 37
                },
                {
                    id: 49,
                    img: require('./img/timeline/ch5-dubois/1900-15.jpg'),
                    year: 1900,
                    yearCount: 14,
                    width:30,
                    height: 19
                },
                {
                    id: 50,
                    img: require('./img/timeline/ch5-dubois/1900-16.jpg'),
                    year: 1900,
                    yearCount: 15,
                    width:30,
                    height: 19
                },
                {
                    id: 51,
                    img: require('./img/timeline/ch5-dubois/1900-17.jpg'),
                    year: 1900,
                    yearCount: 16,
                    width:30,
                    height: 19
                },
                {
                    id: 52,
                    img: require('./img/timeline/ch5-dubois/1900-18.jpg'),
                    year: 1900,
                    yearCount: 17,
                    width:30,
                    height: 19
                },
            //    {
            //        id: 53,
            //        img: require('./img/timeline-new/1850-1-320px-map.jpg'),
            //        year: 1850,
            //        yearCount: 0,
            //        width:30,
            //        height: 24
            //    },
                {
                    id: 54,
                    img: require('./img/timeline-new/1869-1-320px-Minard.png'),
                    year: 1869,
                    yearCount: 0,
                    width: 40,
                    height: 17
                },
                {
                    id: 55,
                    img: require('./img/timeline-new/1878-1-Ibry.png'),
                    year: 1878,
                    yearCount: 0,
                    width: 40,
                    height: 20
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
    text-shadow: 0px 2px 5px lightgray;
    margin-top: 0px;
    padding-top: 100px;
  }
  .wholePage {
    background-image: url("./img/grid.png"), url("./img/curve-trimmed.png");
    background-repeat: no-repeat, no-repeat;
    background-position: top right, left top;
    background-size: 40%, 100%;
  }
  .header .text-content {
    max-width: 55%;
  }
  .text-content h1.subtitle {
    font-size: 27px;
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

  .chapter-list img {
    margin-top: 1em;
    max-height: 200px;
    max-width: 95%;
    width: auto;
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
    max-width: 175px;
  }
  .feature-list div:not(:last-child) {
    margin-bottom: 48px;
  }
  .name-card img{
    border-radius: 50%;
  }
</style>
