import { mapGetters, mapMutations } from 'vuex'
import EventBus from '@/helpers/EventBus'
// This mixin helps the visualization interface with vuex to get its data
const Visualization = {
  props: {
    id: { // the id of the visualization (used to locate it in vuex)
      type: String,
      required: true
    },
    dataset: {
      type: Object,
      required: true
    },
    options: { // will be overridden!
      type: Object,
      default: () => ({})
    },
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
        vm.$emit(event, {datasetId:this.datasetId, ...payload});
      })
    })
  }
}

export default Visualization
