<template lang="html">
  <div class="data-wrap" @dataset-change='changeDataset()'>
    <!-- <div v-if='isLoading'>Loading</div>
    <div v-if='error.isActive'>{{ error.message }}</div> -->
    <slot :dataset='dataset'></slot>
  </div>
</template>

<script>
import DataWrap from '@/store/modules/DataWrap'
export default {
  data: () => ({
    id: -1,
    datasetId: 0
  }),
  computed: {
    dataWrap () {
      return this.$store.getters.dataWrap(this.id)
    },
    dataset () {
      if (!this.dataWrap) return {}
      return this.dataWrap.get('dataset') || {}
    },
    isLoading () {
      if (!this.dataWrap) return {}

      return this.dataWrap.get('isLoading') || false
    },
    error () {
      if (!this.dataWrap) return {}
      return this.dataWrap.get('error') || {}
    }
  },
  methods: {
    loadData () {
      if (this.datasetId !== '' && parseInt(this.datasetId) >= 0)
        this.dataWrap.dispatch('loadData', { dataId: this.datasetId })
    },
    changeDataset () {
      console.log('Poo');
    }
  },
  created: function () {
    this.id = this.$store.getters.nextId
    this.$store.commit('addDataWrap', this.id)
    this.loadData()
  }
}
</script>

<style lang="css">
</style>
