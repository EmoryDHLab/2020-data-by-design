<template>
  <div class="container">
    <div id="chartWomen" style="background-color: #F3ECCB; font-family: 'Dancing Script', cursive"></div>
  </div>
</template>

<script>
    import * as d3 from "d3";

    export default {
        name: "D3ImplWomen",
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
                let zoom = 3;
                let margin = {top: 25, right: 40, bottom: 25, left: 25},
                    width = window.innerWidth/zoom/0.77 - margin.left - margin.right,
                    height = window.innerWidth/zoom/1.6 - margin.top - margin.bottom;

                let x = d3.scaleTime()
                    .range([0, width]);

                let y = d3.scaleLinear()
                    .range([height, 0]);

                self.svg = d3.select("#chartWomen").append("svg")
                    .attr("class", "chartWomen")
                    .attr("width", width + margin.left + margin.right+25)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                let interval = 5000;
                let dateInterval = 5;

                d3.csv("/income.csv").then(function (incomeData) {
                    //calculate values to determine y domain
                    incomeData.forEach(function (d) {
                        d.ukMeanDollar = Number(d.ukMeanDollar);
                        d.usMeanDollar = Number(d.usMeanDollar);
                        d.Year = Number(d.Year);
                    });

                    let ukMax = d3.max(incomeData, function (d) {
                        return d.ukMeanDollar;
                    });

                    let usaMax = d3.max(incomeData, function (d) {
                        return d.usMeanDollar;
                    });

                    let maxY = Math.max(ukMax, usaMax);

                    //pick y domain based on smallest and largest number of combined import and export numbers + yInterval for more space
                    y.domain([0, maxY + interval]);
                    x.domain(d3.extent(incomeData, function (d) {
                        return (d.Year);
                    }));



                    //returns y-axis tickmark labels formatted correctly
                    let tickFormatterY = function (tickVal) {
                        return tickVal/1000 + "K";
                    };

                    let yValues = function () {
                        var yNums = [];
                        for (var i = interval; i <= maxY; i += interval) {
                            yNums.push(i);
                        }
                        return yNums;
                    };

                    let tickFormatterX = function (tickVal) {
                        return tickVal;
                    };

                    let xValues = function () {
                        var xNums = [];
                        for (var i = incomeData[0].Year; i <= incomeData[incomeData.length-1].Year; i += dateInterval) {
                            xNums.push(i);
                        }
                        return xNums;
                    };

                    //x-axis
                    var xAxis = d3.axisBottom(x)
                        .tickValues(xValues())
                        .tickSizeInner(-height) //background grid, vertical lines
                        .tickSizeOuter([0])
                        .tickFormat(tickFormatterX);

                    //y-axis
                    var yAxis = d3.axisRight(y)
                        .tickValues(yValues()) //override default values created by d3
                        .tickSizeInner(-width) //background grid, horizontal lines
                        .tickSizeOuter([0])
                        .tickFormat(tickFormatterY); //calls custom format function

                    //line & exportLined are area svg for the difference graph (ow would be line svg)

                    /****LINE AND AREA FOR DEFINED DATA****/

                    self.ukLined = d3.area()
                            .curve(d3.curveCardinal)
                            .x(d => x(d.Year))
                            .y(d => y(d.ukMeanDollar));


                    self.usLined = d3.area()
                        .curve(d3.curveCardinal)
                        .x(d => x(d.Year))
                        .y(d => y(d.usMeanDollar));


                    let area = d3.area()
                        .curve(d3.curveCardinal) //makes the line curvy
                        .x(d => x(d.Year))
                        .y1(d => y(d.usMeanDollar))
                        .y0(d => y(d.ukMeanDollar))
                        ; //y1 makes the Imports line the baseline


                    /****//**END LINE AND AREA FOR DEFINED DATA****/


                    /*************************append all of the graphics to the canvas**************************************/


                    self.svg.datum(incomeData); //binds data, makes static and not interactive

                    //bg color borrowed from former student
                    //makes inner graph lighter
                    self.svg.append("rect")
                        .attr("height", height)
                        .attr("width", width)
                        .attr("fill", "white")
                        .attr("opacity", .2);

                    /**DIFFERENCE GRAPH**/


                    self.svg.append("clipPath")
                        .attr("id", "clip-above-income")
                        .append("path")
                        .attr("d", area.y0(0));

                    self.svg.append("clipPath")
                        .attr("id", "clip-below-income")
                        .append("path")
                        .attr("d", area.y0(height));

                    self.areaGreen = self.svg.append("path")
                        .attr("clip-path", "url(#clip-above-income)")
                        .attr("d", area.y0(d => y(d.ukMeanDollar)))
                        .style("fill", '#ABAF7B');

                    self.areaPink = self.svg.append("path")
                        .attr("class", "area below")
                        .attr("clip-path", "url(#clip-below-income)")
                        .attr("d", area.y0(d => y(d.ukMeanDollar)))
                        .style("fill", '#E4AE95');

                    /**END DIFFERENCE GRAPH**/


                    self.svg.append("path")
                        .attr("class", "line")
                        .attr("d", self.ukLined)
                        .style("stroke", '#D6BF24')
                        .style("stroke-width", "3px");

                    self.svg.append("path")
                        .attr("class", "line exports")
                        .attr("d", self.usLined)
                        .style("stroke", '#BB877F')
                        .style("stroke-width", "3px");


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
                            if ((d / (interval * 2) ) % 1 === 0) {
                                return 2;
                            } else {
                                return 1;
                            }
                        })
                        .style("opacity", function (d) {
                            if ((d / (interval * 2)) % 1 === 0)
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
                    var ellipseX = ((width * 3) / 15) + 350;
                    var ellipseY = 200;
                    let ellipseRX = 110;
                    let ellipseRY = 70;
                    var textX = ellipseX - ellipseRX + 30;
                    var textY = ellipseY - ellipseRY/4 - 5;

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
                        .attr("font-size", "1.25em")
                        // .style("font-size", 'x-large')
                        .style("font-family", 'maranalloregular')
                        .text("Average Income");
                    self.title4 = self.svg.append("text")
                        .attr("id", "currValue")
                        .attr("class", "titleText2")
                        .attr("x", textX + 20)
                        .attr("y", textY + 30) //adjusts vertical space between text liens
                        .attr("font-size", "1.5em")
                        // .style("font-size", 'xx-large')
                        .style("font-family", 'chancery_cursiveitalic')
                        .text("comparison between");
                    self.title5 = self.svg.append("g")
                        .attr("id", "currValue")
                        .attr("class", "titleText3")
                        .attr("transform", "translate(55,0)")
                        .append("text")
                        .attr("x", (textX - 50))
                        .attr("y", (textY + 60))
                        .attr("font-size", "1.5em")
                        // .style("font-size", 'xx-large')
                        .style("font-family", 'maranalloregular')
                        .style("position", 'fixed')
                        .style("border-left", '75px')
                        .style("border-top", '100px')
                        .text("U.S. and U.K.");


                    // add line labels
                    self.exportText = self.svg.append("text")
                        .attr("transform", "translate(" + (width - 320/zoom - 250) + "," + (height - 250/zoom - 80) + ") rotate(" + (-20) + ")")
                        .attr("dy", ".35em")
                        .attr("text-anchor", "start")
                        // .attr("visibility","hidden")
                        .style("fill", "black")
                        .text("U.K.");
                    self.importText = self.svg.append("text")
                        .attr("transform", "translate(" + (width - 690/zoom - 150) + "," + (height - 55/zoom - 200) + ") rotate(" + (-11) + ")")
                        .attr("dy", ".35em")
                        .attr("text-anchor", "start")
                        .style("fill", "black")
                        .text("U.S.");


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