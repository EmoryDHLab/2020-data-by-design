<template>
  <div class="container" style="display: grid; width: 325px">
    <div>
      <div id="occupation" style="background-color: #f9edcb; float: left"></div>
    </div>
    <div style="text-align: center">
      <a class="blue-hover" style="margin-right: 10px" @mouseover="setidx(0)"> 1900 </a>
      <a class="blue-hover" @mouseover="setidx(1)"> 1910 </a>
    </div>
    <div style="text-align: center; font-family: Consolas; font-size: 90%">Percentage of Occupation</div>
  </div>
</template>

<script>
    import * as d3 from "d3";

    export default {
        name: "Occupation",
        mounted() {
            this.generateSvg();
        },
        props: {
            visidx: {
                default: 0
            }
        },
        data() {
            return {
                bars: null,
                bar_width: 5.8,
                bar_height: 10,
                dataset: null,
                bendBar: null,
                max_width:35,
                bend_y: null,
                curve_r: 2,
                bar_x: null,
            }
        },
        watch: {
            visidx(newValue) {
                if (this.visidx === 1) {
                    for (let i = 1; i < this.bars.length; i++) {
                        this.bars[i].transition()
                            .attr("width", this.bar_width * this.dataset[i+1].prec1910)
                            .duration(800);
                    }
                    this.bendBar.transition()
                        .attr("transform", "translate(" + (this.bar_x + this.bar_width * (this.dataset[0].prec1910 - this.max_width) - (this.curve_r + this.bar_height)) +
                          "," + (this.bend_y) + ") rotate(" + (0) + ")")
                        .attr("width", this.bar_width * (this.dataset[0].prec1910 - this.max_width))
                        .duration(800)
                } else {
                    for (let i = 1; i < this.bars.length; i++) {
                        this.bars[i].transition()
                            .attr("width", this.bar_width * this.dataset[i+1].prec1900)
                            .duration(800);
                    }
                    this.bendBar.transition()
                        .attr("transform", "translate(" + (this.bar_x + this.bar_width * (this.dataset[0].prec1900 - this.max_width) - (this.curve_r + this.bar_height)) +
                            "," + (this.bend_y) + ") rotate(" + (0) + ")")
                        .attr("width", this.bar_width * (this.dataset[0].prec1900 - this.max_width))
                        .duration(800)
                }
            }
        },
        methods: {
            setidx(i) {
                this.visidx = i;
            },
            generateSvg() {
                let self = this;
                let zoom = 2.5;
                let margin = {top: 30, right: 10, bottom: 10, left: 10},
                    // width = window.innerWidth/zoom - margin.left - margin.right,
                    // height = window.innerWidth/zoom - margin.top - margin.bottom;
                    width = 814/zoom,
                    height = 1024/zoom;



                self.svg = d3.select("#occupation").append("svg")
                    .attr("class", "occupation")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g");

                let init_x = 10 + margin.left;
                let init_y = 50 + margin.top;
                let bar_x = init_x + 80;
                self.bar_x = bar_x;
                let gap = 30;
                let bar_height = self.bar_height;
                let curve_r = self.curve_r;
                let max_width = self.max_width;

                d3.csv("/duboisData/occupation.csv").then(function (occupationData) {
                    //calculate values to determine y domain
                    occupationData.forEach(function (d) {
                        // d.occuation = d.occupation;
                        d.prec1900 = Number(d.prec1900);
                        d.prec1910 = Number(d.prec1910);
                        // console.log(d)
                    });
                    self.dataset = occupationData;

                    self.bars = [];
                    for (let idx = 0; idx < occupationData.length; idx++) {
                        self.svg.append("text")
                            .attr("transform", "translate(" + (init_x) + "," + (init_y + idx*gap) + ") rotate(" + (0) + ")")
                            .attr("dy", ".25em")
                            .attr("text-anchor", "start")
                            .attr("font-size", "0.8em")
                            .style("fill", "black")
                            // .style("font-family", "Vasarely")
                            .text(occupationData[idx].occupation);
                        if (idx == 0) {
                            self.bend_y = init_y + idx * gap - bar_height / 2 + 7;
                            self.svg.append("rect")
                                .attr("transform", "translate(" + (bar_x) + "," + (init_y + idx * gap - bar_height / 2 - 7) + ") rotate(" + (0) + ")")
                                .attr("height", bar_height)
                                .attr("width", self.bar_width * max_width)
                                .attr("fill", "#dc143c");
                            self.bendBar = self.svg.append("rect")
                                .attr("transform", "translate(" + (bar_x + self.bar_width * (occupationData[idx].prec1900 - max_width) - (curve_r + bar_height)) +
                                      "," + (self.bend_y) + ") rotate(" + (0) + ")")
                                .attr("height", bar_height)
                                .attr("width", self.bar_width * (occupationData[idx].prec1900 - max_width))
                                .attr("fill", "#dc143c");
                            self.svg.append("circle")
                                .attr("transform", "translate(" + (bar_x + self.bar_width * max_width) +
                                    "," + (init_y + idx * gap) + ") rotate(" + (0) + ")")
                                .attr("fill-opacity", 1)
                                .attr("r", (bar_height + curve_r))
                                .attr("fill", "#dc143c");
                            self.svg.append("circle")
                                .attr("transform", "translate(" + (bar_x + self.bar_width * max_width) +
                                    "," + (init_y + idx * gap) + ") rotate(" + (0) + ")")
                                .attr("fill-opacity", 1)
                                .attr("r", curve_r)
                                .attr("fill", "#f9edcb");
                            self.svg.append("rect")
                                .attr("transform", "translate(" + (bar_x + self.bar_width * max_width - (bar_height + curve_r)) +
                                    "," + (init_y + idx * gap - curve_r) + ") rotate(" + (0) + ")")
                                .attr("height", curve_r*2)
                                .attr("width", 13)
                                .attr("fill", "#f9edcb");
                        } else {
                            let bar = self.svg.append("rect")
                                .attr("transform", "translate(" + (bar_x) + "," + (init_y + idx * gap - bar_height / 2) + ") rotate(" + (0) + ")")
                                .attr("height", bar_height)
                                .attr("width", self.bar_width * occupationData[idx].prec1900)
                                .attr("fill", "#dc143c");
                            self.bars.push(bar);
                        }
                    }

                    self.svg.append("text")
                        .attr("transform", "translate(" + (40) + "," + (margin.top) + ") rotate(" + (0) + ")")
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
