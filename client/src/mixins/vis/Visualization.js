import { mapGetters, mapActions} from 'vuex'
import EventBus from '@/helpers/EventBus'
// This mixin helps the visualization interface with vuex to get its data
const Visualization = (datasetId, mutableId) => ({
  props: {
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
    },
    ...mapActions({
      loadDataset: 'dataset/loadDataset',
      registerVisualization: 'visualization/registerVisualization'
    })
  },
  computed: {
    data () {
      if (mutableId) {
        return this.getVizData(mutableId);
      }
      if (datasetId) {
        return this.getStaticData(datasetId);
      }
      return {}
    },
    ...mapGetters({
      'getStaticData': 'dataset/getDatasetById',
      'getVizData': 'visualization/getVisualizationData'
    })
  },
  created () {
    if (datasetId) {
      this.loadDataset(datasetId)
        .then(data => {
          if (this.isMutable) {
            this.registerVisualization({
              id: this.mutableId,
              data: data
            })
          }
        }).catch(err => {
          console.error("Error loading static dataset of id: " + datasetId)
        })
    }
  }
})

export default Visualization
