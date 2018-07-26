import Vue from 'vue'

const EventBus = function(name = "bus") {
  const _vm = new Vue();
  let _name = name
  const _listeners = {}
  const _subscribers = []

  _vm.$options.name = _name

  const _addListener = (eventName, handler) => {
    if (!_listeners[eventName]) {
      _listeners[eventName] = []
    }
    _listeners[eventName].push(handler)
  }
  const _addListeners = (eventName, handlers) => {
    handlers.forEach(handler => _addListener(eventName, handler))
  }
  const _self = {
    getName () {
      return _name
    },
    setName (name) {
      _name = name
      _vm.$options.name = name
    },
    fire (eventName, payload) {
      _subscribers
        .filter(({ events }) => Object.keys(events).length == 0 || events[eventName] !== undefined)
        .forEach(({bus, namespace}) => {
          const namespacer = (namespace) ? `${namespace}/` : ''
          const namespacedEvent = `${namespacer}${eventName}`
          bus.fire(namespacedEvent, payload)
        })
      _vm.$emit(eventName, payload)
    },
    on (eventName, handler) {
      _addListener(eventName, handler)
      console.log(_listeners);
      _vm.$on(eventName, handler)
    },
    getHandlers(eventName) {
      return _listeners[eventName]
    },
    subscribe (bus, namespace, events = {}) { // subscribes this bus to the bus passed in
      bus.addSubcriber(_self, namespace, events)
      Object.entries(events).forEach(([name, handler]) => {
        const namespacer = (namespace) ? `${namespace}/` : ''
        const namespacedEvent = `${namespacer}${name}`
        _self.on(namespacedEvent, handler)
      })
    },
    addSubcriber(bus, namespace, events) {
      _subscribers.push({ bus, namespace, events })
      console.log(_subscribers);
    },
    unsubscribe (busName, events=[]) { // unsubscribes this bus from the bus passed in
    },
  }
  return _self
}

export default EventBus
