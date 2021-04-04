<template>
  <div class="container" style="display: grid; width: 325px">
    <div>
    <div id="gradsBySex" style="background-color: #f9edcb; float: left"></div>
    </div>
    <div style="text-align: center">
      <a class="blue-hover" style="margin-right: 10px" @mouseover="setidx(0)"> 1900 </a>
      <a class="blue-hover" @mouseover="setidx(1)"> 1910 </a>
    </div>
    <div style="text-align: center; font-family: Consolas; font-size: 90%">Graduates by Sex</div>
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
            visidx: {
                default: 0
            }
        },
        data() {
            return {
                barsMen: null,
                barsWomen: null,
                textMen: [],
                textWomen: [],
                dataset: null,
                bar_width: 1.1,
                bar_height: 12.5,
                gap: 45,
                init_y: null,
                bar_x: null
            }
        },
        watch: {
            visidx(newValue) {
                if (this.visidx === 1) {
                    for (let i = 0; i < this.barsMen.length; i++) {
                        this.barsMen[i].transition()
                            .attr("width", this.bar_width * this.dataset[i].men1910)
                            .duration(800);
                        if (this.dataset[i].men1910 > 10) {
                            this.textMen[i].transition()
                                .attr("transform", "translate(" + (this.bar_x + this.bar_width * this.dataset[i].men1910/2) + "," + (this.init_y + (i)*this.gap -1) + ") rotate(" + (0) + ")")
                                .text(this.dataset[i].men1910)
                                .attr("text-anchor", "middle")
                                .style("fill", "white")
                                .duration(800);
                        } else {
                            this.textMen[i].transition()
                                .text(this.dataset[i].men1910)
                                .style("fill", "black")
                                .attr("text-anchor", "start")
                                .attr("transform", "translate(" + (this.bar_x + this.bar_width * this.dataset[i].men1910 + 1) + "," + (this.init_y + (i)*this.gap -1) + ") rotate(" + (0) + ")")
                                .duration(800);
                        }
                        this.barsWomen[i].transition()
                            .attr("width", this.bar_width * this.dataset[i].women1910)
                            .duration(800);
                        if (this.dataset[i].women1910 > 10) {
                            this.textWomen[i].transition()
                                .attr("transform", "translate(" + (this.bar_x + this.bar_width * this.dataset[i].women1910/2) + "," + (this.init_y + (i)*this.gap + this.bar_height - 2) + ") rotate(" + (0) + ")")
                                .text(this.dataset[i].women1910)
                                .attr("text-anchor", "middle")
                                .duration(800);
                        } else {
                            this.textWomen[i].transition()
                                .text(this.dataset[i].women1910)
                                .attr("text-anchor", "start")
                                .attr("transform", "translate(" + (this.bar_x + this.bar_width * this.dataset[i].women1910 + 1) + "," + (this.init_y + (i)*this.gap + this.bar_height - 2) + ") rotate(" + (0) + ")")
                                .duration(800);
                        }
                    }
                } else {
                    for (let i = 0; i < this.barsMen.length; i++) {
                        this.barsMen[i].transition()
                            .attr("width", this.bar_width * this.dataset[i].men1900)
                            .duration(800);
                        if (this.dataset[i].men1900 > 10) {
                            this.textMen[i].transition()
                                .attr("transform", "translate(" + (this.bar_x + this.bar_width * this.dataset[i].men1900/2) + "," + (this.init_y + (i)*this.gap -1) + ") rotate(" + (0) + ")")
                                .text(this.dataset[i].men1900)
                                .attr("text-anchor", "middle")
                                .style("fill", "white")
                                .duration(800);
                        } else {
                            this.textMen[i].transition()
                                .text(this.dataset[i].men1900)
                                .style("fill", "black")
                                .attr("text-anchor", "start")
                                .attr("transform", "translate(" + (this.bar_x + this.bar_width * this.dataset[i].men1900 + 1) + "," + (this.init_y + (i)*this.gap -1) + ") rotate(" + (0) + ")")
                                .duration(800);
                        }
                        this.barsWomen[i].transition()
                            .attr("width", this.bar_width * this.dataset[i].women1900)
                            .duration(800);
                        if (this.dataset[i].women1900 > 10) {
                            this.textWomen[i].transition()
                                .attr("transform", "translate(" + (this.bar_x + this.bar_width * this.dataset[i].women1900/2) + "," + (this.init_y + (i)*this.gap + this.bar_height - 2) + ") rotate(" + (0) + ")")
                                .text(this.dataset[i].women1900)
                                .attr("text-anchor", "middle")
                                .duration(800);
                        } else {
                            this.textWomen[i].transition()
                                .text(this.dataset[i].women1900)
                                .attr("text-anchor", "start")
                                .attr("transform", "translate(" + (this.bar_x + this.bar_width * this.dataset[i].women1900 + 1) + "," + (this.init_y + (i)*this.gap + this.bar_height - 2) + ") rotate(" + (0) + ")")
                                .duration(800);
                        }
                    }
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
                self.init_y = init_y;
                let bar_x = init_x + 80;
                self.bar_x = bar_x;
                let gap = self.gap;
                let bar_height = self.bar_height;
                let bar_width = self.bar_width;

                d3.csv("/duboisData/gradsBySex.csv").then(function (gradsBySexData) {
                    //calculate values to determine y domain
                    gradsBySexData.forEach(function (d) {
                        d.women1900 = Number(d.women1900);
                        d.men1900 = Number(d.men1900);
                        d.women1910 = Number(d.women1910);
                        d.men1910 = Number(d.men1910);
                    });
                    self.dataset = gradsBySexData;
                    self.barsMen = [];
                    self.barsWomen = [];
                    for (let idx = 0; idx < gradsBySexData.length; idx++) {
                        self.svg.append("text")
                            .attr("transform", "translate(" + (bar_x - 20) + "," + (init_y + idx*gap) + ") rotate(" + (0) + ")")
                            .attr("dy", ".25em")
                            .attr("text-anchor", "end")
                            .attr("font-size", "0.8em")
                            .style("fill", "black")
                            // .style("font-family", "Vasarely")
                            .text(gradsBySexData[idx].college);
                        let bar_men = self.svg.append("rect")
                            .attr("transform", "translate(" + (bar_x) + "," + (init_y + idx * gap - bar_height) + ") rotate(" + (0) + ")")
                            .attr("height", bar_height)
                            .attr("width", bar_width * gradsBySexData[idx].men1900)
                            .attr("fill", "#000000");
                        self.barsMen.push(bar_men);

                        let text_men;
                        if (gradsBySexData[idx].men1900 > 10) {
                            text_men = self.svg.append("text")
                                .attr("transform", "translate(" + (bar_x + bar_width * gradsBySexData[idx].men1900/2) + "," + (init_y + idx*gap -1) + ") rotate(" + (0) + ")")
                                .attr("text-anchor", "middle")
                                .attr("font-size", "0.65em")
                                .style("fill", "white")
                                .text(gradsBySexData[idx].men1900);
                        } else {
                            text_men = self.svg.append("text")
                                .attr("transform", "translate(" + (bar_x + bar_width * gradsBySexData[idx].men1900 + 1) + "," + (init_y + idx*gap -1) + ") rotate(" + (0) + ")")
                                .attr("text-anchor", "start")
                                .attr("font-size", "0.65em")
                                .style("fill", "black")
                                .text(gradsBySexData[idx].men1900);
                        }
                        self.textMen.push(text_men);


                        let bar_women = self.svg.append("rect")
                            .attr("transform", "translate(" + (bar_x) + "," + (init_y + idx * gap ) + ") rotate(" + (0) + ")")
                            .attr("height", bar_height)
                            .attr("width", bar_width * gradsBySexData[idx].women1900)
                              .attr("fill", "#ffd700");
                        self.barsWomen.push((bar_women));
                        let text_women;
                        if (gradsBySexData[idx].women1900 > 10) {
                            text_women = self.svg.append("text")
                                .attr("transform", "translate(" + (bar_x + bar_width * gradsBySexData[idx].women1900/2) + "," + (init_y + idx*gap + bar_height - 2) + ") rotate(" + (0) + ")")
                                .attr("text-anchor", "middle")
                                .attr("font-size", "0.65em")
                                .style("fill", "black")
                                .text(gradsBySexData[idx].women1900);
                        } else {
                            text_women = self.svg.append("text")
                                .attr("transform", "translate(" + (bar_x + bar_width * gradsBySexData[idx].women1900 + 1) + "," + (init_y + idx*gap + bar_height - 2) + ") rotate(" + (0) + ")")
                                .attr("text-anchor", "start")
                                .attr("font-size", "0.65em")
                                .style("fill", "black")
                                .text(gradsBySexData[idx].women1900);
                        }
                        self.textWomen.push(text_women)

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
