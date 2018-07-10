<template lang="html">
  <div class="data-wrap">
    <div class='loading message' v-if='isLoading'>Loading</div>
    <div class='error message' v-if='error.isActive'>{{ error.message }}</div>
    <slot :dataset='dataset'></slot>
  </div>
</template>

<script>
import DataWrap from '@/store/modules/DataWrap'
export default {
  props: {
    datasetId: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    id: -1
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
  watch: {
    datasetId (oldVal, newVal) {
      if (oldVal !== newVal)
      this.loadData()
    }
  },
  methods: {
    loadData () {
      if (!isNaN(parseInt(this.datasetId)))
        this.dataWrap.dispatch('loadData', { dataId: this.datasetId })
    }
  },
  created: function () {
    this.id = this.$store.getters.nextId
    this.$store.commit('addDataWrap', this.id) // create the data
    this.loadData()
  }
}
</script>

<style lang="css">
.data-wrap {
  position: relative;
}

.message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
  /* border: 1px solid grey; */
  border-radius: 2px;
  background-color: white;
  padding: .5em 1em;
  box-shadow: 0px 0px 10px -1px black;
  -webkit-transition: width 1s;
}

.error.message {
  background-color: #C12222;
  color: white;
}
.loading {

}
</style>
