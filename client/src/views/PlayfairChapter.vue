<template lang="html">
  <chapter-scaffold v-bind:curChapter="'Peabody'">
    <template slot='title'>
      A View “Simple and Complete”: William Playfair and the Argument of Data Visualization
    </template>
    <!--    <div style="display:flex;">-->
    <!--      <peabody-grid-->
    <!--        :id="'peabody-vis-1'"-->
    <!--        style='flex: 1'-->
    <!--        width='45vh'-->
    <!--        height='45vh'-->
    <!--        :mutableDataset="'my-peabody'"-->
    <!--        :staticDataset='"1"'/>-->
    <!--    </div>-->
    <Section>
      <div>
        <p>
          One can only imagine the choice words exclaimed by the Scottish political economist William Playfair (1759-1823)
          when he saw the error that he had inadvertently engraved into the tail end of the data line on his chart of
          “Exports & Imports to and from all of North America.” Engraving was—and still is—an incredibly time-consuming process.
          Albrecht Dürer, the Renaissance printmaker often credited with elevating engraving into an artform, took over three months to complete his famed Knight, Death, and Devil (1513). In the case of Playfair, however, it was not merely the time he had invested in producing the twenty-eight plates he planned to include in the third edition of his Commercial and Political Atlas (1801), a revised version of the volume he first published in 1786; it was also the expense.
        </p>
        <p>
          Today, Playfair is widely recognized as a leading figure in the development of modern data visualization. Edward Tufte, for example, on the first page of The Visual Display of Quantitative Information (1983), hails Playfair’s designs as “remarkable” and positions them as the starting point of the history of visualization that he offers in his own landmark book. Indeed, most scholars and practitioners credit Playfair with perfecting the time-series chart, and with inventing the bar chart and the pie chart outright.
        </p>
      </div>
      <p>
        But in his own time, Playfair remained “largely unacknowledged” for his contributions, as his biographers Howard Wainer and Ian Spence describe. More to the point, he was almost always nearly broke. While Playfair chose to commission one of the most skilled engravers in all of London, Samuel John Neele, to produce the plates for his Atlas, he likely requested that Neele work at speed so as to minimize the costly detailing and other flourishes for which he was known. Neele thus engraved the charts’ decoration, framing, titles, and other lettering, leaving Playfair—who had trained as an engineer—to engrave the lines of imports and exports by himself.
      </p>
      <p>
        To produce a copperplate engraving such as the one that produced “Exports & Imports to and from all of North America,” the engraver must carve the image directly into the eponymous copper plate—a process that requires significant physical strength. Playfair’s error was in fact a common one—a slip of a tired hand—but its frequent occurrence would not have made it any more tolerable to the man who was already, by his own account, “long anxious” to be acknowledged as an innovator. Unlike the array of computational methods used today to create data visualizations—from standalone platforms such as Adobe Illustrator or Tableau, to software libraries such as ggplot or D3—each of which allow for easy revision, the engraving process employed by Playfair resulted in an image that was irreversibly inscribed into copper. When considered in the context of the time and money he had invested in the project, might as well have been set in proverbial stone.
      </p>
      <!--vis-->

      <Scrollytell collect bottom-break :scrollSlots="8">
        <template v-slot:fixed="{ scrolled, progress }">
          <d3Impl :slideNumber="scrolled"/>
        </template>
        <template v-slot:1>
          <p>
            Canvas
          </p>
        </template>
        <template v-slot:2>
          <p>
            X-axis
          </p>
        </template>
        <template v-slot:3>
          <p>
            Y-axis
          </p>
        </template>
        <template v-slot:4>
          <p>
            bumpy line
          </p>
        </template>
        <template v-slot:5>
          <p>
            smoother line
          </p>
        </template>
        <template v-slot:6>
          <p>
            shapding
          </p>
        </template>
        <template v-slot:7>
          <p>
            medallion
          </p>
        </template>
        <template v-slot:8>
          <p>
            original data
          </p>
        </template>
      </Scrollytell>

      <p>This chapter explores the visual strategies employed by William Playfair, and his writing about same, in order to make the case for visualization as a method of argument—that is to say, as a method that carries with it a specific set of beliefs about the significance of data and its relation to visual display. No contemporary visualization designer would deny the many choices they make when giving a dataset visual form—nor, likely, would Playfair himself. But beyond the choices involved in creating any particular visualization are a larger set of assumptions about visual knowledge more broadly. These have to do with the value of that knowledge, the processes by which it is produced, and how—and by whom—it is intended to be perceived.
      </p>
    </Section>
    <Section title="The Value of Visual Knowledge ">
      <p>
        As indicated by the engraving error in “Exports & Imports to and from all of North America,” Playfair drew his charts’ data lines freehand. In point of fact, there is no indication that he plotted any actual data points before engraving the lines of import and export themselves. What’s more, Playfair did not even intend to include the data he used to guide the creation of the charts in the Atlas. It was only after soliciting feedback from James Watt, of steam engine fame—and for whom Playfair worked in his youth—that he received the advice to include his charts’ data in tabular form. “It might be proper,” Watt advised, “to give in letter press the Tables from which the Charts have been constructed… for the charts now seem to rest on your own authority, and it will naturally be enquired from whence you have derived our intelligence.”
      </p>
    </Section>


    <!--        @hover-start="hoverStart"-->
    <!--        @hover-end="hoverEnd"-->


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
  import EventSquare
    from "../components/vis/peabody/newpeabodygrid/EventSquare";
  import {actorColors, dataToYears} from "../helpers/PeabodyUtils";
  import * as d3 from "d3";
  import PeabodyQuiz from "../components/vis/peabody/quiz/PeabodyQuiz";
  import d3Impl from "../components/vis/playfair/creationProcess/D3Impl";

  export default {
    name: "ThePeabodyChapter",
    components: {
      d3Impl,
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
      FootnoteRef: FootnoteReference
    },
    mixins: [Highlightable(".chapter__main")],
    data() {
      return {
        d3: d3, //Makes the library accessible from within the template. (TODO: get rid of this, only access d3 from script)
        staticDatasetId: '1',
        century: 1600,
        selectedCentury: 0, //0 = blank. for the multi peabody canvas
        scrolled: false,
        scrolledMax: 0,
        mapPos: 0,
        overlayPos: 1.1,
        overlayScroll: {
          scrolled: null,
          progress: null
        },
        quizYears: [1619, 1620, 1629, 1630],
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
            .range([0, -350]);
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
      colorIfSelected() {
        return century => {
          if (this.selectedCentury === century) {
            return {color: 'orange'};
          }
        }
      },
    },
    methods: {
      onRecreatedGridHover({year, type, sub}) {
        this.overlayPos = Number(`${year - this.century}.${type}`);
      },
      onOverlayScroll({scrolled, progress}) {
        console.log("got to scroll handler");
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

  .multi-canvas {
    margin-left: auto;
    margin-right: auto;
    width: 40vh;
  }
  .multi-canvas ul {
    text-align: center;
  }
  .multi-canvas ul li {
    display: inline-block;
  }

  .multi-canvas ul li:not(:first-child)::before {
    content: '•';
    font-size: 20px;
    display: block;
    float: left;
    margin-left: 2px;
    margin-right: 2px;
    margin-top: -2px;
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
