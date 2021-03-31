<template>
  <div class="container" style="display: grid">
    <div>
    <div id="migration" style="background-color: #f9edcb; float: left"></div>
    </div>
    <div style="text-align: left; font-family: Consolas; font-size: 90%">Migration</div>
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
                // geoData from https://gist.github.com/michellechandra/0b2ce4923dc9b5809922
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
                stateIdx.set('E',["MI","WI","IL","OH", "IN"]);
                stateIdx.set('G',["OK","TX","AR","UT","CO","WY","ID","WY","MT"]); //"What are the Ind.Ter"
                stateIdx.set('H',["Canada"]);
                stateIdx.set('J',["Africa"]);
                stateIdx.set('K',["West Indies"]);
                stateIdx.set('L',["CA","NV","WA","OR"]);
                stateIdx.set('M',["NM","AZ"]);
                let validGroup = ['A','B', 'C', 'D', 'E', 'F', 'G', 'L','M'];
                let stateToGroup = new Map();
                stateIdx.forEach((v, k) => {
                    v.forEach( s => stateToGroup.set(s,k))
                });
                let colorMap = new Map();
                colorMap.set('A', "#ec5b37");
                colorMap.set('B', "#eca3bc");
                colorMap.set('C', "#ecca77");
                colorMap.set('D', "#5fec2a");
                colorMap.set('E', "#23b171");
                colorMap.set('F', "#a85a29");
                colorMap.set('G', "#84ecc6");
                colorMap.set('L', "#66abec");
                colorMap.set('M', "#b884ec");
                let groupPos = {
                    A: {x:280, y:80},
                    B: {x:250, y:110},
                    C: {x:230, y:140},
                    D: {x:230, y:180},
                    E: {x:200, y:100},
                    F: {x:140, y:100},
                    G: {x:150, y:155},
                    L: {x:60, y:120},
                    M: {x:100, y:160},
                };
                let projection = d3.geoAlbersUsa()
                    .translate([width/2, height/3])    // translate to center of screen
                    .scale([350]);
                let geoPath = d3.geoPath().projection(projection);

                let arrorLength = 20;

                d3.csv("/duboisData/migration1910.csv").then(function (migrationData) {
                    d3.json("/duboisData/us-states.json").then(function (json) {
                        for (let i = 0; i < json.features.length; i++) {
                            let s = json.features[i].properties.name;
                            let g = stateToGroup.get(s);
                            json.features[i].properties.color = colorMap.get(g);
                        }
                        console.log(migrationData[3]['A']);
                        self.svg.selectAll("path")
                            .data(json.features)
                            .enter()
                            .append("path")
                            .attr("d", geoPath)
                            .style("stroke", "#373737")
                            .style("stroke-width", "0.5")
                            .style("fill", d => d.properties.color)
                            //if need opactiy
                            // .style('fill-opacity', d =>
                            //     //if need hover over effect, change "3" to corresponding index
                            //     migrationData[3][stateToGroup.get(d.properties.name)]/35
                            // )
                            .style('opacity', function (d) {
                                if ( typeof d.properties.color != 'undefined') {
                                    return 1;
                                } else return 0;
                            })
                            ;
                        validGroup.forEach(function (g) {
                            if (g != 'D') {
                                let arrow = d3.symbol().type(d3.symbolTriangle).size(10);
                                let dx = groupPos.D.x - groupPos[g].x;
                                let dy = groupPos.D.y - groupPos[g].y;
                                let d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
                                let theta = Math.atan(dy/dx);
                                console.log(theta);
                                if (theta < 0) theta += Math.PI; //TODO: FIX THIS MATH
                                self.svg.append('line')
                                    .style("stroke", "black")
                                    .style("stroke-width", 0.5)
                                    .attr("x1", groupPos[g].x)
                                    .attr("y1", groupPos[g].y)
                                    .attr("x2", groupPos[g].x + dx * arrorLength / d)
                                    .attr("y2", groupPos[g].y + dy * arrorLength / d);
                                self.svg.append("path")
                                    .attr("d", arrow)
                                    .attr("transform", "translate(" + (groupPos[g].x) + "," + (groupPos[g].y) + ") rotate(" +
                                        ( - 90 + theta*180/Math.PI) + ")")
                                self.svg.append("text")
                                    .attr("transform", "translate(" + (groupPos[g].x) + "," + (groupPos[g].y - 5) + ") rotate(" + (0) + ")")
                                    .attr("text-anchor", "middle")
                                    .attr("font-size", "0.6em")
                                    .style("fill", "black")
                                    .text(migrationData[3][g]);
                            }
                        })
                    });
                    self.svg.append("text")
                        .attr("transform", "translate(" + (width / 2) + "," + (margin.top) + ") rotate(" + (0) + ")")
                        .attr("dy", ".35em")
                        .attr("text-anchor", "middle")
                        .style("fill", "black")
                        .style("font-family", "B52-ULCW00-ULC")
                        .text("Migration of Black College Grads");

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
