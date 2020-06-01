<template>
  <PeabodyGrid
    v-on="$listeners"
    :id="id"
    :width="width"
    :height="height"
    :showIndicator="false"
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
    width: {
      type: String,
      required: true
    },
    height: String,
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
        this.transform(dataObj => {
            dataObj[year] = toAdd;
            return dataObj;
          }
        );
      } else {
        this.transform(dataObj => {
          delete dataObj[year];
          return dataObj
        })
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
