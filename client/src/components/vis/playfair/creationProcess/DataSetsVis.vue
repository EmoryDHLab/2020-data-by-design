<template>
  <div>
    <D3ImplCovid v-if="idx == 0"/>
    <D3ImplIncome v-if="idx == 1"/>
    <D3ImplWomen v-if="idx == 2"/>
    <button @mouseover="idx = 0"> COVID-19 Death </button>
    <button @mouseover="idx = 1"> Average Income </button>
    <button @mouseover="idx = 2"> Women Representative </button>
  </div>

</template>

<script>
    import D3ImplCovid
        from "./D3ImplCovid";
    import D3ImplWomen
        from "./D3ImplWomen";
    import D3ImplIncome
        from "./D3ImplIncome";

    export default {
        name: "DataSetsVis",
        components: {
            D3ImplCovid,
            D3ImplWomen,
            D3ImplIncome,
        },
        data: function () {
            return {
                idx: 0
            }
        },

    }
</script>

<style scoped>
  button {
    margin: 5px;
  }
</style>