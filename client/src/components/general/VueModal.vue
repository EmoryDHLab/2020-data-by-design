<template lang="html">
  <div class="modal is-active">
    <div class="modal-background" @click="close()"></div>
    <base-card class="modal-content">
      <div class="box">
        <slot></slot>
      </div>
    </base-card>
    <button class='modal-close' @click="close()">X</button>
  </div>
</template>

<script>
import BaseCard from './BaseCard'
export default {
  name: "VueModal",
  components: {
    BaseCard
  },
  methods: {
    close () {
      this.$emit('close')
    },
    handleModalClick (e) {
      this.$emit('click' , e)
    }
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.modal-background {
  position: absolute;
  background-color: rgba(0,0,0,.4);
  height: 100%;
  width: 100%;
  z-index: 0;
}

.modal-content {
  min-width: 200px;
  min-height: 200px;
  z-index: 1;
  padding: 16px;

}

.modal-close {
  position: absolute;
  top: 0;
  left: 100%;
  transform: translateX(-100%);
  background: none;
  color: white;
  border: 0;
  z-index: 1;
  font-size: 2em;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background-color: transparent;
  transition: background-color .4s;
}

.modal-background:hover ~ .modal-close, .modal-close:hover {
  text-decoration: underline;
  background-color: grey;
}

</style>
