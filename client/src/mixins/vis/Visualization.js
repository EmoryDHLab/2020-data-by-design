import { mapGetters, mapActions, mapState} from 'vuex'

const injects = {
  width: "width",
  widthTimes: "widthTimes",
  calcWidth: "calcWidth",
  registerEvent: "registerEvent",
  registerEvents: "registerEvents",
  data: "data",
  transform: "transform"
}

// This mixin helps the visualization interface with vuex to get its data
const Visualization = ({staticDataset, mutableDataset} = {}) => ({
  props: {
    width: {
      type: String,
      required: true
    },
    showIndicator: {
      type: Boolean,
      default: true
    }
    /*Looks for these "optional" props on the mixed-in Component:
    staticDataset: String
    mutableDataset: String
     */
  },
  data () {
    return {
      registeredEvents: {},
      indicatorRendered: false
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
    ...mapState('mutable', ['mutableData']),
    staticId () {
      return this.staticDataset || staticDataset;
    },
    mutableId () {
      return this.mutableDataset || mutableDataset;
    },
    data () {
      this.mutableData.lastUpdated; //register dependency
      if (this.mutableId) {
        return this.mutableData[this.mutableId];
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
      this.registerMutableData({id: this.mutableId});
    }
  },
  mounted () {
    if (this.showIndicator && !this.indicatorRendered) {
      const test = document.createElement('div');
      test.style.width = "20px";
      test.style.height = "20px";
      test.style.opacity = "50%";
      test.style.backgroundColor = "blue";
      test.style.position = "absolute";
      test.style.left = this.$el.offsetLeft + 'px';
      test.style.top = this.$el.offsetTop + 'px';
      test.style.transform = "translate(-75%,-50%)";
      this.$el.append(test);
      this.indicatorRendered = true;
    }
  }
})

export {injects, Visualization as default}
