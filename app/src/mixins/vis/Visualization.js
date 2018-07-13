import { mapGetters, mapMutations } from 'vuex'
import EventBus from '@/helpers/EventBus'
import DataMutator from './DataMutator'
// This mixin helps the visualization interface with vuex to get its data
const Visualization = {
  mixins: [DataMutator],
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
    subscribers: {
      type: Array,
      default: () => ([])
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
      localBus: new EventBus(this.id),
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
      return this.$store.state.dataset.datasets[this.datasetId]
    },
    dataset () {
      if (this.rawDataset){
        return this.$store.state.dataset.datasets[this.datasetId].data
      }
      return {}
    },
    isMutable () {
      return (this.rawDataset) ? this.rawDataset.isMutable : false
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
    this.subscribers.forEach(({bus, events}) => {
      bus.subscribe(self.localBus, self.id, events)
      console.log(`Subscribed ${bus.getName()} to ${self.localBus.getName()}`);
    })
  }
}

export default Visualization
