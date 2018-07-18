import { mapGetters, mapMutations } from 'vuex'
import EventBus from '@/helpers/EventBus'
// This mixin helps the visualization interface with vuex to get its data
const Visualization = {
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
      default: () => ({})
    },
    externalBus: {
      type: Object,
      required: false
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
    const vm = this
    console.log(this.$listeners);
    Object.keys(this.$listeners).forEach(event => { // expose all events
      vm.localBus.on(event, (payload) => {
        vm.$emit(event, payload);
        if (vm.externalBus) {
          vm.externalBus.fire(event, payload)
        }
      })
    })
  }
}

export default Visualization
