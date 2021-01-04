<template>
  <div>
    <D3ImplCovid v-if="idx == 0"/>
    <D3ImplIncome v-if="idx == 1"/>
    <D3ImplWomen v-if="idx == 2"/>
    <div style="text-align: center; margin-top: 10px">
    <a class="blue-hover" @mouseover="idx = 0"> Covid-19 Deaths </a> &bull;
    <a class="blue-hover" @mouseover="idx = 1"> Average Income </a> &bull;
    <a class="blue-hover" @mouseover="idx = 2"> Women Representatives </a>
    </div>
    <div style="text-align: center; font-family: Consolas; font-size: 90%; margin-top: 10px">Three contemporary datasets visualized in the style of William Playfair.</div>
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
  a {
    margin: 10px;
  }
  a:hover {
    color: orange;
  }
</style>
