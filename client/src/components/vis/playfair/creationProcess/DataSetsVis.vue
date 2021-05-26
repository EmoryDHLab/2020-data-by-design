<template>
  <div>
    <D3ImplCovid :width="'100vh'" v-if="shows(0)"/>
    <D3ImplIncome :width="'100vh'" v-if="shows(1)"/>
    <D3ImplWomen  :width="'100vh'" v-if="shows(2)"/>
    <div style="text-align: center">
      <a class="blue-hover" @mouseover="selected(0)"> Covid-19 Deaths </a>
      <a class="blue-hover" @mouseover="selected(1)"> Average Income </a>
      <a class="blue-hover" @mouseovter="selected(2)"> Women Representatives </a>
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
        props: {
            visidx: {
                default: 0
            }
        },
        data: function () {
            return {
                idx: 0
            }
        },
        methods: {
            shows(i) {
                if (this.visidx == i) {
                    return true;
                } else return false;
            },
            selected(i) {
              this.$emit("selected", i);
            }
        }

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
