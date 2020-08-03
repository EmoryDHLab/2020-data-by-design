<template>
  <PeabodyGrid
    v-on="$listeners"
    :id="id"
    :isInNotebook="isInNotebook"
    :width="width"
    :height="height"
    :showIndicator="false"
    :mutableDataset="mutableDataset"
    @event-clicked="handleEventClick"
    />
</template>

<script>
import PeabodyGrid from './newpeabodygrid/PeabodyGrid'
import Visualization from '@/mixins/vis/Visualization'

export default {
  components: {
    PeabodyGrid
  },
  mixins: [Visualization({notebookName: "PeabodyMutable"})],
  props: {
    color: {
      type: String
    },
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
    }
  },
  methods: {
    handleEventClick({year, type, sub}) {
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
<style scoped></style>
