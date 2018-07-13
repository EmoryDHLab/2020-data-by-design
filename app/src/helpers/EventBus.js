import Vue from 'vue'

const EventBus = function() {
  const _vm = new Vue();

  const _listeners = {}

  return {
    fire (eventName, payload) {
      _vm.$emit(eventName, payload)
    },
    on (eventName, handler) {
      _listeners[eventName]
      _vm.$on(eventName, handler)
    },
    subscribe (busName, bus) { // subscribes this bus to the bus passed in

    },
    unsubscribe (busName, events=[]) { // unsubscribes this bus from the bus passed in

    },
  }
}

export default EventBus
