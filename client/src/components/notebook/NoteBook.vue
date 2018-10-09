<template lang="html">
  <div class="">
    <component
      :is="node.type"
      v-for='node in nodes'
      :key='node.id'
      v-bind="node"
      @focus="$store.commit('FOCUS_NODE', node.id)"
      @update="updateNode"
      @delete="deleteNode"
      @create="createNode"/>
  </div>
</template>

<script>
import TextNode from '@/components/notebook/TextNode'
import { FOCUS_NODE } from '@/store/notebook/types'
import { mapGetters } from 'vuex'

export default {
  components: {
    TextNode
  },
  computed: {
    ...mapGetters(['nodes', 'nodeByPosition', 'position'])
  },
  methods: {
    updateNode (nodeUpdates) {
      // nodeUpdates should have the pieces to update and the id at the very least
      this.$store.dispatch('updateNode', nodeUpdates)
    },
    deleteNode (payload) {
      const pos = this.position(payload.id)
      const prevID =  this.nodeByPosition((pos !== 0) ? pos - 1: pos+1).id
      console.log(prevID);
      this.$store.dispatch('removeNode', payload)
        .then(_=>{
          this.$store.commit(FOCUS_NODE, prevID)
        })
    },
    createNode (payload) {
      const prevNodeId = payload.id
      const obj = { node: payload, pos: this.position(prevNodeId) + 1 }
      this.$store.dispatch('addNode', obj)
    },
  }
}
</script>

<style lang="css">
</style>
