<template>
  <div class="container">
    <div>
    <div id="gradsBySex" style="background-color: #f9edcb; float: left"></div>
    </div>
    <div style="text-align: center; font-family: Consolas; font-size: 90%">Percentage of Occupation.</div>
  </div>
</template>

<script>
    import * as d3 from "d3";

    export default {
        name: "GradsBySex",
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
                let zoom = 2.5;
                let margin = {top: 25, right: 10, bottom: 10, left: 10},
                    // width = window.innerWidth/zoom - margin.left - margin.right,
                    // height = window.innerWidth/zoom - margin.top - margin.bottom;
                    width = 814/zoom,
                    height = 1024/zoom;

                let stackWidth = width + margin.left + margin.right + 20;


                self.svg = d3.select("#gradsBySex").append("svg")
                    .attr("class", "gradsBySex")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g");

                let init_x = 10 + margin.left;
                let init_y = 50 + margin.top;
                let bar_x = init_x + 80;
                let gap = 45;
                let bar_height = 12.5;
                let bar_width = 1.3;
                let curve_r = 2;

                d3.csv("/duboisData/gradsBySex.csv").then(function (gradsBySexData) {
                    //calculate values to determine y domain
                    gradsBySexData.forEach(function (d) {
                        d.women1900 = Number(d.women1900);
                        d.men1900 = Number(d.men1900);
                        d.women1910 = Number(d.women1910);
                        d.men1910 = Number(d.men1910);
                    });
                    for (let idx = 0; idx < gradsBySexData.length; idx++) {
                      self.svg.append("text")
                          .attr("transform", "translate(" + (bar_x - 20) + "," + (init_y + idx*gap) + ") rotate(" + (0) + ")")
                          .attr("dy", ".25em")
                          .attr("text-anchor", "end")
                          .attr("font-size", "0.8em")
                          .style("fill", "black")
                          // .style("font-family", "Vasarely")
                          .text(gradsBySexData[idx].college);
                      self.svg.append("rect")
                          .attr("transform", "translate(" + (bar_x) + "," + (init_y + idx * gap - bar_height) + ") rotate(" + (0) + ")")
                          .attr("height", bar_height)
                          .attr("width", bar_width * gradsBySexData[idx].men1900)
                          .attr("fill", "#000000");
                      if (gradsBySexData[idx].men1900 > 10) {
                          self.svg.append("text")
                              .attr("transform", "translate(" + (bar_x + bar_width * gradsBySexData[idx].men1900/2) + "," + (init_y + idx*gap -1) + ") rotate(" + (0) + ")")
                              .attr("text-anchor", "middle")
                              .attr("font-size", "0.65em")
                              .style("fill", "white")
                              .text(gradsBySexData[idx].men1900);
                      } else {
                          self.svg.append("text")
                              .attr("transform", "translate(" + (bar_x + bar_width * gradsBySexData[idx].men1900 + 1) + "," + (init_y + idx*gap -1) + ") rotate(" + (0) + ")")
                              .attr("text-anchor", "start")
                              .attr("font-size", "0.65em")
                              .style("fill", "black")
                              .text(gradsBySexData[idx].men1900);
                      }
                      self.svg.append("rect")
                          .attr("transform", "translate(" + (bar_x) + "," + (init_y + idx * gap ) + ") rotate(" + (0) + ")")
                          .attr("height", bar_height)
                          .attr("width", bar_width * gradsBySexData[idx].women1900)
                            .attr("fill", "#ffd700");
                      if (gradsBySexData[idx].women1900 > 10) {
                          self.svg.append("text")
                              .attr("transform", "translate(" + (bar_x + bar_width * gradsBySexData[idx].women1900/2) + "," + (init_y + idx*gap + bar_height - 2) + ") rotate(" + (0) + ")")
                              .attr("text-anchor", "middle")
                              .attr("font-size", "0.65em")
                              .style("fill", "black")
                              .text(gradsBySexData[idx].women1900);
                      } else {
                          self.svg.append("text")
                              .attr("transform", "translate(" + (bar_x + bar_width * gradsBySexData[idx].women1900 + 1) + "," + (init_y + idx*gap + bar_height - 2) + ") rotate(" + (0) + ")")
                              .attr("text-anchor", "start")
                              .attr("font-size", "0.65em")
                              .style("fill", "black")
                              .text(gradsBySexData[idx].women1900);
                      }

                    }

                    self.svg.append("rect")
                        .attr("transform", "translate(" + (width/2 + 20) + "," + (margin.top + 15) + ") rotate(" + (0) + ")")
                        .attr("height", 7)
                        .attr("width", 20)
                        .attr("fill", "#ffd700");
                    self.svg.append("text")
                        .attr("transform", "translate(" + (width/2 + 20 + 25) + "," + (margin.top + 15 + 7) + ") rotate(" + (0) + ")")
                        .attr("text-anchor", "start")
                        .attr("font-size", "0.65em")
                        .style("fill", "black")
                        .text("Women");
                    self.svg.append("rect")
                        .attr("transform", "translate(" + (width/2 - 60) + "," + (margin.top + 15) + ") rotate(" + (0) + ")")
                        .attr("height", 7)
                        .attr("width", 20)
                        .attr("fill", "black");
                    self.svg.append("text")
                        .attr("transform", "translate(" + (width/2 - 60 + 25) + "," + (margin.top + 15 + 7) + ") rotate(" + (0) + ")")
                        .attr("text-anchor", "start")
                        .attr("font-size", "0.65em")
                        .style("fill", "black")
                        .text("Men");

                    self.svg.append("text")
                        .attr("transform", "translate(" + (width/2) + "," + (margin.top) + ") rotate(" + (0) + ")")
                        .attr("dy", ".35em")
                        .attr("text-anchor", "middle")
                        .style("fill", "black")
                        .style("font-family", "B52-ULCW00-ULC")
                        .text("Total Black Graduates By Colleges and Sex");
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
