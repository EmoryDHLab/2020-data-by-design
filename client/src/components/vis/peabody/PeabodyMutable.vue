<template>
  <div class="container">
    <PeabodyGrid
      v-on="$listeners"
      :id="id"
      :isInNotebook="isInNotebook"
      :width="width"
      :height="height"
      :highlighted="editingNumber"
      :showIndicator="false"
      :mutableDataset="mutableDataset"
      :actor-colors="actors"
      @event-clicked="handleEventClick"
    />
    <div class="sidebar">
      <p class="intro-text" v-if="!isEditing">
        Click a square to edit
      </p>
      <div v-else>
        <h1>{{editing.year}}</h1>
        <h2 class="event-title">
          {{currSquareEvent.event}}
        </h2>
        <h2>
          <EventSquare width="16px"
                       :colors="currSquareActors.length ? currSquareActors.map(actor => actors[actor]) : ['lightgray']">
          </EventSquare>
          {{squareKeys[editing.square - 1]}}
        </h2>
        <div class="actor-select" v-for="(actor, index) in currSquareActors">
          <EventSquare class="event-square" width="16px" :colors="[actors[actor]]"></EventSquare>
          <select v-model="currSquareActors[index]">
            <optgroup>
              <option disabled value="">Actor...</option>
              <option v-for="actorChoice in Object.keys(actors)" :style="{ color: actors[actorChoice]}">{{actorChoice}}</option>
            </optgroup>
          </select>
          <a class="remove-actor blue-hover" @click="removeActor(index)" href="javascript:void(0);">Remove</a>
        </div>
<!--        <div v-if="userAddedEvents[this.editingNumber]">-->
<!--          <div class="actor-select" v-for="(actor, index) in userAddedEvents[editingNumber].actors">-->
<!--            <EventSquare class="event-square" width="16px" :colors="[actors[actor]]"></EventSquare>-->
<!--            <select v-model="userAddedEvents[editingNumber].actors[index]">-->
<!--              <optgroup>-->
<!--                <option disabled value="">Actor...</option>-->
<!--                <option v-for="actorChoice in Object.keys(actors)" :style="{ color: actors[actorChoice]}">{{actorChoice}}</option>-->
<!--              </optgroup>-->
<!--            </select>-->
<!--          </div>-->
<!--        </div>-->
        <a class="add-new-actor blue-hover" href="javascript:void(0);" @click="addNewActor">Add Actor</a>
      </div>
    </div>
  </div>
</template>

<script>
import Visualization from '@/mixins/vis/Visualization'
import {actorColors, dataToYears} from "../../../helpers/PeabodyUtils";

import EventSquare from './newpeabodygrid/EventSquare'
import PeabodyGrid from './newpeabodygrid/PeabodyGrid'

export default {
  components: {
    PeabodyGrid,
    EventSquare
  },
  mixins: [Visualization({notebookName: "PeabodyMutable"})],
  props: {
    height: String,
    id: {
      type: String,
      required: false
    },
    staticDataset: {
      type: String
    },
    mutableDataset: {
      type: String,
      required: true
    },
    actors: {
      type: Object, // { actorName: "rgb(r,g,b)", actorName: "lightblue", ... }
      default () {
        return actorColors;
      }
    },
  },
  data () {
    return {
      editing: {
        year: null,
        square: null
      },
      squareKeys: [ "Battles, Sieges, Beginning of War",
        "Conquests, Annexations, Unions",
        "Losses and Disasters",
        "Falls of States",
        "Foundations of States and Revolutions",
        "Treaties and Sundries",
        "Births",
        "Deeds",
        "Deaths, of Remarkable Individuals"]
    }
  },
  computed: {
    isEditing() {
      return this.editing.year && this.editing.square;
    },
    century() {
      return Math.round(this.data[0].year / 100) * 100;
    },
    editingNumber() {
      if (this.isEditing) {
        return Number(`${this.editing.year - this.century}.${this.editing.square}`);
      }
    },
    years() {
      if (Array.isArray(this.data) && this.data.length > 0) {
        return dataToYears(this.data);
      }
    },
    currSquareEvent() {
      if (Array.isArray(this.data) && this.editing.year) {
        const events = this.data
          .filter(event => event.year == this.editing.year)
          .filter(event => event.squares.includes("full") || event.squares.includes(this.editing.square));
        if (events && events[0]) {
          return events[0];
        }
      }
    },
    currSquareActors() {
      if (this.currSquareEvent) {
        return this.currSquareEvent.actors;
      }
      // if (this.years && this.years[this.editing.year]) {
      //   return this.years[this.editing.year][this.editing.square - 1].actors
      // }
      return []
    }
  },
  methods: {
    addNewActor() {
      if (this.currSquareActors.length) {
        this.currSquareActors.push("Americas");
      } else {
        const newEvent  = {
          event: `User-added event ${this.editingNumber}`,
          year: this.editing.year,
          squares: [this.editing.square],
          actors: ["Americas"]
        }
        this.transform(dataobj => {
          dataobj.push(newEvent);
          return dataobj;
        });
      }
      // if (this.newActors)
      // this.newActors.push(Object.keys(this.actors)[0]);
    },
    removeActor (index) {
      this.currSquareActors.splice(index, 1);
      if (this.currSquareActors.length == 0) {
        this.transform(dataobj => {
          dataobj.splice(dataobj.indexOf(this.currSquareEvent), 1);
          return dataobj;
        });
      }
    },
    handleEventClick({year, type, sub}) {
      this.editing.year = year;
      this.editing.square = type;
      // if (!data) {
      //   const toAdd = {year, eventType: type, desc: "imposter", color: "#fd1f00"}
      //   this.transform(dataObj => {
      //       dataObj[year] = toAdd;
      //       return dataObj;
      //     }
      //   );
      // } else {
      //   this.transform(dataObj => {
      //     delete dataObj[year];
      //     return dataObj
      //   })
      // }
      console.log({year, type, sub})
      // if (!data) {
      //   this.addData({
      //     year,
      //     eventType: type,
      //     desc:"imposter",
      //     color:"#fd1f00"
      //   })
      // } else {
      //   this.removeData(data)
      // }
    }
  }
}
</script>

<style scoped>
  .container {
    width: fit-content;
    display: flex !important;
  }

  .sidebar {
    width: 26vh;
  }

  .intro-text {
    margin-left: 2vh;
    font-size: 10pt;
  }

  .actor-select {
    margin-left: 2vh;
    margin-bottom: 1vh;
  }

   h1 {
    margin-left: 2vh;
    font-family: monospace;
    font-size: 2vh;
    font-weight: normal;
  }
   h2 {
     margin-left: 3vh;
     margin-top: -1.5vh;
     margin-bottom: 1vh;
     font-size: 1.5vh;
   }

   h2.event-title {
     font-family: Roboto;
     margin-bottom: 2vh;
   }
  .actor-select optgroup {
    font-size: 16pt;
  }

  .actor-select select {
    font-size: 16pt;
    width: 16vh;
  }

  .actor-select .event-square {
    display: inline-block;
    margin-right: 1vh;
  }

  a.add-new-actor, a.remove-actor {
    text-decoration: underline;
  }

  a.add-new-actor {
    margin-left: 10%;
  }

  a.remove-actor {
    margin-left: 10%;
  }
</style>
