<template>
  <PeabodyGrid
    v-bind="$attrs"
    v-on="$listeners"
    :id="id"
    :datasetId="datasetId"
    @event-clicked="handleEventClick"
    />
</template>

<script>
import YearSquare from '@/components/vis/peabody/YearSquare'
import { mapMutations } from 'vuex'
import DataMutator from '@/mixins/vis/DataMutator'
import PeabodyGrid from './PeabodyGrid'

export default {
  inheritAttrs: false,
  components: {
    PeabodyGrid
  },
  mixins: [DataMutator],
  props: {
    color: {
      type: String
    },
    id: {
      type: String,
      required: true
    }
  },
  data: () => ({
    isVis: true
  }),
  methods: {
    handleEventClick({year, type, data}) {
      if (!data) {
        this.addData({
          year,
          eventType: type,
          desc:"imposter",
          color:"#fd1f00"
        })
      } else {
        this.removeData(data)
      }
    }
  }
}
</script>
<style scoped></style>
