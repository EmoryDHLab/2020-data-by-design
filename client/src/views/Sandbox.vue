<template lang="html">
  <div class="">
    <component
      :is="node.type"
      v-for='(node, i) in nodes'
      :key='i'
      v-bind="node.props"/>
  </div>
</template>

<script>
import TextNode from '@/components/notebook/TextNode'

export default {
  components: {
    TextNode
  },
  computed: () => ({
    nodes () {

    }
  }),
  // methods: {}
}
</script>

<style scoped>
.wp {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: green; */
  margin: 0;
}
>>>.wp p {
  margin: 0;
}
.wp-image-wrapper {
  position: sticky;
  top: 0;
  height: 100vh;
  align-items: center;
  display: flex;
}
.wp-image {
  display: block;
  flex: 0 1 90%;
}
.waypoint-section {
  box-sizing: border-box;
  border-bottom: 2px solid grey;
}
</style>
