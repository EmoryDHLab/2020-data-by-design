<template lang="html">
    <div>
      <ul>
        <li> Remove</li>
        <li> Color</li>
      </ul>
      <!-- <div class="pointer"></div> -->
    </div>
</template>

<script>
export default {
}
</script>

<style scoped>
    div{
        user-select: none;
        box-shadow: 0 12px 22px -3px rgba(0, 0, 0, 0.39);
        position: absolute;
        left: 50%;
        background-color: #424242;
        border-radius: 8px;
        transition: opacity 0.2s ease, transform 0.2s ease;
        transform: translateX(-50%);
    }
    div ul {
      list-style: none;
      color: white;
    }
    div .pointer {
      top: -16px;
      border-color: transparent transparent #424242;
      border-width: 0 16px 16px;
      position: absolute;
      left: 50%;
      display: block;
      width: 0;
      height: 0;
      margin-left: -16px;
      border-style: solid;
      transition: border-color 0.2s ease;
    }
</style>
