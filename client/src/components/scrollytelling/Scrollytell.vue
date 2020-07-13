<template>
  <div class="scrollytell">
    <div class="scrollytell-fixed">
      <slot name="fixed" :scrolled="scrolled" :progress="progressToNext"></slot>
    </div>
    <div ref="scrollContainer" class="scrollytell-scroll">
      <div v-for="slot in scrollSlots" ref="textSlots" class="scroll-item" :style="scrollItemStyles(slot)">
        <!--We use conditional rendering to only generate the waypoints once the slots have been rendered
        and we're able to check their heights to generate the offsets.-->
        <basic-waypoint v-if="mounted"
          @triggered:down="scrollDown(slot)"
          @triggered:up="scrollUp(slot)"
          @scrolled="scrolling"
          :offset="offset(slot)">
          <slot :name="slot" :scrolled="scrolled" :progress="progressTo(slot)"></slot>
        </basic-waypoint>
        <slot :name="slot" :scrolled="scrolled" :progress="progressTo(slot)" v-else></slot>
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
      this.progressToNext = (window.scrollY - last) / (next - last);
    },
    stuckHeights() {
      if (this.$refs['textSlots'])
        return this.$refs['textSlots'].map(element => element.offsetHeight);
    },
    scrollDown (index) {
      this.scrolled = Number(index);
      this.lastScrollY = window.scrollY;
    },
    scrollUp (index) {
      this.scrolled = Number(index - 1);
      this.lastScrollY = window.scrollY;
    },
    offset (index) {
      if (!this.collect) {
        return 50;
      }
      if (!this.mounted || !this.$refs["textSlots"]) return null;
      const ans = this.stuckHeights().slice(0,Number(index - 1)).reduce((acc, curr) => acc + curr, 50);
      return ans;
    },
    scrollItemStyles (index) {
      if (this.collect && this.scrolled >= Number(index - 1)) {
        let height = 0;
        for (let i = 0; i < index - 1; i++) {
          height += this.stuckHeights()[i];
        }
        const textSlots = this.$refs['textSlots'];
        const done = textSlots && this.scrolled == textSlots.length;
        // const position = (textSlots && this.scrolled == textSlots.length) ? "static" : "sticky";
        return {
          position: "sticky",
          top: height + 50 + "px",
        }
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
    flex: 1;
    top: 50px;
    height: fit-content;
    position: sticky;
    align-items: center;
  }

  .scrollytell-scroll {
    padding-left: 10px;
  }

  .scroll-item {
    padding: 5px;
    margin-bottom: 100vh;
    /*box-shadow: 1px 1px 1px 1px gray;*/
  }

  .scroll-item-dummy {
    padding: 5px;
    margin-bottom: 50vh;
  }

</style>
