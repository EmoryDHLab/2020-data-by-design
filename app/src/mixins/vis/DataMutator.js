import { mapGetters, mapMutations } from 'vuex'
import EventBus from '@/helpers/EventBus'

const DataMutator = {
  props: {
    datasetId: {
      type: String,
      required: true
    },
  },
  methods: {
    addData (data) {
      if (!this.isMutable) return;
      this.$store.commit('ADD_DATA', { id: this.datasetId, data })
    },
    removeData(data) {
      if (!this.isMutable) return;
      this.$store.commit('REMOVE_DATA', { id: this.datasetId, data })
    }
  },
  computed: {
    rawDataset () {
      return this.$store.state.datasets[this.datasetId]
    },
    isMutable () {
      return (this.rawDataset) ? new Boolean(this.rawDataset.isMutable) : false
    }
  }
}

export default DataMutator
