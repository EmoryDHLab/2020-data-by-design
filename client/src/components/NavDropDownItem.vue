<template lang="html">
    <li>
       <span class="triangle">&#x25B6;</span>
       <slot></slot>
    </li>
</template>

<script>
export default {
}
</script>

<style scoped>

li {
    display: block;
    margin: 0px 5px;
    padding: 8px 0px;
}

li:not(:last-child) {
    border-bottom: 1px solid lightgray;
}
.triangle {
    color: rgb(74, 144, 226);
    font-size: 0.6em;
    margin-right: 0.6em;
}
</style>
