import { mapGetters} from 'vuex'

const VisStateMixin = {
  props: {
    vId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters('vis', ['getConfig', 'getDataset', 'getVis', 'getFormattedData']),
    config () {
      return this.getConfig(this.vId)
    },
    dataset () {
      return this.getDataset(this.vId)
    },
    formattedData () {
      return this.getFormattedData(this.vId)
    }
  }
}

export default VisStateMixin
