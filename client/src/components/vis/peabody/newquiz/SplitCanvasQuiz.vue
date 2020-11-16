<template>
  <div>
    <!--Top Controls-->
    <div class="horiz-flex">
      <div class="event-prompt" v-if="selectedEventsArray">
        <div class="event-text" v-if="!completed.has(selectedCentury)">
          <div class="event-year">
            <a v-text="selectedEvent.year + ':'"
               @mouseover="onEventYearHover"
               class="blue-hover"
               href="javascript:void(0);"></a>
          </div>
          <div class="event-desc" v-text="selectedEvent.event"></div>
        </div>
        <div class="play-again" v-else>
          <button @click="restartSelectedCentury">Restart {{selectedCentury}}s</button>
        </div>
       <template v-if="!completed.has(selectedCentury)">
         <div class="event-nav" >
           <a v-if="currEventIndex >= 1" @click="currEventIndex--"
              href="javascript:void(0);">🡄</a>
           <span>{{currEventIndex + 1}} / {{selectedEventsArray.length}}</span>
           <a v-if="currEventIndex < selectedEventsArray.length - 1"
              @click="currEventIndex++"
              href="javascript:void(0);">🡆</a>
         </div>
         <div class="check-mark">
           <img
             v-show="eventsProgress[selectedCentury][currEventIndex] && eventsProgress[selectedCentury][currEventIndex].completed"
             src="../../../../views/img/checkx-check.png"/>
         </div>
         <div class="show-me">
           <button @click="correctMatch">Show
             Me
           </button>
         </div>
       </template>
      </div>

      <EventKey
        class="event-key"
        :width="'20%'"
        v-model="highlightEventType"
      />
    </div>

    <!--Actor Bar-->
    <ActorSelect
      :shown-actors="actors[selectedCentury] || new Set()"
      v-model="selectedActor">
    </ActorSelect>

    <!--Twin Displays-->
    <div class="horiz-flex">
      <div class="multi-canvas">
        <PeabodyCanvas :width="'40vh'"
                       v-model="highlightPosition"
                       @click.native="onCanvasClick"
                       :century="selectedCentury"></PeabodyCanvas>
        <!--Century Select-->
        <ul>
          <li v-for="name in displayOrder" :key="name">
            <a class="blue-hover" :style="colorIfSelected(name)"
               @mouseover="selectedCentury = Number(name)">
              {{datasets[name].display}}
            </a>
          </li>
        </ul>
      </div>
      <div class="quiz-grid">
        <QuizGridWrapper
          ref="quizGrid"
          :width="'40vh'"
          v-if="selectedEventsArray"
          :century="selectedCentury"
          :events="selectedEventsArray"
          :curr-event="currEvents[selectedCentury]"

          :events-progress="eventsProgress[selectedCentury]"
          @update:eventsProgress="newObj => eventsProgress[selectedCentury] = newObj"

          :chosen-actor="selectedActor"
          @hovered="onQuizGridHover"
          @completed="completed.add(selectedCentury)"
        >
        </QuizGridWrapper>
        <ul>
          <li><button @click="restartSelectedCentury">Restart {{selectedCentury}}s</button></li>
          <li class="space"></li>
          <li><button @click="completeSelectedCentury">Complete</button></li>
        </ul>
      </div>

    </div>
    <!--    <PeabodyMutable-->
    <!--      v-for="name in displayOrder" :key="name"-->
    <!--      v-show="name == selectedCentury"-->
    <!--      :width="'40vh'"-->
    <!--      :staticDataset="datasets[name].id"-->
    <!--      :mutableDataset="mutableDatasetPrefix + name"></PeabodyMutable>-->
  </div>
</template>

