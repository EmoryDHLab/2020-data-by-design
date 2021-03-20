<template>
  <div class="container">
    <div>
    <div id="migration" style="background-color: #f9edcb; float: left"></div>
    </div>
    <div style="text-align: center; font-family: Consolas; font-size: 90%">Migration</div>
  </div>
</template>

<script>
    import * as d3 from "d3";

    export default {
        name: "migration",
        mounted() {
            this.generateSvg();
        },
        props: {
        },
        methods: {
            generateSvg() {
                let self = this;
                let zoom = 2.5;
                let margin = {top: 25, right: 10, bottom: 10, left: 10},
                    // width = window.innerWidth/zoom - margin.left - margin.right,
                    // height = window.innerWidth/zoom - margin.top - margin.bottom;
                    width = 814/zoom,
                    height = 1024/zoom;

                let stackWidth = width + margin.left + margin.right + 20;


                self.svg = d3.select("#migration").append("svg")
                    .attr("class", "migration")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g");

                let init_x = 10 + margin.left;
                let init_y = 30 + margin.top;
                let bar_x = init_x + 50;
                let gap = 37;
                let bar_height = 12.5;
                let bar_width = 1.3;
                let curve_r = 2;

                let scale = 600;

                let stateIdx = new Map();
                stateIdx.set('A', ["CT","ME","MA","NH","RI","VT"]);
                stateIdx.set('B',["NY","PA","NJ"]);
                stateIdx.set('C',["DE","MD","VA","WV","KY","TN","NC","MO","DC"]);
                stateIdx.set('D',["SC","GA","FL","MS","LA","AL"]);
                stateIdx.set('F',["ND","SD","MN","NE","IA","KS"]);
                stateIdx.set('E',["MI","WI","IL","OH"]);
                stateIdx.set('G',["OK","TX","AR","UT","CO","WY","ID","WY","MT"]); //"What's Ind.Ter"
                stateIdx.set('H',["Canada"]);
                stateIdx.set('J',["Africa"]);
                stateIdx.set('K',["West Indies"]);
                stateIdx.set('L',["CA","NV","WA","OR"]);
                stateIdx.set('M',["NM","AZ"]);


                let projection = d3.geoAlbersUsa()
                    .translate([width/2, height/3])    // translate to center of screen
                    .scale([350]);
                let geoPath = d3.geoPath().projection(projection);
                d3.csv("/duboisData/migration1910.csv").then(function (migrationData) {
                    //calculate values to determine y domain

                    d3.json("/duboisData/us-states.json").then(function (json) {

                        json.features[4].properties.visited = true;
                        self.svg.selectAll("path")
                            .data(json.features)
                            .enter()
                            .append("path")
                            .attr("d", geoPath)
                            .style("stroke", "#fff")
                            .style("stroke-width", "1")
                            .style("fill", function (d) {

                                // Get data value
                                var value = d.properties.visited;

                                if (value) {
                                    //If value exists…
                                    return "#ffac6c";
                                } else {
                                    //If value is undefined…
                                    return "rgb(213,222,217)";
                                }
                            });

                    });
                    self.svg.append("text")
                        .attr("transform", "translate(" + (width / 2) + "," + (margin.top) + ") rotate(" + (0) + ")")
                        .attr("dy", ".35em")
                        .attr("text-anchor", "middle")
                        .style("fill", "black")
                        .style("font-family", "B52-ULCW00-ULC")
                        .text("Black College Grads in Business");

                });

            },

        }
    }
</script>

<style scoped>
  /*/////////////////////////////////////////////////font faces used for axis labels and title ////////////////////*/
  @font-face {font-family: "B52-ULCW00-ULC";
    src: url("//db.onlinewebfonts.com/t/3e5270c9b750bc1dc12f033a0e55864d.eot");
    src: url("//db.onlinewebfonts.com/t/3e5270c9b750bc1dc12f033a0e55864d.eot?#iefix") format("embedded-opentype"),
      url("//db.onlinewebfonts.com/t/3e5270c9b750bc1dc12f033a0e55864d.woff2") format("woff2"),
      url("//db.onlinewebfonts.com/t/3e5270c9b750bc1dc12f033a0e55864d.woff") format("woff"),
      url("//db.onlinewebfonts.com/t/3e5270c9b750bc1dc12f033a0e55864d.ttf") format("truetype"),
      url("//db.onlinewebfonts.com/t/3e5270c9b750bc1dc12f033a0e55864d.svg#B52-ULCW00-ULC") format("svg"); }


  .axis path,
  .axis line {
    fill: none;
    stroke: #000;
    stroke-width: 2px;
  }


  .x.axis path {
    display: none;
  }

  .tick line{
    opacity: 0.2;
    stroke-width: 1px;
  }

</style>
