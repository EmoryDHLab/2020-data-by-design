<template>
  <div class="container" :style="{width: width}">
    <PeabodyQuizGrid
      class="quiz-grid"
      :width="'100%'" :height="'100%'"
      :showIndicator="false"
      :events="successfulEvents"
      :years="years"
      :actorColors="actorColors"
      @hover-start="onGridHover"
      @event-clicked="onEventClick"
    >
    </PeabodyQuizGrid>
    <div class="event-prompt">
      <div class="event-text">
        <p v-if="playing" v-text="events[currEvent].event"></p>
        <div class="play-again" v-else>
          <a class="blue-hover" @click="restart" href="javascript:void(0);">Play Again</a>
        </div>
      </div>
      <div class="event-nav" v-if="playing">
        <a v-if="currEvent >= 1" @click="currEvent--" href="javascript:void(0);">🡄</a>
        <span>{{currEvent + 1}} / {{events.length}}</span>
        <a v-if="currEvent < events.length - 1" @click="currEvent++" href="javascript:void(0);">🡆</a>
      </div>
      <div class="check-mark">
        <img v-show="successfulEvents.includes(events[currEvent])"
             src="../../../../views/img/checkx-check.png"/>
      </div>
      <div class="show-me">
        <a @click="correctMatch" class="blue-hover" href="javascript:void(0);">Show Me</a>
      </div>
    </div>
    <EventKey
      class="event-key"
      :width="'70%'"
      v-model="eventType"
    >
    </EventKey>
  </div>
</template>

<script>
  import Visualization from "../../../../mixins/vis/Visualization";
  import PeabodyQuizGrid from "./PeabodyQuizGrid";
  import EventKey from "../EventKey";
  import { actorColors } from "../../../../helpers/PeabodyUtils";
  export default {
    components: {EventKey, PeabodyQuizGrid},
    mixins: [Visualization({notebookName: "PeabodyQuiz", saveProps: ["years", "events"]})],
    props: {
      years: {
        type: Array,
        default () {
          return [2001, 2002, 2003, 2004]
        }
      },
      events: {
        type: Array,
        default () {
          return [
            {
              event: "September 11 attacks",
              year: 2001,
              squares: [1],
              actors: ['Americas']
            },
            {
              event: "Gujarat Earthquake (2001)",
              year: 2001,
              squares: [3],
              actors: ['India']
            },
            {
              event: "Bali Bombings (2002)",
              year: 2002,
              squares: [1],
              actors: ['Indonesia']
            },
            {
              event: "Human Genome Project Completed (2003)",
              year: 2003,
              squares: [8],
              actors: ['Americas']
            },
            {
              event: "Orange Revolution in Ukraine (2004)",
              year: 2004,
              squares: [5],
              actors: ['Ukraine']
            }
          ]
        }
      }
    },
    data () {
      return {
        eventType: 1,
        currEvent: 0,
        successfulEvents: [],
        actorColors
      }
    },
    computed: {
      playing () {
        return this.successfulEvents.length < this.events.length
      }
    },
    methods: {
      onGridHover ({year, type}) {
        this.eventType = type;
      },
      onEventClick({year, type}) {
        if (this.playing) {
          const matchEvent = this.events[this.currEvent];
          const correctSquare = matchEvent.squares.includes("full") || matchEvent.squares.includes(type);
          if (year === matchEvent.year && correctSquare) {
            this.correctMatch();
          }
        }
      },
      correctMatch() {
        const matchEvent = this.events[this.currEvent];
        if (!this.successfulEvents.includes(matchEvent)) {
          this.successfulEvents.push(matchEvent);
          if (this.currEvent < this.events.length - 1) {
            this.currEvent++;
          }
        } else {
          this.successfulEvents.splice(this.successfulEvents.indexOf(matchEvent), 1)
        }
      },
      restart() {
        this.currEvent = 0;
        this.successfulEvents.splice(0, this.successfulEvents.length)
      }

    }
  }
</script>

<style scoped>
  .container {
    display: grid;
    grid-template-rows: 30% 70%;
    grid-template-columns: 50% 50%;
  }
  .quiz-grid {
    grid-column: 1 / span 1;
    grid-row: 1 / span 2
  }
  .event-prompt {
    grid-column: 2 / span 1;
    grid-row: 1 / span 1;
    display: grid;
    grid-template-columns: 45% 25% 30%;
    grid-template-rows: 70% 30%;
    background-color: #f5f5f5;
    margin-top: 2%;
    margin-left: 2%;
    padding-top: 5px;
    padding-left: 10px;
  }
  .event-text {
    grid-column: 1 / span 2;
    grid-row: 1 / span 1;
    align-self: center;
    justify-self: center;
  }
  .event-key {
    grid-column: 2 / span 1;
    grid-row: 2 / span 1;
    align-self: center;
    justify-self: center;
  }
  .event-nav {
    grid-column: 2 / span 1;
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
  .check-mark {
    grid-column: 3 / span 1;
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
    grid-column: 3 / span 1;
    grid-row: 2 / span 1;
    align-self: center;
    justify-self: center;
  }
  .event-prompt p{
    font-size: 100%;
  }
  .event-prompt a{
    text-decoration: none;
  }
</style>
