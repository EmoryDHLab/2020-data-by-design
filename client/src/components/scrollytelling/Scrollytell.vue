<template>
  <div class="scrollytell">
    <div class="scrollytell-fixed">
      <slot name="fixed" :scrolled="scrolled"></slot>
    </div>
    <div class="scrollytell-scroll">
      <div v-for="slot in textSlots" ref="textSlots" class="scroll-item" :style="scrollItemStyles(slot)">
        <basic-waypoint
          @triggered:down="scrollDown(slot)"
          @triggered:up="scrollUp(slot)"
          :offset="offset(slot)"
          >
          <slot :name="slot"></slot>
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
    }
  },
  computed: {
    textSlots () {
      return Object.keys(this.$slots).filter(key => Number.isInteger(+key));
    },
  },
  methods: {
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
      if (!this.collect || !this.stuckHeights()) {
        return 50;
      }
      const ans = this.stuckHeights().slice(0,Number(index)).reduce((acc, curr) => acc + curr) + 50;
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
  }
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
