<template>
  <div class="scrollytell" :class="{'vertical-flex': above}">
    <div class="scrollytell-fixed" :style="fixedDivStyles">
      <slot name="fixed" :scrolled="scrolled" :progress="progressToNext"></slot>
    </div>
    <div ref="scrollContainer" class="scrollytell-scroll">
<!--      <div v-if="collect" ref="collected" class="scrollytell-collected">-->
<!--        <div v-for="slot in scrolled">-->
<!--          <slot :name="slot" :scrolled="scrolled" :progress="progressTo(slot)"></slot>-->
<!--        </div>-->
<!--      </div>-->
      <div v-for="(slot, index) in scrollSlots" ref="textSlots" class="scroll-item"
           :class="{'solid-border': itemsBackgroundColor /*&& scrolled <= index*/}"
           :style="scrollItemStyles(slot)">
        <!--We use conditional rendering to only generate the waypoints once the slots have been rendered
        and we're able to check their heights to generate the offsets.-->
        <!--:style="{ opacity: Number(scrolled <= index)}"-->
        <basic-waypoint v-if="mounted" v-show="showScrollItem(index)"
          @triggered:down="scrollDown(slot)"
          @triggered:up="scrollUp(slot)"
          @scrolled="scrolling"
          :offset="offset(slot)">
          <slot :name="slot" :scrolled="scrolled" :progress="progressTo(slot)"></slot>
        </basic-waypoint>
        <slot v-else :name="slot" :scrolled="scrolled" :progress="progressTo(slot)"></slot>
      </div>
<!--      <div v-if="collect" class="scroll-item-dummy" :style="scrollItemStyles(scrollSlots + 1)"></div>-->
    </div>
  </div>
</template>
<script>


