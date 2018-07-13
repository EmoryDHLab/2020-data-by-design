<template>
  <section>
    <button @click="bus1.fire('clicked', 'fizz')">Fizz</button>
    <button @click="bus2.fire('clicked', 'buzz')">Buzz</button>

    <peabody-grid
      id='peabody-vis-1'
      class='left-float aligned'
      width='45vh'
      height='45vh'
      :datasetId='"0"'
      :subscribers= "[{ bus: bus3, events: bus3Events}]"
      />

    <p>{{ message }}</p>
  </section>
</template>

<script>
import EventBus from '@/helpers/EventBus'
import PeabodyGrid from './vis/peabody/PeabodyGrid'
export default {
  name: 'HelloWorld',
  components: {
    PeabodyGrid
  },
  data: () => ({
    bus1: new EventBus("bus1"),
    bus2: new EventBus("bus2"),
    bus3: new EventBus("bus3"),
    message: "Hello",
  }),
  methods: {
    setMessage (message = "") {
      this.message = message
    }
  },
  created () {
    this.bus1.on('clicked', this.setMessage)
    this.bus2.on('clicked', (p) => (console.log("f2:", p)))
    this.bus1.subscribe(this.bus2, "bus2")
    this.bus1.on('bus2/clicked', this.setMessage)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
