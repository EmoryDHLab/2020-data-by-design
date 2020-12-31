import {mapActions, mapGetters} from "vuex";
import { VisTypes } from '@/store/chapters/index'
const NavlineMixin = (defaultOptions) => ({
  props: {
    dataset: {
      type: Object,
      required: true
    },
    width: String,
    height: String,
    options: {
      type: Object,
      required: false,
      default: () => defaultOptions
    },
  },
  data() {
    return {hover: null, click: null, scroll: 0, VisTypes}
  },
  mounted () {
    window.addEventListener('scroll', event => this.scroll = window.scrollY)
  },
  computed: {
    /**
     * Formats the data for use by the navline
     * @return {Array} the formattedData
     */
    formattedData () {
      return this.dataFormatter(this.dataset.data || {})
    },
    /**
     * get the internal width (width - margins on left and right) of the vis
     * @return {Number} the width of the navline without margins
     */
    innerWidth () {
      return this.styles.width - this.styles.margin.left - this.styles.margin.right
    },
    /**
     * get the internal height (height - margins on top and bottom) of the vis
     * @return {Number} the height of the navline without margins
     */
    innerHeight () {
      return this.styles.height - this.styles.margin.top - this.styles.margin.bottom
    },
    /**
     * calculate the margin transforation required to move the vis internal
     * content to respect the defined marigins
     * @return {Object} containing the transform attribute used in styling
     */
    marginTransform () {
      return { transform: 'translate('
          + this.styles.margin.left + 'px, '
          + this.styles.margin.top + 'px)' }
    },
    /**
     * Shift the axis to align it better
     * TODO make this non-magical
     */
    axisTransform () {
      return { transform: `translateX(-${5}px)` }
    },
    /**
     * Get the svg viewbox attribute using the given information in options
     */
    getViewBox () {
      return `0 0 ${this.styles.width} ${this.styles.height}`
    },
    /**
     * get the minimum position in the vis
     * @return {Number} the minimum position of the axis
     */
    startPoint () {
      if (!this.dataset.range) {
        return 0
      }
      return this.dataset.range[0]
    },
    /**
     * get the maximum position in the vis
     * @return {Number} the maximum position of the axis
     */
    endPoint () {
      if (!this.dataset.range) {
        return 0
      }
      return this.dataset.range[1]
    },
    /**
     * get the d3 scale used for positioning in the vis
     * @return {D3 Scale} the scale to be used for the visualization
     */
    getScale() {
      return d3.scaleLinear()
        .domain([this.startPoint, this.endPoint])
        .range([this.styles.margin.top, this.innerHeight]);
    },
    getProgress() {
      const lastOffset = this.closestPastOffset(this.scroll);
      if (!lastOffset) return 0;
      const prog = this.offsets[lastOffset];
      return Number(`${prog.section}.${prog.subsection}`);
    },
    styles () {
      return this.options.styles || {}
    },
    //...mapState('chapters', ['scrollProgress'])
    ...mapGetters('chapters', ['offsets', 'closestPastOffset'])
  },
  methods: {
    ...mapActions('chapters', ['scrollTo']),
    goto: function (section, subsection) {
      this.scrollTo({ section, subsection})
    },
    /**
     * Formats the data to match the navline format
     * [
     *  {
     *    id: <bucket position>
     *    events: [
     *      {
     *        color:"<some color>",
     *        position:Number(<some position>),
     *        ...eventdata
     *      },
     *      ...otherEventsInThisBucket
     *    ],
     *  }
     *  ...otherBuckets
     * ]
     * TODO make colors dynamic and configurable
     */
    dataFormatter (d) {
      const data = Object.values(d)
        .map(evt => ({
          color: "#db882a",
          ...evt,
          position: Math.floor(evt.position)
        }))
        .reduce((buckets, evt) => {
          if (!buckets[evt.position]) {
            buckets[evt.position] = { id: evt.position, events: [] }
          }
          buckets[evt.position].events.push(evt)
          return buckets
        }, {})
      return Object.values(data)
    },
    placeBucket (bucket) {
      // console.log(this.getScale(bucket.id));
      const dx = this.getScale(bucket.id) - (this.styles.timelineEvent.width / 2)
      const dy = this.innerHeight - (this.styles.timelineEvent.height + this.styles.timelineEvent.gap)
      return { transform: `translate(${0}px, ${dx}px)` }
    },
  },
  directives: {
    /**
     * allows us to use d3 axis on an element in a Vue approved way
     */
    axis(el, binding) {
      const axis = binding.arg; // :x or :y
      const axisMethod = { x: "axisBottom", y: "axisLeft" }[axis];
      const methodArg = binding.value;
      // console.log(d3[axisMethod]);
      d3.select(el).call(d3[axisMethod](methodArg).tickFormat(d3.format("d")));
    }
  }
})
export default NavlineMixin;
