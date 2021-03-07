<template>
  <div class="container">
    <div>
    <div id="occupation" style="background-color: #f9edcb; width: 60%; float: left"></div>
    </div>
    <div style="text-align: center; font-family: Consolas; font-size: 90%">Percentage of Occupation.</div>
  </div>
</template>

<script>
    import * as d3 from "d3";

    export default {
        name: "StackedBar",
        mounted() {
            this.generateSvg();
        },
        props: {
            slideNumber: {
                type: Number,
                default: 0,
            },
        },
        methods: {
            generateSvg() {
                let self = this;
                let zoom = 3.5;
                let margin = {top: 25, right: 25, bottom: 25, left: 25},
                    width = window.innerWidth/zoom - margin.left - margin.right,
                    height = window.innerWidth/zoom - margin.top - margin.bottom;


                let stackWidth = width + margin.left + margin.right + 20;


                self.svg = d3.select("#occupation").append("svg")
                    .attr("class", "occupation")
                    .attr("width", stackWidth)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                let init_x = 10;
                let init_y = 60;
                let bar_x = init_x + 100;
                let gap = 30;
                let bar_height = 10;
                let bar_width = 7;

                d3.csv("/duboisData/occupation.csv").then(function (occupationData) {
                    //calculate values to determine y domain
                    occupationData.forEach(function (d) {
                        // d.occuation = d.occupation;
                        d.prec1900 = Number(d.prec1900);
                        d.prec1910 = Number(d.prec1910);
                        // console.log(d)
                    });
                    for (let idx = 0; idx < occupationData.length; idx++) {
                      self.svg.append("text")
                          .attr("transform", "translate(" + (init_x) + "," + (init_y + idx*gap) + ") rotate(" + (0) + ")")
                          .attr("dy", ".35em")
                          .attr("text-anchor", "start")
                          .style("fill", "black")
                          .text(occupationData[idx].occupation);
                      if (idx == 0) {
                          self.svg.append("rect")
                              .attr("transform", "translate(" + (bar_x) + "," + (init_y + idx * gap - bar_height / 2 - gap/4) + ") rotate(" + (0) + ")")
                              .attr("height", bar_height)
                              .attr("width", bar_width * occupationData[idx].prec1900 * 3/4)
                              .attr("fill", "#dc143c");
                          self.svg.append("rect")
                              .attr("transform", "translate(" + (bar_x + bar_width * occupationData[idx].prec1900 * 2/4) +
                                    "," + (init_y + idx * gap - bar_height / 2 + gap/4) + ") rotate(" + (0) + ")")
                              .attr("height", bar_height)
                              .attr("width", bar_width * occupationData[idx].prec1900 * 1/4)
                              .attr("fill", "#dc143c");
                          self.svg.append("circle")
                              .attr("transform", "translate(" + (bar_x + bar_width * occupationData[idx].prec1900 * 3/4) +
                                  "," + (init_y + idx * gap) + ") rotate(" + (0) + ")")
                              .attr("fill-opacity", 1)
                              .attr("r", 12.5)
                              .attr("fill", "#dc143c");
                          self.svg.append("circle")
                              .attr("transform", "translate(" + (bar_x + bar_width * occupationData[idx].prec1900 * 3/4) +
                                  "," + (init_y + idx * gap) + ") rotate(" + (0) + ")")
                              .attr("fill-opacity", 1)
                              .attr("r", 2.5)
                              .attr("fill", "#f9edcb");
                          self.svg.append("rect")
                              .attr("transform", "translate(" + (bar_x + bar_width * occupationData[idx].prec1900 * 3/4 - 12.5) +
                                  "," + (init_y + idx * gap - 2.5) + ") rotate(" + (0) + ")")
                              .attr("height", 5)
                              .attr("width", 13)
                              .attr("fill", "#f9edcb");
                      } else {
                          self.svg.append("rect")
                              .attr("transform", "translate(" + (bar_x) + "," + (init_y + idx * gap - bar_height / 2) + ") rotate(" + (0) + ")")
                              .attr("height", bar_height)
                              .attr("width", bar_width * occupationData[idx].prec1900)
                              .attr("fill", "#dc143c");
                      }
                    }

                    self.svg.append("text")
                        .attr("transform", "translate(" + (50) + "," + (5) + ") rotate(" + (0) + ")")
                        .attr("dy", ".35em")
                        .attr("text-anchor", "start")
                        .style("fill", "black")
                        .style("font-family", "B52-ULCW00-ULC")
                        .text("Occupation of College Graduates in 1900");
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
