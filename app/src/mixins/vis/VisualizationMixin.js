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
    ...mapMutations('vis', ['addVis']),
    dataFormatter (d) {
      return d
    }
  },
  computed: {
    ...mapGetters('vis', ['getVis', 'getFormattedData']),
    ...mapGetters('data', ['getDataset']),
    dataset () {
      return this.getDataset(this.datasetId)
    },
    formattedData () {
      return this.dataFormatter(this.dataset)
    },
    styles () {
      return this.options.styles || {}
    }
  },
  created () {
    if (this.getVis(this.id)) throw new Error('Vis id conflict');
    this.addVis({
      id: this.id,
      datasetId: this.datasetId
    })
  }
}

export default VisualizationMixin
