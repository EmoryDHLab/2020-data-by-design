<template>
  <div class="container">
    <div id="chartStacked" style="background-color: #F3ECCB; font-family: 'Dancing Script', cursive"></div>
    <div style="text-align: center; font-family: Consolas; font-size: 90%; margin-top: 10px">Two different visualizations of the same data used to recreate Playfair's import-export chart.</div>
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
                let margin = {top: 25, right: 50, bottom: 25, left: 25},
                    width = window.innerWidth/zoom/1.1 - margin.left - margin.right,
                    height = window.innerWidth/zoom/1.5 - margin.top - margin.bottom;

                let x = d3.scaleTime()
                    .range([0, width]);


                let y = d3.scaleLinear()
                    .range([height, 0]);

                self.svg = d3.select("#chartStacked").append("svg")
                    .attr("class", "chartStacked")
                    .attr("width", width + margin.left + margin.right+380)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                let interval = 500000;

                d3.csv("/playfair_nums_def.csv").then(function (playfairData) {
                    //calculate values to determine y domain
                    playfairData.forEach(function (d) {
                        d.Imports = Number(d.Imports);
                        d.Exports = Number(d.Exports);
                        d.Years = Number(d.Years);
                    });

                    var maxY = d3.max(playfairData, function (d) {
                        return d.Exports + d.Imports
                    });

                    //pick y domain based on smallest and largest number of combined import and export numbers + yInterval for more space
                    y.domain([0, maxY + interval]);

                    let minYear = d3.min(playfairData, function (d) {
                        return d.Years;
                    });
                    let maxYear = d3.max(playfairData, function (d) {
                        return d.Years;
                    });
                    x.domain([minYear - 5, maxYear + 5]);


                    //returns y-axis tickmark labels formatted correctly
                    let tickFormatterY = function (tickVal) {
                        if ((tickVal / 1000000) === 1) { //if the value is 1, omit s
                            return ("1 Million");
                        } else if ((tickVal / 1000000) % 1 === 0) { //if the value is not 1, add an s
                            return (tickVal / 1000000 + " Millions");
                        } else if (tickVal === 200000) { //first number on y-axis...might need to change to adapt for other data
                            return tickVal.toLocaleString(); //adds the comma back into the number, for some reason comes in with comma but returns without
                        } else if (tickVal < 1000000) { //less than 1 million but not the first y-value
                            return tickVal / 100000;
                        } else { //return the decimal numbers
                            return (tickVal / 1000000);
                        }
                    };


                    //adjusts y-values to be in intervals of 200,000
                    let yValues = function () {
                        var yNums = [];
                        for (var i = interval; i <= maxY; i += interval) {
                            yNums.push(i);
                        }
                        return yNums;
                    };

                    //x-axis
                    let xAxis = d3.axisBottom(x)
                        .tickSizeInner(-height) //background grid, vertical lines
                        .tickSizeOuter([0])
                        // .tickFormat(tickFormatterX)
                        .tickFormat(d3.format("d")); //removes comma from year

                    //y-axis
                    let yAxis = d3.axisRight(y)
                        .tickValues(yValues()) //override default values created by d3
                        .tickSizeInner(-width) //background grid, horizontal lines
                        .tickSizeOuter([0])
                        .tickFormat(tickFormatterY); //calls custom format function


                    // List of subgroups = header of the csv files = soil condition here
                    let subgroups = playfairData.columns.slice(1).slice(0,2);

                    var groups = d3.map(playfairData, function(d){return(d.Years)}).keys();

                    // x.domain(groups);

                    let color = d3.scaleOrdinal()
                        .domain(subgroups)
                        .range(['#ABAF7B','#E4AE95']);

                    let stackedData = d3.stack()
                        .keys(subgroups)
                        (playfairData);


                    let exportArcs = [];
                    let importArcs = [];
                    let yearAngle = 3.27;
                    // let radiusScale = 8.25;
                    let radiusScale = 12;
                    for (let idx = 0; idx < playfairData.length; idx++) {
                        let endAng;
                        let startAng = (playfairData[idx].Years - 1700)*yearAngle * Math.PI/180;
                        if (idx != playfairData.length -1) {
                            endAng = (playfairData[(idx+1)%playfairData.length].Years - 1700)*yearAngle * Math.PI/180;
                        } else endAng = 2* Math.PI;
                        let ea = d3.arc()
                            .innerRadius(0)
                            .outerRadius(playfairData[idx].Imports/ interval*radiusScale)
                            .startAngle(startAng)
                            .endAngle(endAng);
                        exportArcs.push(ea);
                        let ia = d3.arc()
                            .innerRadius(0)
                            .outerRadius((playfairData[idx].Imports + playfairData[idx].Exports)/ interval*radiusScale)
                            .startAngle(startAng)
                            .endAngle(endAng);
                        importArcs.push(ia);
                    }

                    let outlineArcs = [];
                    let maxOuterR = (maxY/(interval)+1)*radiusScale/2;
                    for (let i = 0; i < 11; i++) {
                        let startAng = 2*Math.PI/11*i;
                        let endAng = 2*Math.PI/11*(i+1);
                        let oa = d3.arc()
                            .innerRadius(0)
                            .outerRadius(maxOuterR)
                            .startAngle(startAng)
                            .endAngle(endAng);
                        outlineArcs.push(oa);
                    }

                    /*************************append all of the graphics to the canvas**************************************/


                    self.svg.datum(playfairData); //binds data, makes static and not interactive

                    //coxcomb sectors
                    // let coxXposition = width/2*3+30;
                    // let coxYPosition = height/2;
                    let coxXposition = width/2*3+50;
                    let coxYPosition = height/2+45;
                    for (let idx = 0; idx < playfairData.length; idx++) {
                        self.svg.append("path")
                            .attr("transform", "translate(" + coxXposition + "," + coxYPosition + ") ")
                            .style("fill", "#E4AE95")
                            .attr("d", importArcs[idx]);
                        self.svg.append("path")
                            .attr("transform", "translate(" + coxXposition + "," + coxYPosition + ") ")
                            .style("fill", "#ABAF7B")
                            .attr("d", exportArcs[idx]);
                    }

                    //cox outline
                    for (let i = 0; i < 11; i++) {
                        self.svg.append("path")
                            .attr("transform", "translate(" + coxXposition + "," + coxYPosition + ") ")
                            .style("fill-opacity", 0)
                            .attr("stroke", "#7e7e7e")
                            .attr("d", outlineArcs[i]);
                        self.svg.append("text")
                            .attr("transform", "translate(" +
                                (coxXposition + Math.sin(2*Math.PI/11*(i+0.4))*(maxOuterR + 6)) + "," +
                                (coxYPosition - Math.cos(2*Math.PI/11*(i+0.4))*(maxOuterR + 6)) +
                                ") rotate(" + ((i+0.4)*360/11) + ")")
                            .attr("dy", ".35em")
                            .attr("text-anchor", "start")
                            .style("fill", "black")
                            .style("font-size", 'large')
                            .style("font-family", "chancery_cursiveitalic")
                            .text(1700+i*10);
                    }

                    //cox scale
                    for (let i = 0; i <= maxY/2; i += interval) {
                        self.svg.append("circle")
                            .attr("fill-opacity", 0)
                            .attr("stroke", "#9c9c9c")
                            .style("stroke-width", function (d) {
                                if (i%(2*interval) == 0) return 0.7;
                                else return 0.3;
                            })
                            // .attr("stroke-width", 0.5)
                            .attr("cx", coxXposition)
                            .attr("cy", coxYPosition)
                            .attr("r", i/interval*radiusScale);
                    }

                    //add cox labels
                    self.svg.append("text")
                        .attr("transform", "translate(" + (coxXposition - 10) + "," + (coxYPosition - 30) + ") rotate(" + (0) + ")")
                        .attr("dy", ".35em")
                        .attr("text-anchor", "start")
                        .style("fill", "black")
                        .text("Imports");
                    self.svg.append("text")
                        .attr("transform", "translate(" + (coxXposition - 30) + "," + (coxYPosition - 90) + ") rotate(" + (0) + ")")
                        .attr("dy", ".35em")
                        .attr("text-anchor", "start")
                        .style("fill", "black")
                        .text("Exports");


                    //bg color borrowed from former student
                    //makes inner graph lighter
                    self.svg.append("rect")
                        .attr("height", height)
                        .attr("width", width)
                        .attr("fill", "white")
                        .attr("opacity", .2);

                    let barXscale = 3.27;
                    //stacked bar vis
                    self.svg.append("g")
                        .selectAll("g")
                        // Enter in the stack data = loop key per key = group per group
                        .data(stackedData)
                        .enter().append("g")
                        .attr("fill", function(d) { return color(d.key); })
                        .selectAll("rect")
                        // enter a second time = loop subgroup per subgroup to add all rectangles
                          .data(function(d) { return d; })
                          .enter().append("rect")
                          .attr("x", function(d) { return (2.5 + d.data.Years - 1700) * barXscale; })
                          .attr("y", function(d) { return y(d[1]); })
                          .attr("height", function(d) { return y(d[0]) - y(d[1]); })
                          .attr("width",20);

                    //x axis
                    self.svg.append("g")
                        .attr("transform", "translate(0," + height + ")") //orients x-axis to bottom of chart (default is top)
                        .attr("class", "axis")
                        .style("font-size", 'large')
                        .style("font-family", "chancery_cursiveitalic")
                        .call(xAxis);

                    //y axis
                    self.svg.append("g")
                        .attr("transform", "translate(" + width + ",0)") //orients y-axis to right of chart (default is left)
                        .attr("class", "axis")
                        .call(yAxis);

                    //styles the grid lines based on y-axis values - integer million lines are bolded
                    self.svg.selectAll('g.tick line')
                        .style("stroke-width", function (d) {
                            if ((d / 1000000) % 1 === 0) {
                                return 2;
                            } else {
                                return 1;
                            }
                        })
                        .style("opacity", function (d) {
                            if ((d / 1000000) % 1 === 0)
                                return 0.4;
                            else
                                return 0.2;
                        });

                    // "time" label
                    self.svg.append("text")
                        .attr("transform", "translate(" + (width / 2) + ")")
                        .attr("y", -7) //place label with correct space adjacent to graph
                        .attr("class", "axis-labels")
                        .style("text-anchor", "middle")
                        .style("font-family", 'Times New Roman')
                        .text("Time");

                    //"case" label
                    self.moneyLabel = self.svg.append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 0 - margin.left) //place it with correct space adjacent to graph
                        .attr("x", 0 - (height / 2))
                        .attr("dy", "1em")
                        .attr("class", "axis-labels")
                        .style("font-family", 'Times New Roman')
                        .style("text-anchor", "middle")
                        .text("U.S. Dollar");


                    //outline around inner chart
                    self.svg.append("rect")
                        .attr("height", height)
                        .attr("width", width + margin.right)
                        .attr("fill", "transparent")
                        .attr("stroke", "black")
                        .attr("stroke-width", 2);

                    //)******************************************CREATE GRAPH LABEL - borrowed from former student*******//
                    var ellipseX = ((width * 3) / 10) ;
                    var ellipseY = 100;
                    let ellipseRX = 105;
                    let ellipseRY = 70;
                    var textX = ellipseX - ellipseRX + 15;
                    var textY = ellipseY - ellipseRY/4;

                    //add Label
                    self.title1 = self.svg.append("ellipse")
                        .attr("id", "currValue")
                        .attr("cx", ellipseX)
                        .attr("cy", ellipseY)
                        .attr("rx", ellipseRX)
                        .attr("ry", ellipseRY)
                        .attr("fill", "#FCE2B0")
                        .attr("stroke", "black")
                        .attr("stroke-width", 1);
                    self.title3 = self.svg.append("text")
                        .attr("id", "currValue")
                        .attr("class", "titleText")
                        .attr("x", textX)
                        .attr("y", textY)
                        .attr("font-size", "1.1em")
                        // .style("font-size", 'x-large')
                        .style("font-family", 'maranalloregular')
                        .text("EXPORTS & IMPORTS");
                    self.title4 = self.svg.append("text")
                        .attr("id", "currValue")
                        .attr("class", "titleText2")
                        .attr("x", textX + 60)
                        .attr("y", textY + 25) //adjusts vertical space between text liens
                        .attr("font-size", "1.3em")
                        // .style("font-size", 'xx-large')
                        .style("font-family", 'chancery_cursiveitalic')
                        .text("to and from all");
                    self.title5 = self.svg.append("g")
                        .attr("id", "currValue")
                        .attr("class", "titleText3")
                        .attr("transform", "translate(55,0)")
                        .append("text")
                        .attr("x", (textX - 50))
                        .attr("y", (textY + 50))
                        .attr("font-size", "1.25em")
                        // .style("font-size", 'xx-large')
                        .style("font-family", 'maranalloregular')
                        .style("position", 'fixed')
                        .style("border-left", '75px')
                        .style("border-top", '100px')
                        .text("NORTH AMERICA");


                    // add line labels
                    self.importText = self.svg.append("text")
                        .attr("transform", "translate(" + (width - 320/zoom - 80) + "," + (height - 250/zoom + 50) + ") rotate(" + (0) + ")")
                        .attr("dy", ".35em")
                        .attr("text-anchor", "start")
                        // .attr("visibility","hidden")
                        .style("fill", "black")
                        .text("Imports");
                    self.exportText = self.svg.append("text")
                        .attr("transform", "translate(" + (width - 690/zoom + 70) + "," + (height - 55/zoom - 100) + ") rotate(" + (0) + ")")
                        .attr("dy", ".35em")
                        .attr("text-anchor", "start")
                        .style("fill", "black")
                        .text("Exports");

                });

            },

        }
    }
