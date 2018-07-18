<template lang="html">
  <button type="submit" v-bind="$attrs" v-on="$listeners"><slot>Submit</slot></button>
</template>

<script>
export default {
  name: "SubmitButton",
  inheritAttrs: false
}
</script>

<style lang="css">
button {
  background-color: #49A038;
  border-color: #49A038;
  color: white;
  border-style: solid;
  border-radius: 4px;
  padding: 4px 16px;
  box-sizing: border-box;
  cursor: pointer;
  box-shadow: 0px 0px 10px -1px rgba(0,0,0,.4);
  font-family: 'Raleway', serif;
  font-weight: bold;
  transition: box-shadow .2s, transform .2s;
  /* transition: box-shadow .2s; */
}

button:active {
  box-shadow: 0px 0px 10px 2px rgba(0,0,0,.4);
  transform: scale(1.03);
}

button:disabled {
  background-color: #A09590;
  border-color: #A09590;
  text-decoration: line-through;
  cursor: not-allowed;
}
</style>
