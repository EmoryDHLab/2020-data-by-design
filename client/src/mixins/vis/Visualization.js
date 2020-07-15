import { mapGetters, mapActions, mapState} from 'vuex'

import { notebookTypes } from 'dxd-common'

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
const Visualization = ({staticDataset, mutableDataset, notebookName, saveProps } = {}) => ({
  props: {
    width: {
      type: String,
      required: true
    },
    showIndicator: {
      type: Boolean,
      default: true
    },
    isInNotebook: {
      type: Boolean,
      default: false
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
    transformMutableData(payload) {
      this.$store.dispatch(this.mutableModule + "/transform", payload);
    },
    registerMutableData(payload) {
      this.$store.dispatch(this.mutableModule + "/registerMutableData", payload);
    },
    ...mapActions({
      loadStaticDataset: 'dataset/loadDataset',
      registerVisualization: 'chapters/registerVisualization'
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
    mutableData () {
      return this.isInNotebook ?
        this.$store.state.notebook.mutableStore.mutableData :
        this.$store.state.mutable.mutableData;
    },
    getMutableData () {
      return this.$store.getters[this.mutableModule + '/getMutableData'];
    },
    isRegisteredMutable () {
      return this.$store.getters[this.mutableModule + '/isRegisteredMutable'];
    },
    mutableModule () {
      return (this.isInNotebook ? "mutableStore" : "mutable");
    },
    staticId () {
      return this.staticDataset || staticDataset;
    },
    mutableId () {
      return this.mutableDataset || mutableDataset;
    },
    data () {
      if (this.mutableId) {
        this.mutableData.lastUpdated; //register dependency
        return this.mutableData[this.mutableId];
      }
      if (this.staticId) {
        return this.getStaticData(this.staticId);
      }
      return {}
    },
    ...mapGetters({
      getStaticData: 'dataset/getDatasetById',
    })
  },
  created () {
    if (!this.mutableId && !this.staticId) return;
    if (!this.isRegisteredMutable(this.mutableId)) {
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
      else if (this.mutableId) {
        this.registerMutableData({id: this.mutableId});
      }
    }
  },
  mounted () {
    this.registerVisualization({element: this.$el});
    if (this.showIndicator && !this.indicatorRendered && this.$el && this.$el.append)  {
      const dragger = document.createElement('img');
      dragger.style.width = "20px";
      dragger.style.height = "20px";
      dragger.src = require('../../assets/cross-arrows.png')
      dragger.style.opacity = "50%";
      dragger.style.position = "absolute";
      // dragger.style.left = this.$el.offsetLeft + 'px';
      // dragger.style.top = this.$el.offsetTop + 'px';
      dragger.style.transform = "translate(-75%,-50%)";
      // this.$el.addEventListener("mouseover", e => dragger.style.display = "block");
      // this.$el.addEventListener("mouseout", e => dragger.style.display = "none")
      dragger.addEventListener("mouseover", e => dragger.style.opacity = "100%");
      dragger.addEventListener("mouseout", e => dragger.style.opacity = "50%")
      if (notebookName) {
        dragger.addEventListener("dragstart", e => {
          console.dir(this.$props);
          let saved;
          if (saveProps && saveProps.length > 0) {
            saved = Object.fromEntries(saveProps.map(propName => [propName, this.$props[propName]]))
          }
          const data = {
            ...this.staticId && { static: this.staticId },
            ...this.mutableId && { mutable: this.mutableId }
          }
          const notebookItem = {
            type: notebookTypes.VISUALIZATION,
            data: data,
            metadata: { name: notebookName, props: saved }
          }
          this.$store.dispatch("startDrag", notebookItem)
        })
      }
      this.$el.append(dragger);
      this.indicatorRendered = true;
    }
  }
})

export {injects, Visualization as default}
