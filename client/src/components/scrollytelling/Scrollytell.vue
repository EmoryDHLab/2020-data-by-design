<template>
  <div class="scrollytell">
    <div class="scrollytell-fixed">
      <slot name="fixed" :scrolled="scrolled"></slot>
    </div>
    <div ref="scrollContainer" class="scrollytell-scroll">
      <div v-for="slot in textSlots" ref="textSlots" class="scroll-item" :style="scrollItemStyles(slot)">
        <basic-waypoint
          @triggered:down="scrollDown(slot)"
          @triggered:up="scrollUp(slot)"
          :offset="offset(slot)"
          >
          <slot :name="slot" :scrolled="scrolled"></slot>
        </basic-waypoint>
      </div>
      <div v-if="collect" class="scroll-item-dummy" :style="scrollItemStyles(textSlots.length)"></div>
    </div>
  </div>
</template>
<script>


import BasicWaypoint from "../waypoints/BasicWaypoint";
export default {
  components: {BasicWaypoint},
  props: {
    collect: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      scrolled: 0,
      lastScrollY: 0,
      toNext: 0,
    }
  },
  computed: {
    textSlots () {
      return Object.keys(this.$slots).filter(key => Number.isInteger(+key));
    },
    scrollProgress () {

    }
  },
  methods: {
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
      if (!this.collect || !this.stuckHeights()) {
        return 50;
      }
      const ans = this.stuckHeights().slice(0,Number(index)).reduce((acc, curr) => acc + curr) + 60;
      return ans;
    },
    scrollItemStyles (index) {
      if (this.collect && this.scrolled >= Number(index - 1)) {
        let height = 0;
        for (let i = 0; i < index - 1; i++) {
          height += this.stuckHeights()[i];
        }
        return {
          position: "sticky",
          top: height + 50 + "px",
        }
      }
    }
  },
  mounted () {
    const child = this.$refs['scrollContainer'];
    let top = child.offsetTop;
    let curr = child.offsetParent;
    while (curr) {
      top += curr.offsetTop;
      curr = curr.offsetParent;
    }
    let scrolling = false;
    window.addEventListener("scroll", (event) => {
      scrolling = true;
    })
    const startingOffsets = this.$refs['textSlots'].map(el => el.offsetTop);
    setInterval(() => {
      if (scrolling && window.scrollY > top) {
        scrolling = false;
        console.log(this.scrolled);
        const to = startingOffsets[this.scrolled + 1];
        const from = startingOffsets[this.scrolled];
        // const adjust = this.stuckHeights().slice(0,this.scrolled + 1).reduce((acc, curr) => acc + curr);
        const adjust = this.offset(this.scrolled + 1);
        console.log(from, to, window.scrollY + adjust);
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
      }
    }, 50)
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
    height: 100px;
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
