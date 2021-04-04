<template>
  <div class="container" style="display: grid; width: 325px">
    <div>
    <div id="business" style="background-color: #f9edcb; float: left"></div>
    </div>
    <div style="text-align: center; font-family: Consolas; font-size: 90%">Black College Grads in Business</div>
  </div>
</template>

<script>
    import * as d3 from "d3";

    export default {
        name: "business",
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


                self.svg = d3.select("#business").append("svg")
                    .attr("class", "business")
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

                let boxHeights = [150, 60, 70, 40, 50, 80, 42, 50, 80, 100];

                let boxXoffset = [ 90,  5, 46, 5, 5,140, 70, 5, 68,130];

                let boxYoffset = [  0, -25, -55, -20, -15,-30,-20, -15,-50,-90];

                let lineLength = [100, 10,70,10,10,150,100,10,100,150];

                let boxColor = ["#ffd700", "#00aa00", "#ffc0cb", "#0000ff", "#dc143c", "#654321", "#d2b48c", "#000000",
                    "#ffd700", "#00aa00", "#ffc0cb", ];

                // Gird
                self.svg.append("rect")
                    .attr("transform", "translate(" + (bar_x) + "," + (init_y) + ") rotate(" + (0) + ")")
                    .attr("height", height-init_y-margin.bottom + 5)
                    .attr("width", width - bar_x-margin.right)
                    .attr("fill", "#f2e7cd");

                d3.csv("/duboisData/business.csv").then(function (businessData) {
                    //calculate values to determine y domain
                    businessData.forEach(function (d) {
                        d.count = Number(d.count);
                    });
                    for (let idx = 0; idx < businessData.length; idx++) {
                        self.svg.append('line')
                            .style("stroke", "#bcbcbc")
                            .style("stroke-width", 0.5)
                            .attr("x1", bar_x)
                            .attr("y1", init_y + idx*gap + 7)
                            .attr("x2", bar_x + lineLength[idx])
                            .attr("y2", init_y + idx*gap + 7);
                        self.svg.append("text")
                            .attr("transform", "translate(" + (bar_x - 3) + "," + (init_y + idx*gap) + ") rotate(" + (0) + ")")
                            .attr("dy", "1em")
                            .attr("text-anchor", "end")
                            .attr("font-size", "0.6em")
                            .style("fill", "black")
                            // .style("font-family", "Vasarely")
                            .text(businessData[idx].name);
                        self.svg.append("rect")
                            .attr("transform", "translate(" + (bar_x + boxXoffset[idx]) + "," + (init_y + idx*gap + boxYoffset[idx]) + ") rotate(" + (0) + ")")
                            .attr("height", boxHeights[idx])
                            .attr("width", (businessData[idx].count*scale)/boxHeights[idx])
                            .attr("fill", boxColor[idx]);

                    }



                    // Title
                    self.svg.append("text")
                        .attr("transform", "translate(" + (width/2) + "," + (margin.top) + ") rotate(" + (0) + ")")
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