import BasicWaypoint from "../waypoints/BasicWaypoint";
import * as d3 from "d3";
export default {
  components: {BasicWaypoint},
  props: {
    scrollSlots: {
      /*Tell the component how many scroll slots you're sending!*/
      type: Number,
      required: true
    },
    above: {
      /*situates the scroll elements above the fixed, rather than beside it.
       Currently does *not* work with 'collect' on!
       */
      type: Boolean,
      default: false
    },
    collect: {
      /* Stick the scrolly elements to the top, and to each other
         ("collect" them at the top)
       */
      type: Boolean,
      default: false,
    },
    collectMargin: { //gap between collected items, in pixels
      type: Number,
      default: 20
    },
    pause: {
      /*
        Stick the top scrolly element to the top of the view.
        Only works if 'collect' is off!
       */
      type: Boolean,
      default: false,
    },
    top: { //The "offset" from top, after which an element is considered scrolled
      type: Number,
      default: 70,
    },
    margin: { //bottom margin between items
      type: String,
      default: '100vh'
    },
    bottomBreak: { //apply the bottom margin to the last scroll element
      type: Boolean,
      default: false
    },
    itemsBackgroundColor: {
      type: String,
    }
  },
  data () {
    return {
      scrolled: 0,
      progressToNext: 0,
      done: false,
      scrollContainer: {},
      mounted: false,
    }
  },
  methods: {
    scrolling(event) {
      const last = event.lastWaypoint.triggerPoint;
      const next = event.nextWaypoint.triggerPoint;
      this.progressToNext = (event.newScroll - last) / (next - last);
      this.$emit('scroll', { scrolled: this.scrolled, progress: this.progressToNext})
    },
    stuckHeights() {
      if (this.$refs['textSlots'])
        return this.$refs['textSlots'].map(element => element.offsetHeight);
    },
    scrollDown (index) {
      this.scrolled = Number(index);
      if (this.scrolled >= this.scrollSlots)
        this.done = true;
    },
    scrollUp (index) {
      this.scrolled = Number(index - 1);
      if (this.done) this.done = false;
    },
    offset (index) {
      if (!this.mounted || !this.$refs["textSlots"]) return null;
      if (!this.collect) {
        return this.top;
      }
      const ans = this.top + this.stuckHeights().slice(0,Number(index - 1)).reduce((acc, curr) => acc + curr + this.collectMargin, 0);
      return ans;
    },
    showScrollItem (index) {
      // if (this.collect) {
      //   return this.scrolled <= index;
      // }
      // if (this.pause) {
      //   return this.scrolled == index || this.scrolled == index - 1;
      // }
      return true;
    },
    scrollItemStyles (index) {
      if (!this.mounted) return {}
      const styles = {}
      // console.log(this.scrolled, this.progressToNext);
      console.log(this.$refs["textSlots"][2].offsetHeight)
      if (index > 1 && index == this.scrolled + 1) {
        styles.opacity = d3.scaleLinear()
          .domain([0, 0.4])
          .range([0, 1])
          .clamp(true)
          (this.progressToNext);
      }
      if (this.itemsBackgroundColor) {
        styles.backgroundColor = this.itemsBackgroundColor;
      }
      if (!this.bottomBreak && index >= this.scrollSlots) {
        return styles;
      }
      styles['margin-bottom'] = this.margin;
      if (this.collect) {
        if (this.done && index !== this.scrollSlots) { //fires once per element!
          console.log("done")
          const curr = this.$refs["textSlots"][index - 1];
          const myHeight = curr.offsetHeight;
          return {
            position: 'sticky',
            top: `${this.offset(this.scrollSlots)}px`,
            //TODO: break up, explain magic numbers
            transform: `translateY(${this.offset(index) + myHeight + 5 - this.offset(this.scrollSlots) - this.offset(1)}px)`,
            ...styles
          };
        }
        return {
          position: "sticky",
          top: this.offset(index) + "px",
          ...styles
        }
      }
      if (this.pause) {
        const curr = this.$refs["textSlots"][index - 1];
        const myHeight = curr.offsetHeight;
        let top = this.top;
        if (this.above) {
          top += (Math.max(...this.stuckHeights()) - myHeight) / 2;
        }
        const pauseStyles = {
          position: "sticky",
          top: top + "px",
          ...styles
        }
        if (index == this.scrolled) {
          const scale = d3.scaleLinear().domain([0.8, 1]).range([0, -myHeight - this.top]).clamp(true);
          const adjust = scale(this.progressToNext);
          return {
            transform: `translateY(${adjust}px)`,
            ...pauseStyles
          }
        }
        if (this.scrolled >= 1 && index == this.scrolled + 1) {
          return pauseStyles;
        }
        return styles;
      }
      return styles;
    }
  },
  computed: {
    fixedDivStyles () {
      let top = this.top;
      if (this.above && this.mounted) {
        const stuckHeights = this.stuckHeights();
        if (Array.isArray(stuckHeights)) {
          const largestScrollItemHeight = Math.max(...stuckHeights);
          top += largestScrollItemHeight;
        }
      }
      return {
        top: top + 'px'
      }
    },
    progressTo() {
      return index => {
        if (this.scrolled < index - 1)
          return 0;
        if (this.scrolled > index - 1)
          return 1
        return this.progressToNext;
      };
    }
  },
  mounted () {
    this.mounted = true;
    this.$store.dispatch('chapters/registerScrollytell', {element: this.$el});
    // const child = this.$refs['scrollContainer'];
    // let top = child.offsetTop;
    // let curr = child.offsetParent;
    // while (curr) {
    //   top += curr.offsetTop;
    //   curr = curr.offsetParent;
    // }
    // let scrolling = false;
    // window.addEventListener("scroll", (event) => {
    //   scrolling = true;
    // })
    // const startingOffsets = this.$refs['textSlots'].map(el => el.offsetTop);
    // setInterval(() => {
    //   if (scrolling && window.scrollY > top) {
    //     scrolling = false;
    //     console.log(this.scrolled, top);
    //     const to = startingOffsets[this.scrolled + 1];
    //     const from = startingOffsets[this.scrolled];
    //     const adjust = this.stuckHeights().slice(0,this.scrolled + 1).reduce((acc, curr) => acc + curr);
    //     console.log(adjust, to - from, window.scrollY + adjust - from + 56, (window.scrollY + adjust - from + 56) / (to - from));
        // if (window.scrollY >= this.lastScrollY) {
        //   if (this.scrolled >= this.textSlots.length) return;
        //   let nextHeight = this.$refs['textSlots'][this.scrolled].offsetTop;
        //   let denominator = nextHeight - this.lastScrollY + 70;
        //   if (this.collect)
        //     denominator -= this.stuckHeights().slice(0,this.scrolled).reduce((acc, curr) => acc + curr);
        //   this.toNext = (window.scrollY - this.lastScrollY) / denominator;
        //   console.log("last", this.lastScrollY, this.toNext);
        // } else {
        //   if (this.scrolled <= 0) return;
        //   let adjust = this.stuckHeights().slice(0,this.scrolled).reduce((acc, curr) => acc + curr);
        //   const from = startingOffsets[this.scrolled];
        //   const to = startingOffsets[this.scrolled + 1];
        //   this.toNext = (window.scrollY - from) / (to - from + adjust)
        //   console.log(this.toNext, startingOffsets[this.scrolled + 1], startingOffsets[this.scrolled], window.scrollY)
        // }
    //   }
    // }, 50)
  },
}

</script>
<style scoped>
  div.scrollytell {
    display:flex;
  }
  div.vertical-flex {
    flex-direction: column;
  }
  .scrollytell-fixed {
    flex: 0 auto;
    height: fit-content;
    position: sticky;
    align-items: center;
    /*top set in template*/
  }

  .scrollytell-collected {
    position: sticky;
    top: 50px;
    height: fit-content;
  }

  .scrollytell-collected div {
    padding: 5px;
  }

  .scrollytell-scroll {
    padding-left: 10px;
  }

  .scroll-item {
    /*margin-bottom: 100vh;*/
    /*box-shadow: 1px 1px 1px 1px gray;*/
  }

  .scroll-item.solid-border {
    border: 2px solid black;
    padding: 0px 14px;
  }
  .scroll-item-dummy {
    padding: 5px;
    margin-bottom: 50vh;
  }

</style>
