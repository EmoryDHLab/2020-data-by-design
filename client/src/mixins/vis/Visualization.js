import { mapGetters, mapMutations } from 'vuex'
import EventBus from '@/helpers/EventBus'
// This mixin helps the visualization interface with vuex to get its data
const Visualization = (datasetId, mutableId) => ({
  props: {
    datasetId: {
      type: String,
      required: true
    },
    width: {
      type: String,
      required: true
    }
  },
  methods: {
    widthTimes(scalar) {
      return this.calcWidth(`* ${scalar}`)
    },
    calcWidth(expression) {
      return `calc(${this.width} ${expression})`
    }
  },
  computed: {
    dataset () {
      if (this.mutableId) {
        return this.$store.visualization.getVisualizationData(mutableId);
      }
      return this.$store.datasetNew.getters.getDatasetById(id);
    }
  },
  created () {
    this.$store.datasetNew.loadDataset(this.datasetId)
      .then(data => {
        if (this.isMutable) {
          this.$store.visualization.registerVisualization({
            id: this.mutableId,
            data: data
          })
        }
      })
  }
})

export default Visualization
