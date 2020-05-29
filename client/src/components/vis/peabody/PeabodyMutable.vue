<template>
  <PeabodyGrid
    v-on="$listeners"
    :id="id"
    :mutableDataset="mutableDataset"
    @event-clicked="handleEventClick"
    />
</template>

<script>
import { mapMutations } from 'vuex'
import PeabodyGrid from './PeabodyGrid'
import Visualization from '@/mixins/vis/Visualization'
import Vue from 'vue'

export default {
  components: {
    PeabodyGrid
  },
  mixins: [Visualization()],
  props: {
    color: {
      type: String
    },
    id: {
      type: String,
      required: true
    },
    staticDataset: {
      type: String
    },
    mutableDataset: {
      type: String,
      required: true
    }
  },
  methods: {
    handleEventClick({year, type, data}) {
      if (!data) {
        const toAdd = {year, eventType: type, desc: "imposter", color: "#fd1f00"}
        this.transform(dataObj =>
          Object.assign(dataObj, {year: toAdd})
        );
      }
      console.log({year, type, data})
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
<style scoped></style>
