<template>
  <div class="container" style="display: grid; width: 325px">
    <div>
      <div id="names" style="background-color: #f9edcb; float: left"></div>
    </div>
    <div style="text-align: center; font-family: Consolas; font-size: 90%">Student Names</div>
  </div>
</template>

<script>
    import * as d3 from "d3";

    export default {
        name: "Names",
        mounted() {
            this.generateSvg();
        },
        methods: {
            generateSvg() {
                let self = this;
                let zoom = 2;
                let margin = {top: 30, right: 10, bottom: 10, left: 10},
                    // width = window.innerWidth/zoom - margin.left - margin.right,
                    // height = window.innerWidth/zoom - margin.top - margin.bottom;
                    width = 814/zoom,
                    height = 1300/zoom;

                let top_gap = 50;
                let gap = 50;

                self.svg = d3.select("#names").append("svg")
                    .attr("class", "names")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g");

                let path_right = "M 0 0 L 44 0 L 68 24 " +
                    "A 1 1 0 0 0 147 -30 A 1 1 0 0 0 75 15 " +
                    "A 1 1 0 0 0 139 -23 A 1 1 0 0 0 86 6 " +
                    "A 1 1 0 0 0 130 -15 A 1 1 0 0 0 95 -3 " +
                    "A 1 1 0 0 0 123 -8 A 1 1 0 0 0 104 -6";

                d3.csv("/duboisData/names.csv").then(function (namesData) {

                    self.svg.append("rect")
                        .attr("transform", "translate(" + (width/2) + "," + (top_gap) + ") rotate(" + (0) + ")")
                        .attr("height", height - margin.bottom - top_gap)
                        .attr("width", 10)
                        .attr("fill", "#63d8dc");

                    let i = top_gap + 30;
                    let left = true;
                    namesData.forEach(function (d) {
                        self.svg.append("text")
                            .attr("transform", "translate(" + (width/2) + "," + (i) + ") ")
                            .attr("dy", ".25em")
                            .attr("text-anchor", "middle")
                            .attr("font-size", "0.8em")
                            .style("fill", "black")
                            .text(d.Year);
                        if (left) {
                            self.svg.append("path")
                                .attr("id", "wavy" + i/top_gap)
                                .attr("transform", "translate(" + (width/2+ 10) + "," + (i-20) + ") ")
                                .attr("d", path_right)
                                .style("fill", "none")
                                .style("stroke", "#AAAAAA");
                            self.svg.append("text")
                                .append("textPath")
                                .attr("xlink:href", "#wavy" + i/top_gap)
                                .attr("dy", ".25em")
                                .attr("text-anchor", "start")
                                .attr("font-size", "0.6em")
                                .style("fill", "black")
                                .text(d.Name);
                        } else {
                            self.svg.append("path")
                                .attr("id", "wavy" + i/top_gap)
                                .attr("transform", "translate(" + (width/2) + "," + (i-20) + ") scale(-1,-1)")
                                .attr("d", path_right)
                                .style("fill", "none")
                                .style("stroke", "#AAAAAA");
                            self.svg.append("text")
                                .append("textPath")
                                .attr("xlink:href", "#wavy" + i/top_gap)
                                .attr("dy", ".25em")
                                .attr("text-anchor", "start")
                                .attr("font-size", "0.6em")
                                .style("fill", "black")
                                .text(d.Name);
                        }
                        left = !left;
                        i += gap;
                    });

                    let title = self.svg.append("text")
                        .attr("transform", "translate(" + (width/2) + "," + (margin.top) + ") rotate(" + (0) + ")")
                        .attr("dy", ".35em")
                        .attr("text-anchor", "middle")
                        .style("fill", "black")
                        .style("font-family", "B52-ULCW00-ULC")
                        .text("Names of Dubios' Students");
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
