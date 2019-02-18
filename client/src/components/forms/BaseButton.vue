<template lang="html">
  <button
    v-bind="$attrs"
    v-on="$listeners"
    :type="type"><slot></slot></button>
</template>

<script>
export default {
  name: "BaseButton",
  inheritAttrs:false,
  props: {
    type: {
      type: String,
      default: "button"
    }
  }
}
</script>

<style scoped>
button {
  border-style: solid;
  border-radius: 4px;
  padding: 4px 16px;
  box-sizing: border-box;
  cursor: pointer;
  background-color: white;
  box-shadow: 0px 0px 10px -1px rgba(0,0,0,.3);
  font-family: 'Raleway', serif;
  font-weight: bold;
  transition: box-shadow .2s, transform .2s;
}

button:active {
  box-shadow: 0px 0px 10px 2px rgba(0,0,0,.3);
  transform: scale(1.03);
}

button:disabled {
  background-color: #A09590;
  border-color: #A09590;
  text-decoration: line-through;
  cursor: not-allowed;
}
</style>
