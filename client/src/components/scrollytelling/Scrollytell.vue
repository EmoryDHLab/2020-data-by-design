<template>
  <div class="scrollytell">
    <div class="scrollytell-fixed" :style="{ top: top + 'px' }">
      <slot name="fixed" :scrolled="scrolled" :progress="progressToNext"></slot>
    </div>
    <div ref="scrollContainer" class="scrollytell-scroll">
      <div v-if="collect" ref="collected" class="scrollytell-collected">
        <div v-for="slot in scrolled">
          <slot :name="slot" :scrolled="scrolled" :progress="progressTo(slot)"></slot>
        </div>
      </div>
      <div v-for="(slot, index) in scrollSlots" ref="textSlots" class="scroll-item"
           :style="scrollItemStyles(slot)">
        <!--We use conditional rendering to only generate the waypoints once the slots have been rendered
        and we're able to check their heights to generate the offsets.-->
        <!--:style="{ opacity: Number(scrolled <= index)}"-->
        <basic-waypoint v-if="mounted" v-show="!collect || scrolled <= index"
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
export default {
  components: {BasicWaypoint},
  props: {
    scrollSlots: {
      type: Number,
      required: true
    },
    collect: {
      type: Boolean,
      default: false,
    },
    top: {
      type: Number,
      default: 50,
    },
    bottomBreak: {
      type: Boolean,
      default: false
    },
    margin: { //bottom margin between items
      type: String,
      default: '100vh'
    }
  },
  data () {
    return {
      scrolled: 0,
      progressToNext: 0,
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
    },
    scrollUp (index) {
      this.scrolled = Number(index - 1);
    },
    offset (index) {
      if (!this.collect) {
        return this.top;
      }
      if (!this.mounted || !this.$refs["textSlots"]) return null;
      const ans = this.stuckHeights().slice(0,Number(index - 1)).reduce((acc, curr) => acc + curr, 0);
      return ans;
    },
    scrollItemStyles (index) {
      if (!this.bottomBreak && index >= this.scrollSlots)
        return {}
      if (this.collect && this.mounted && this.scrolled >= Number(index - 1)) {
        const height = this.$refs["collected"].offsetHeight;
        return {
          position: "sticky",
          'margin-bottom': this.margin,
          top: height + this.top + "px"
        }
      }
      return {
        'margin-bottom': this.margin,
      }
    }
  },
  computed: {
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
    padding: 5px;
    /*margin-bottom: 100vh;*/
    /*box-shadow: 1px 1px 1px 1px gray;*/
  }

  .scroll-item-dummy {
    padding: 5px;
    margin-bottom: 50vh;
  }

</style>