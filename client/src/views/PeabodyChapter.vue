<template lang="html">
  <chapter-scaffold v-bind:curChapter="'Peabody'"
                    docId="1_-FrAZVLYF74Kc1U-fpK6ugrIkqYisZEbI0Z2yVUb0I">
    <template slot='title'>
      The Work of Knowledge: Elizabeth Palmer Peabody’s Chronological
      Grids
    </template>
    <template v-slot:default="{ docRendererProps }">
      <DocRenderer v-bind="docRendererProps">
        <!--Inline Slots-->
        <template v-for="i in [1,2,3]"
                  v-slot:[slots.railwayHover(i)]="{inner}">
          <a class="blue-hover" href="#" @mouseover="mapPos=i"
             @mouseout="mapPos=0">{{inner}}</a>
        </template>

        <template v-slot:RedBold="{inner}">
          <b :style="{color: actorColors.England}">{{inner}}</b>,
        </template>
        <template v-slot:OrangeBold="{inner}">
          <b :style="{color: actorColors.Americas}">{{inner}}</b>,
        </template>
        <template v-slot:TealBold="{inner}">
          <b :style="{color: actorColors.Holland}">{{inner}}</b>,
        </template>
        <template v-slot:BlueBold="{inner}">
          <b :style="{color: actorColors.France}">{{inner}}</b>,
        </template>

        <template v-slot:HoverEvent1="{inner}">
          <a class="blue-hover" href="#"
             @mouseover="overlayPos=7.5">{{inner}}</a>
        </template>
        <template v-slot:HoverEvent2="{inner}">
          <a class="blue-hover" href="#"
             @mouseover="overlayPos=20.1">{{inner}}</a>
        </template>
        <template v-slot:HoverEvent3="{inner}">
          <a class="blue-hover" href="#"
             @mouseover="overlayPos=20.6">{{inner}}</a>
        </template>

        <!--Component Slots-->

        <template v-slot:CenturiesGrid>
          <div>
            <div class="grid-row">
              <img class="grid-image" src="./img/ch4-1-1500s-rect.jpg"
                   width="40%"/>
              <img class="grid-image" src="./img/ch4-2-1600s-rect.jpg"
                   width="40%"/>
            </div>
            <div class="grid-row">
              <img class="grid-image" src="./img/ch4-3-1700s-rect.jpg"
                   width="40%"></img>
              <img class="grid-image" src="./img/ch4-4-1800s-rect.jpg"
                   width="40%"></img>
            </div>
          </div>
          <p class="caption">
            The four chronological charts included in Elizabeth Palmer Peabody’s
            Chronological History of the United States (1865), which display the
            significant events of the 1500s (top left), the 1600s (top right),
            the 1700s (bottom left), and the 1800s (bottom right).
          </p>
        </template>

        <template v-slot:PhysicalRecreationGrid>
          <div>
            <div class="grid-row">
              <img class="grid-image" src="./img/ch4-15a-fc-left.png"
                   width="26.6%"/>
              <img class="grid-image" src="./img/ch4-15b-fc-right.png"
                   width="26.6%"/>
              <img class="grid-image" src="./img/ch4-16-fc-led-boards.jpg"
                   width="26.6%"/>
            </div>
            <div class="grid-row">
              <img class="grid-image" src="./img/ch4-17-leds.jpg"
                   width="40%"></img>
              <img class="grid-image" src="./img/ch4-18-rendering.png"
                   width="40%"></img>
            </div>
          </div>
          <p class="caption">
            Above (clockwise from top left): The layers of the touch interface,
            built with copper tape and a foam spacer; the assembled touch
            interface; a view of the modular circuit boards for communicating
            with the LEDs; a rendering of the completed Floor Chart; the LEDs
            displayed on top of the quilted chart. Photos by the author.
          </p>
        </template>

        <template v-slot:Quilts>
          <div>
            <div class="grid-row">
              <img class="grid-image" src="./img/ch4-19-rachel-carey-george.jpg"
                   width="40%"/>
              <img class="grid-image" src="./img/ch4-20-gbq-q030-06.jpg"
                   width="40%"/>
            </div>
          </div>
          <p class="caption">
            Above left: “Housetop,” by Rachel Carey George, ca. 1935. Above right: “Housetop” variation, design by Mary Lee Bendolph. 1998, quilted by Essie Bendolph Pettaway, 2001. Photos courtesy of Tinwood Media. Permissions pending.
          </p>
        </template>
        <template v-slot:[slots.mapScroller]>
          <MapScroller class="centered-image" asset="railroadscaled.jpg" width="60vh"
                       :current-position="mapPos"
                       :positions="[
                     {left: 0, top: 0, width: 100, height: 100},
                     {left: -170, top: -50, width: 300, height: 300},
                     {left: -90, top: -120, width: 300, height: 300},
                     {left: -140, top: -110, width: 280, height: 280},
                  ]">
          </MapScroller>
          <div
            style="text-align: center; font-family: Consolas; font-size: 90%; margin-top: 10px;">
            The range of Peabody's promotional tour, as plotted on an 1850 rail
            map of the United States. Image courtesy of the Library of Congress,
            Geography and Map Division.
          </div>
        </template>

        <template v-slot:[slots.titlePageImage]>
          <img class="centered-image" src="./img/peabodytitlepage.jpg"
               width="50%"/>
        </template>

        <template v-slot:[slots.interactiveIntro]>
          <Scrollytell collect bottom-break :scrollSlots="5">
            <template v-slot:fixed="{ scrolled, progress }">
              <PeabodyTutorial
                id="peabody-tutorial"
                :showIndicator="false"
                :showDots="false"
                :slideNumber="scrolled"
                width='45vh'
                height='45vh'/>
            </template>
            <template v-slot:1>
              <p>
                Peabody’s system, like the Polish one, is based on a numbered
                grid,
                with each year in a century marked out
                in its own box.
              </p>
            </template>
            <template v-slot:2>
              <p>
                Each box is then subdivided, with each of the nine smaller
                squares
                corresponding to a particular type of
                historical event.
              </p>
            </template>
            <template v-slot:3="{ progress, scrolled }">
              <div>
                <p>
                  In the top left corner is the space for wars, battles, and
                  sieges;
                  in the top middle is the space for
                  conquests and unions;
                  in the top right is the space for losses and divisions, and so
                  on.
                </p>
                <EventKey class="event-key" :colors=" scrolled > 4 ?
                [false, false, 'rgb(50, 91, 103)',
                false, 'rgb(69, 136, 103)', false,
                'rgb(141, 43, 29)', false, false] : Array(9)"

                          :style="{
                  width: '20vh',
                  opacity: d3.interpolate(0,1)(progress),
                  transform: d3.interpolateString('translateX(10vh)', 'translateX(-5vh)')(d3.easeQuadOut(d3.scaleLinear([0.5,1], [0,1])(progress))),
                  marginTop: '2vh',
                  zIndex: '100'
                 }"
                          showLegend showNumbers dropShadow></EventKey>
              </div>
            </template>
            <template v-slot:4>
              <p>
                Shapes that take up the entire box indicate an event of such
                magnitude or complexity that the other events
                in that same year hardly matter.
              </p>
            </template>
            <template v-slot:5>
              <p>
                The events are also color-coded, indicating the various
                countries
                involved in a particular event.
              </p>
            </template>
          </Scrollytell>
          <div
            style="text-align: center; font-family: Consolas; font-size: 90%; margin-top: 10px;">
            An interactive explanation of the Peabody's Polish-American System.
          </div>
        </template>

        <template v-slot:[slots.scrollyCentury]>
          <Scrollytell :scroll-slots="2"
                       :top="310"
                       :margin="'100vh'"
                       @scroll="onOverlayScroll">
            <template v-slot:fixed="{scrolled, progress}">
              <PeabodyCanvas v-model="overlayPos"
                             :width="'40vh'"></PeabodyCanvas>
            </template>
            <template v-slot:1="{scrolled, progress}">
              <EventKey v-model="overlayEventKeyPos"
                        :colors="overlayEventKeyColors"
                        :style="{width: '20vh', position: 'relative', top: '15vh' }"></EventKey>

              <div class="event-box">
                <div class="event-box-year"> {{overlayCurrYear}}</div>
                <ul v-if="scrolled < 1 && peabodyEvents && peabodyEvents[overlayCurrYear]">
                  <li
                    v-for="[eventName, event] in Object.entries(peabodyEvents[overlayCurrYear])"
                    :key="eventName">
                    <EventSquare width="15" height="15"
                                 :colors="event.actors.map(actor => actorColors[actor])"></EventSquare>
                    <span
                      :class="{ 'selected-event': event.squares.includes(overlayEventKeyPos) }">
                  </span>
                  </li>
                </ul>
              </div>

            </template>
            <template v-slot:2>
              <peabody-grid
                id='peabody-vis'
                style='transform: translateY(8px)'
                :width="'40vh'"
                height='40vh'
                :highlighted="overlayPos"
                @hover-start="onRecreatedGridHover"
                :staticDataset="staticDatasetId"/>
            </template>
          </Scrollytell>
          <timeline-vis
            id='vis2'
            height='200px'
            width='100%'
            :highlighted="overlayPos"
            @hover="num => overlayPos = Number(`${num}.1`)"
            :staticDataset="staticDatasetId"/>
          <div
            style="text-align: center; font-family: Consolas; font-size: 90%;">
            Above (clockwise from top left): Peabody's original chart of the
            seventeenth century; the chart recreated in digital form; the same
            data displayed as a timeline.
          </div>
        </template>

        <template v-slot:[slots.bigQuiz]>
          <SplitCanvasQuiz :width="'100%'"/>
        </template>

        <template v-slot:[slots.workbookScrolly]>
          <div>
            <div class="grid-row">
              <img class="grid-image" src="./img/ch4-5-1993-rect.png"
                   width="20%"/>
              <img class="grid-image" src="./img/ch4-6-1994-rect.png"
                   width="20%"/>
              <img class="grid-image" src="./img/ch4-7-1997-rect.png"
                   width="20%"/>
              <img class="grid-image" src="./img/ch4-8-1975-rect.png"
                   width="20%"/>
            </div>
            <div class="grid-row">
              <img class="grid-image" src="./img/ch4-9-1983-rect.png"
                   width="20%"></img>
              <img class="grid-image" src="./img/ch4-10-1984-rect.png"
                   width="20%"></img>
              <img class="grid-image" src="./img/ch4-11-1985-rect.png"
                   width="20%"></img>
              <img class="grid-image" src="./img/ch4-12-1986-rect.png"
                   width="20%"></img>
            </div>
          </div>
          <p class="caption">
            Images of student-created charts from a copy of The
            Polish-American System housed at the American Antiquarian Society.
            Courtesy of the American Antiquarian Society. Photos by the
            author.
          </p>
        </template>
        <!--        <Scrollytell :scroll-slots="3" :margin="'20vh'">-->
        <!--          <template v-slot:1>-->
        <!--          <div class="horiz-flex">-->
        <!--            <CaptionedImage src="ch4-5-1993-rect.png">Caption goes here</CaptionedImage>-->
        <!--            <CaptionedImage src="ch4-6-1994-rect.png">Caption goes here</CaptionedImage>-->
        <!--            <CaptionedImage src="ch4-7-1997-rect.png">Caption goes here</CaptionedImage>-->
        <!--            <CaptionedImage src="ch4-8-1975-rect.png">Caption goes here</CaptionedImage>-->
        <!--          </div>-->
        <!--          </template>-->
        <!--          <template v-slot:2>-->
        <!--            <div class="horiz-flex">-->
        <!--              <CaptionedImage src="ch4-9-1983-rect.png">Caption goes here</CaptionedImage>-->
        <!--              <CaptionedImage src="ch4-10-1984-rect.png">Caption goes here</CaptionedImage>-->
        <!--              <CaptionedImage src="ch4-11-1985-rect.png">Caption goes here</CaptionedImage>-->
        <!--              <CaptionedImage src="ch4-12-1986-rect.png">Caption goes here</CaptionedImage>-->
        <!--            </div>-->
        <!--          </template>-->
        <!--          <template v-slot:3>-->
        <!--            <div style="text-align: center">-->
        <!--              Some sort of (simple?) editable grid goes here-->
        <!--            </div>-->
        <!--          </template>-->
        <!--        </Scrollytell>-->

        <template v-slot:[slots.womensHistory]>
          <PeabodyMutable
            :staticDataset="'womensrights'"
            :width="'50vh'"
            :actors="womensRightsActorColors"
            :mutableDataset="'womenshistory'">
          </PeabodyMutable>
          <p class="caption">
            One hundred years of US women's history, 1918 to 2018, displayed in
            the style of Peabody's chronological grids.
          </p>
        </template>
      </DocRenderer>
    </template>
  </chapter-scaffold>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import ChapterScaffold from '@/components/ChapterScaffold'
  import TimelineVis from '@/components/vis/timeline/TimelineVis'
  import PeabodyGrid from '@/components/vis/peabody/newpeabodygrid/PeabodyGrid'
  import PeabodyMutable from '@/components/vis/peabody/PeabodyMutable'
  import PeabodyTutorial from '@/components/vis/peabody/PeabodyTutorial'
  import EventKey from "../components/vis/peabody/EventKey";
  import Section from '@/components/chapters/Section'
  import Highlightable from "@/mixins/Highlightable";
  import Scrollytell from "../components/scrollytelling/Scrollytell";
  import MapScroller from "../components/scrollytelling/MapScroller";
  import PeabodyCanvas from "../components/vis/peabody/PeabodyCanvas";
  import Footnotes from "../components/general/Footnotes"
  import FootnoteReference from "../components/general/FootnoteReference";
  import CaptionedImage from "../components/general/CaptionedImage";
  import EventSquare
    from "../components/vis/peabody/newpeabodygrid/EventSquare";
  import {
    actorColors,
    womensRightsActorColors,
    dataToYears
  } from "../helpers/PeabodyUtils";
  import * as d3 from "d3";
  import PeabodyQuiz from "../components/vis/peabody/quiz/PeabodyQuiz";
  import SplitCanvasQuiz
    from "../components/vis/peabody/newquiz/SplitCanvasQuiz";
  import {DocRenderer} from "doc-renderer";

  export default {
    name: "ThePeabodyChapter",
    components: {
      PeabodyQuiz,
      PeabodyGrid,
      PeabodyMutable,
      ChapterScaffold,
      PeabodyTutorial,
      EventKey,
      TimelineVis,
      Section,
      Scrollytell,
      PeabodyCanvas,
      MapScroller,
      EventSquare,
      Footnotes,
      FootnoteRef: FootnoteReference,
      SplitCanvasQuiz,
      CaptionedImage,
      DocRenderer
    },
    mixins: [Highlightable(".chapter__main")],
    data() {
      return {
        slots: {
          railwayHover: (number) => `Hover${number}`,
          titlePageImage: "Title Page Image",
          mapScroller: "Map Scroller",
          interactiveIntro: "Interactive Intro",
          scrollyCentury: "Original/Recreation/Timeline View",
          bigQuiz: "Learn and Play",
          workbookScrolly: "Workbook Scrollytell",
          womensHistory: "Women's History Grid"
        },
        d3: d3, //Makes the library accessible from within the template. (TODO: get rid of this, only access d3 from script)
        staticDatasetId: 'peabody1600',
        century: 1600,
        scrolled: false,
        scrolledMax: 0,
        mapPos: 0,
        overlayPos: 1.1,
        overlayScroll: {
          scrolled: null,
          progress: null
        },
        quizYears: [1619, 1620, 1629, 1630],
        womensRightsActorColors,
        actorColors,
      };
    },
    computed: {
      peabodyData() {
        return this.$store.getters["dataset/getDatasetById"](this.staticDatasetId);
      },
      peabodyYears() {
        if (Array.isArray(this.peabodyData)) {
          return dataToYears(this.peabodyData);
        }
      },
      quizEvents() {
        if (Array.isArray(this.peabodyData)) {
          return this.peabodyData
            .filter(entry => this.quizYears.includes(entry.year))
            .sort((entry1, entry2) => entry1.year - entry2.year);
        }
      },
      peabodyEvents() {
        if (Array.isArray(this.peabodyData)) {
          return this.peabodyData.reduce((yearObj, entry) => {
            let event = {
              event: entry.event,
              actors: entry.actors,
              squares: entry.squares == "full" ? [1, 2, 3, 4, 5, 6, 7, 8, 9] : entry.squares
            };
            if (!yearObj[entry.year]) {
              yearObj[entry.year] = {};
            }
            const existingObj = yearObj[entry.year][event.event];
            if (!existingObj) {
              yearObj[entry.year][event.event] = event;
            } else {
              existingObj.squares = event.squares.concat(existingObj.squares);
              existingObj.actors = [...new Set([...existingObj.actors, ...event.actors])]
            }
            return yearObj;
          }, {})
        }
      },
      overlayCurrYear() {
        return Math.floor(this.overlayPos) + this.century;
      },
      overlayIntroParagraphStyles() {
        const styles = {
          position: 'sticky',
          top: '60px'
        };
        if (this.overlayScroll.scrolled == 1) {
          const scale = d3.scaleLinear()
            .domain([0.25, 0.7])
            .range([0, -310]);
          scale.clamp(true);
          const top = scale(this.overlayScroll.progress);
          if (top) styles.transform = `translateY(${top}px)`;
        } else if (this.overlayScroll.scrolled > 1) {
          styles.opacity = 0;
        }
        return styles;
      },
      overlayEventKeyPos: {
        get() {
          return Math.round(10 * (this.overlayPos - Math.floor(this.overlayPos)));
        },
        set(newVal) {
          this.overlayPos = Number(`${Math.floor(this.overlayPos)}.${newVal}`);
        }
      },
      overlayEventKeyColors() {
        if (this.peabodyYears) {
          const index = Math.floor(this.overlayPos);
          const yearData = this.peabodyYears[index + this.century];
          if (yearData) {
            return yearData.map(squareObj =>
              squareObj ? squareObj.actors.map(actor => actorColors[actor]) : [false]);
          }
        }
      },
    },
    methods: {
      onRecreatedGridHover({year, type, sub}) {
        this.overlayPos = Number(`${year - this.century}.${type}`);
      },
      onOverlayScroll({scrolled, progress}) {
        this.overlayScroll.scrolled = scrolled;
        this.overlayScroll.progress = progress;
      },
      ...mapActions("chapters", ["setChapter"]),
    },
    created() {
      this.setChapter({title: "Peabody"});
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll);
    }
  };
</script>

<style scoped>

  .horiz-flex {
    display: flex;
  }

  .event-box {
    position: relative;
    top: 14vh;
    left: 1.8vh;
    margin-bottom: -300px;
  }

  .event-box ul {
    list-style: none;
    margin-left: 1.4vh;
    padding-left: 0;
  }

  .event-box li {
    display: flex;
    align-items: center;
  }

  .event-box li svg {
    margin-right: 5px;
  }

  .event-box-year {
    font-family: monospace;
    font-size: 2vh;
  }

  .centered-image {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }


  .selected-event {
    /*border-left: 5px solid yellow;*/
    /*background-color: yellow;*/
    text-decoration: underline;
  }

  .left-float {
    float: left;
  }

  .right-float {
    float: right;
  }

  .left-float.aligned {
    padding-top: 0.5em;
    padding-right: 1em;
  }

  .right-float.aligned {
    padding-top: 0.5em;
    padding-left: 1em;
  }

  p {
    text-align: justify;
  }
</style>
