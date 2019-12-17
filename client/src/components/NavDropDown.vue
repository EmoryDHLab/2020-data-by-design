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
        margin-left: -38px;
        position: absolute;
        background: white;
        list-style: none;
    }
    .drop-down-group:hover ul {
        display: block;
    }
</style>