<script>
  /*
    Note: In the pursuit of following KISS and encapsulation principles,
    there are some Vue antipatterns here, particularly
    the idea of calling methods on the child component QuizGridWrapper. This allows the latter
    component to be the single source of mutations on individual events, rather than having
    the 'Show Me' and other button logic independently edit eventsProgress.
    It is probably better practice -- albeit with more moving parts -- to use a
    Vuex store.
   */

  import PeabodyCanvas from "../PeabodyCanvas";
  import PeabodyMutable from "../PeabodyMutable";
  import QuizGridWrapper from "./QuizGridWrapper";
  import Visualization from "../../../../mixins/vis/Visualization";
  import ActorSelect from "./ActorSelect";
  import EventKey from "../EventKey";

  export default {
    components: {
      ActorSelect,
      QuizGridWrapper,
      PeabodyMutable,
      PeabodyCanvas,
      EventKey
    },
    mixins: [Visualization()],
    props: {},
    data() {
      return {
        datasets: {
          1500: {display: "1500s", id: "peabody1500"},
          1600: {display: "1600s", id: "peabody1600"},
          1700: {display: "1700s", id: "peabody1700"},
          1800: {display: "1800s", id: "peabody1800"},
          // 0: {display: "Blank", id: ""}
        },
        eventsProgress: {
          updated: 0,
          1500: {},
          1600: {},
          1700: {},
          1800: {},
        },
        currEvents: {
          1500: 0,
          1600: 0,
          1700: 0,
          1800: 0,
        },
        completed: new Set(),
        displayOrder: [1500, 1600, 1700, 1800],
        selectedCentury: 1500,
        selectedActor: "Americas",
        highlightPosition: 1.1
      }
    },
    computed: {
      highlightEventType: {
        get() {
          return Math.round(10 * (this.highlightPosition - Math.floor(this.highlightPosition)));
        },
        set(newVal) {
          this.highlightPosition = Number(`${Math.floor(this.highlightPosition)}.${newVal}`);
        }
      },
      highlightEventYear() {
        return this.selectedCentury + Math.floor(this.highlightPosition);
      },
      events() {
        const obj = {}
        Object.keys(this.datasets).forEach(key => {
          const id = this.datasets[key].id;
          if (id) {
            const data = this.getStaticData(id)
            if (data.error) {
              this.loadStaticDataset(id).then(loadedData => obj[key] = loadedData);
            } else {
              obj[key] = data;
            }
          }
        });
        return obj;
      },
      selectedEventsArray() {
        return this.events[this.selectedCentury];
      },
      selectedEvent() {
        return this.selectedEventsArray[this.currEventIndex]
      },
      currEventIndex: {
        get() {
          return this.currEvents[this.selectedCentury];
        },
        set(index) {
          this.currEvents[this.selectedCentury] = index;
        }
      },
      actors() {
        return Object.fromEntries(
          Object.entries(this.events).map(
            ([century, events]) => [century, (new Set(events.flatMap(event => event.actors)))]
          )
        );
      },
      colorIfSelected() {
        return century => {
          if (this.selectedCentury == century) {
            return {color: 'orange'};
          }
        }
      },
    },
    methods: {
      restartSelectedCentury() {
        this.$refs.quizGrid.restartAll();
        this.completed.delete(this.selectedCentury);
        this.currEventIndex = 0;
      },
      completeSelectedCentury() {
        this.$refs.quizGrid.completeAll();
      },
      correctMatch() {
        this.$refs.quizGrid.completeCurrent();
        this.currEventIndex++;
      },
      onQuizGridHover({year, type}) {
        this.highlightPosition = Number(`${year - this.selectedCentury}.${type}`);
      },
      onEventYearHover() {
        this.highlightPosition = Number(`${this.selectedEvent.year - this.selectedCentury}.${this.highlightEventType}`)
      },
      onCanvasClick() {
        console.log("got here");
        const matchesType = e => e.squares == "full" || e.squares.includes(this.highlightEventType);
        const index = this.selectedEventsArray.findIndex(e => e.year == this.highlightEventYear && matchesType(e))
        if (index > -1) {
          this.currEventIndex = index;
        }
      },
    },
    mounted() {

    }
  }
</script>

<style scoped>
  .horiz-flex {
    display: flex;
  }

  .multi-canvas {
    margin-left: auto;
    margin-right: auto;
    width: 40vh;
  }

  .horiz-flex ul {
    text-align: center;
    padding-inline-start: 0;
  }

  .horiz-flex ul li {
    display: inline-block;
  }

  .quiz-grid ul {
    margin-top: 8px;
  }
  .quiz-grid ul li.space {
    margin: 0px 5px;
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

  .quiz-grid ul li:first-child {
    /*margin-left: -15px;*/
    /*margin-right: 7px;*/
  }

  .event-prompt {
    display: grid;
    width: 50%;
    height: 100px;
    grid-template-columns: 70% 30%;
    grid-template-rows: 70% 30%;
    background-color: #f5f5f5;
    margin-top: 2%;
    margin-left: 2%;
    padding-top: 5px;
    padding-left: 10px;
  }

  .event-text {
    grid-column: 1 / span 1;
    grid-row: 1 / span 1;
    justify-content: space-between;
    display: flex;
    align-items: flex-start;
    align-self: flex-start;
    justify-self: flex-start;
  }

  .event-year {
    font-family: Roboto;
    margin-right: 5px;
  }

  .event-key {
    margin-left: 5%;
    /*align-self: center;*/
    align-self: flex-end;
  }

  .event-nav {
    width: 100px;
    justify-self: right;
    grid-column: 1 / span 1;
    grid-row: 2 / span 1;
  }

  .event-nav span {
    font-family: Roboto;
    font-style: italic;
    padding-right: 5%;
    padding-left: 2%;
  }

  .event-nav a {
    font-size: 120%;
    color: black;
  }

  .event-nav a:hover {
    color: orange;
  }

  .play-again {
    justify-self: center;
    align-self: center;
    grid-column: 1 / span 2;
    grid-row: 1 / span 2;
  }
  .check-mark {
    grid-column: 2 / span 1;
    grid-row: 1 / span 1;
  }

  .check-mark img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10%;
    max-width: 50%;
  }

  .show-me {
    grid-column: 2 / span 1;
    grid-row: 2 / span 1;
    align-self: center;
    justify-self: center;
  }

  .event-text div {
    font-family: Roboto;
    font-weight: 300;
    font-size: 90%;
  }

  .event-prompt a {
    text-decoration: none;
  }
</style>
