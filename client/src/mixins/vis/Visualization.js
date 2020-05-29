import { mapGetters, mapActions} from 'vuex'

const injects = {
  width: "width",
  widthTimes: "widthTimes",
  calcWidth: "calcWidth",
  registerEvent: "registerEvent",
  registerEvents: "registerEvents",
  data: "data"
}

// This mixin helps the visualization interface with vuex to get its data
const Visualization = ({staticDataset, mutableDataset} = {}) => ({
  props: {
    width: {
      type: String,
      required: true
    },
    /*Looks for these "optional" props on the mixed-in Component:
    staticDataset: String
    mutableDataset: String
     */
  },
  data () {
    return {
      registeredEvents: {}
    }
  },
  methods: {
    widthTimes(scalar) {
      return this.calcWidth(`* ${scalar}`)
    },
    calcWidth(expression) {
      return `calc(${this.width} ${expression})`
    },
    registerEvent(vueInstance, eventName) {
      vueInstance.$on(eventName, event => this.$emit(eventName, event));
    },
    registerEvents(vueInstance, eventsArray) {
      eventsArray.forEach(eventName => this.registerEvent(vueInstance, eventName));
    },
    transform(transformFunc /*function (dataObj) => transformedData*/) {
      if (this.mutableId) {
        this.transformMutableData({id: this.mutableId, transform: transformFunc});
      }
    },
    ...mapActions({
      loadStaticDataset: 'dataset/loadDataset',
      registerMutableData: 'mutable/registerMutableData',
      transformMutableData: 'mutable/transform'
    })
  },
  provide () {
    return Object.fromEntries(
      Object.entries(injects).map(
        ([key, val]) => [key, this[val]]
      )
    )
  },
  computed: {
    staticId () {
      return this.staticDataset || staticDataset;
    },
    mutableId () {
      return this.mutableDataset || mutableDataset;
    },
    data () {
      if (this.mutableId) {
        return this.getMutableData(this.mutableId);
      }
      if (this.staticId) {
        return this.getStaticData(this.staticId);
      }
      return {}
    },
    ...mapGetters({
      getStaticData: 'dataset/getDatasetById',
      getMutableData: 'mutable/getMutableData',
      isRegisteredMutable: 'mutable/isRegisteredMutable'
    })
  },
  created () {
    if (this.staticId) {
      this.loadStaticDataset(this.staticId)
        .then(data => {
          if (this.mutableId) {
            this.registerMutableData({
              id: this.mutableId,
              data: data
            })
          }
        })
        .catch(err => {
          console.dir(this)
          console.error("Error loading static dataset of id: " + staticDataset)
        })
    }
    else if (this.mutableId && !this.isRegisteredMutable(this.mutableId)) {
      debugger;
      this.registerMutableData({id: this.mutableId});
    }
  }
})

export {injects, Visualization as default}
