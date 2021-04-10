<template>
  <div>
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr;">
      <Business class="element" :style="getStyle(visidx, 0)"/>
      <Migration class="element" :style="getStyle(visidx, 1)"/>
      <GradsBySex class="element" :style="getStyle(visidx, 2)"/>
      <Occupation class="element" :style="getStyle(visidx, 3)"/>
    </div>
    <div style="text-align: center">
      <button @click="decrement()">left</button>
      <button @click="increment()">right</button>
    </div>
  </div>
</template>

<script>
    import Business from './Business'
    import GradsBySex from './GradsBySex'
    import Migration from './Migration'
    import Occupation from './Occupation'
    export default {
        name: "DuboisRecreationSet",
        components: {Occupation, GradsBySex, Migration, Business},
        props: {
            visidx: {
                default: 2
            }
        },
        methods: {
            increment() {
                this.visidx = Math.min(3, this.visidx + 1)
            },
            decrement() {
                this.visidx = Math.max(0, this.visidx - 1)
            },
            getStyle(i, pos) {
                let skewY, translateX, left;
                if (i > pos) {
                    skewY = -45;
                    translateX = -25;
                    left = -100 - pos*200
                } else if (i < pos) {
                    skewY = 45;
                    translateX = 25;
                    left = 100 - pos*200
                } else {
                    skewY = 0;
                    left = -100 - pos*200 + 100
                }
                let side = "transform: skewY(" + skewY + "deg) translateX(" + translateX + "px) scaleX(0.5) scale(0.8); opacity: 0.7;";
                let position = "position: relative; left:" + left + "px";
                if (skewY == 0) return position;
                else return side + position;
            },
        }
    }
</script>

<style scoped>
    button {
      margin: 10px;
      width: 50px;
    }
    .element {
      transition: 1s;
    }
</style>