</script>

<style scoped>
  /*/////////////////////////////////////////////////font faces used for axis labels and title ////////////////////*/
  @font-face {
    src: local("Times");
    font-family: embeddedTimes;
    advancedAntiAliasing: true;
    fontWeight: bold;
  }

  @font-face {
    font-family: 'chancery_cursiveitalic';
    /*src: url('fonts/chancur-webfont.eot');*/
    src: url('fonts/chancur-webfont.eot?#iefix') format('embedded-opentype'),
    url('fonts/chancur-webfont.woff2') format('woff2'),
    url('fonts/chancur-webfont.woff') format('woff'),
    url('fonts/chancur-webfont.ttf') format('truetype'),
    url('fonts/chancur-webfont.svg#chancery_cursiveitalic') format('svg');
    font-weight: normal;
    font-style: normal;
    font-size: 120%;

  }

  @font-face {
    font-family: 'maranalloregular';
    src: url('fonts/maranallo-webfont.eot');
    src: url('fonts/maranallo-webfont.eot?#iefix') format('embedded-opentype'),
    url('fonts/maranallo-webfont.woff2') format('woff2'),
    url('fonts/maranallo-webfont.woff') format('woff'),
    url('fonts/maranallo-webfont.ttf') format('truetype'),
    url('fonts/maranallo-webfont.svg#maranalloregular') format('svg');
    font-weight: normal;
    font-style: normal;
    font-size: 120%;
  }


  .axis-labels{
    font-family: 'Times New Roman', Times, serif;
  }

  .axis {
    font-size: large;
    font-family: 'chancery_cursiveitalic';
  }

  /*outermost border*/
  .chartWomen{
    background: #FCE2B0;
    opacity: 1;
    border-style: solid;
    border-color: black;
    border-width: 6px;
    padding-right: 50px;

    box-shadow:
            inset 0 0 0 4px #FCE2B0,
            inset 0 0 0 6px black;
  }

  .axis path,
  .axis line {
    fill: none;
    stroke: #000;
    stroke-width: 2px;
  }


  .x.axis path {
    display: none;
  }

  .exports{
    stroke: #BB877F; /*pink line*/
    stroke-width: 5px; /*added after doing undefined work*/

  }

  .tick line{
    opacity: 0.2;
    stroke-width: 1px;
  }

  .titleText{
    font-size: x-large;
    font-family: 'maranalloregular' ;
  }
  .titleText2{
    font-size: xx-large;
    font-family: 'chancery_cursiveitalic';
  }
  .titleText3{
    font-size: xx-large;
    font-family: 'maranalloregular' ;
    position: fixed;
    border-left: 75px;
    border-top: 100px;
  }
</style>
