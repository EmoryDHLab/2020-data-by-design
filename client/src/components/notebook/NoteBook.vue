<template lang="html">
  <div class="">
    <h1>Notebook</h1>
    <DragList v-model="nodes" :useDragHandle="true">
      <DragListItem v-for='(node, i) in nodes'
        :index="i"
        :key='node.id'>
        <component
          :is="node.type"
          v-bind="node"
          @focus="$store.commit('FOCUS_NODE', node.id)"
          @update="updateNode"
          @delete="deleteNode"
          @create="createNode"/>
      </DragListItem>
    </DragList>
  </div>
</template>

<script>
import DragList from '@/components/general/DragList'
import DragListItem from '@/components/general/DragListItem'
import TextNode from '@/components/notebook/TextNode'
import { FOCUS_NODE } from '@/store/notebook/types'
import { mapGetters } from 'vuex'

export default {
  components: {
    TextNode,
    DragList,
    DragListItem
  },
  computed: {
    ...mapGetters(['nodeByPosition', 'position']),
    nodes: {
      get () {
        return this.$store.getters.nodes
      },
      set(nodeList) {
        this.$store.dispatch('repositionNodes', nodeList.map(node => node.id))
      }
    }
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
