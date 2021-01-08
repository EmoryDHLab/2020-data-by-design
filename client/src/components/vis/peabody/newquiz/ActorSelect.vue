<template>
  <ul :class="{'horizontal': !vertical}">
    <li v-for="actor in shownActors">
      <EventSquare :colors="[actorColors[actor]]"
                   :width="squareWidth" :height="squareWidth"
                   @hover-start="hovered(actor)"
                   :highlighted="selectedActor == actor"
      >

      </EventSquare>
<!--      <svg width="25" height="25" viewBox="0 0 50 50">-->
<!--        <rect x="0" y="0" width="50" height="50" :fill="actorColors[actor]"-->
<!--         stroke="yellow" :stroke-width="(selectedActor == actor) * 6"-->
<!--        @mouseover="hovered(actor)"/>-->
<!--      </svg>-->

      <span>{{actor}}</span>
    </li>
  </ul>
</template>

<script>
  import { actorColors} from "../../../../helpers/PeabodyUtils";
  import EventSquare from "../newpeabodygrid/EventSquare";

  export default {
    components: {EventSquare},
    model: {
      prop: 'selectedActor',
      event: 'selected'
    },
    props: {
      selectedActor: String,
      actorColors: {
        type: Object,
        default () {
          return actorColors;
        }
      },
      shownActors: {
        type: Set,
        required: true
      },
      squareWidth: {
        type: String,
        default: "25"
      },
      vertical: {
        type: Boolean,
        default: false,
      }
    },
    methods: {
      hovered (actor) {
        this.$emit("selected", actor);
      }
    }
  }
</script>

<style scoped>

  ul.horizontal {
    text-align: center;
  }

  ul li {
    list-style-type: none;
  }
  ul.horizontal li {
    display: inline-block;
    font-family: Consolas;
    margin-right: 5px;
  }
  ul li span {
    vertical-align: top;
    margin-left: 5px;
  }
  svg {
    display: inline;
  }
</style>
