<template lang="html">
    <span class="drop-down-group">
        <slot name="title"></slot>
        <ul>
        <slot></slot>
        </ul>
    </span>
</template>

<script>
export default {
}
</script>

<style scoped>
    ul {
        display: none;
        /*position: absolute;*/
        background: white;
        list-style: none;
        box-shadow: 1px 1px 2px gray;
        padding-inline-start: 0px; /*undo the automatic left padding, so it's flush with title*/
        margin-top: 0.7em; /*make flush with title's bottom border*/
        margin-right: -50px; /*make sure this does not impact the flex flow of the nav titles*/
    }
    .drop-down-group:hover ul {
        display: block;
    }
</style>
