import Vue from 'vue'

const EventBus = function() {
  const _vm = new Vue();
  return {
    fire (eventName, payload) {
      _vm.$emit(eventName, payload)
    },
    on (eventName, handler) {
      _vm.$on(eventName, (payload) => {
        return handler(payload)
      })
    }
  }
}

export default EventBus
