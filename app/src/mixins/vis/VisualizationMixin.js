import { mapGetters, mapMutations } from 'vuex'
import EventBus from '@/helpers/EventBus'
// This mixin helps the visualization interface with vuex to get its data
const VisualizationMixin = {
  props: {
    id: { // the id of the visualization (used to locate it in vuex)
      type: String,
      required: true
    },
    datasetId: {
      type: String,
      required: true
    },
    options: { // will be overridden!
      type: Object,
      required: false,
      default: () => ({})
    },
    busses: {
      type: Array,
      default: () => []
    }
  },
  provide () {
    return {
      localBus: this.localBus,
      options: this.options
    }
  },
  data () {
    return {
      localBus: new EventBus(),
    }
  },
  methods: {
    // ...mapMutations('vis', ['addVis']),
    dataFormatter (d) {
      return d
    }
  },
  computed: {
    rawDataset () {
      return this.$store.state.datasets[this.datasetId]
    },
    dataset () {
      if (this.rawDataset){
        return this.$store.state.datasets[this.datasetId].data
      }
      return {}
    },
    formattedData () {
      return this.dataFormatter(this.dataset)
    },
    styles () {
      return this.options.styles || {}
    }
  },
  created () {
    let self = this;
    this.busses.forEach(bus => bus.register(self.localBus))
  }
}

export default VisualizationMixin
