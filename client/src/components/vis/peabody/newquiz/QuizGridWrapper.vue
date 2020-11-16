<template>
  <QuizGridFull
    class="quiz-grid"
    :width="width"
    :showIndicator="false"
    :events="eventsToRender"
    :century="century"
    :actorColors="actors"
    @hover-start="onGridHover"
    @event-clicked="onEventClick"
  >
  </QuizGridFull>
</template>
<script>
  import QuizGridFull from "./QuizGridFull";
  import { actorColors} from "../../../../helpers/PeabodyUtils";
  /*
  Emits:
  update:eventsProgress (this.eventsProgress)
  completed (this.century) - when all events are completed
  hovered (eventType)
   */
  export default {
    components: {QuizGridFull},
    props: {
      width: {
        type: String,
        default: "100%",
      },
      active: {
        type: Boolean,
        default: true
      },
      chosenActor: {
        type: String
      },
      actors: {
        type: Object,
        default () {
          return actorColors;
        }
      },
      century: {
        type: Number,
        required: true
      },
      currEvent: {
        type: Number,
        default: 0
      },
      events: {
        type: Array
      },
      eventsProgress: {
        type: Object
      }
    },
    data () {
     return {
       completedEvents: 0,
     }
    },
    computed: {
      eventsToRender () {
        // this.completedActors;
        // this.completedEvents;
        return Object.entries(this.eventsProgress)
          .map(([key, progressObj]) => {
            return Object.assign({}, this.events[key], progressObj)
          }
          )
      },
    },
    methods: {
      getProgressObj (eventIndex) {
        if (!this.eventsProgress) return;
        if (!this.eventsProgress[eventIndex]) {
          if (!this.events) return;
          const matchEvent = this.events[eventIndex];
            return this.$set(this.eventsProgress, eventIndex, {
            actors: matchEvent.actors.map(a => "blank"),
            completed: false
          });
        }
        return this.eventsProgress[eventIndex];
      },
      onGridHover ({year, type}) {
        this.$emit("hovered", {year, type});
      },
      onEventClick({year, type}) {
        let progressObj = this.getProgressObj(this.currEvent);
        const actorCompleted = progressObj && progressObj.actors.includes(this.chosenActor);
        if (this.active && this.events && !actorCompleted) {
          const matchEvent = this.events[this.currEvent];
          const matchingActorIndex = matchEvent.actors.indexOf(this.chosenActor);
          if (matchingActorIndex === -1) return;
          const correctYear = year === matchEvent.year;
          if (!correctYear) return;
          const correctSquare = matchEvent.squares.includes("full") || matchEvent.squares.includes(type);
          if (!correctSquare) return;
          progressObj.actors = progressObj.actors.map( (el, i) => matchEvent.actors[i] == this.chosenActor ? this.chosenActor : el)
          // progressObj.actors[matchingActorIndex] = this.chosenActor;
          const completed = progressObj.actors.every((actor, index) => actor == matchEvent.actors[index]);
          progressObj.completed = completed;
          this.completedEvents++;
          this.emitUpdateEvents();
        }
      },
      emitUpdateEvents () {
        this.$emit("update:eventsProgress", this.eventsProgress);
        if (this.completedEvents == this.events.length) {
          this.$emit("completed", this.century);
        }
      },
      complete(index) {
        const progressObj = this.getProgressObj(index);
        if (progressObj.completed) return false;
        const matchEvent = this.events[index];
        progressObj.actors = progressObj.actors.map ( (el, i) => matchEvent.actors[i]);
        progressObj.completed = true;
        this.completedEvents++;
        this.emitUpdateEvents();
        return true;
      },
      completeCurrent () {
        this.complete(this.currEvent);
      },
      completeAll () {
        this.events.forEach( (ev, index) => this.complete(index));
      },
      restartAll () {
        this.$emit("update:eventsProgress", {});
        this.completedEvents = 0;
      }
    }
  }
</script>

<style scoped>

</style>
