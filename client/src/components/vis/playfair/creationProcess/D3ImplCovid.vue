<template>
  <div class="container">
    <div id="chartCovid" style="background-color: #F3ECCB; font-family: 'Dancing Script', cursive"></div>
  </div>
</template>

<script>
    import * as d3 from "d3";

    //usa data: https://covidtracking.com/data/download
    //uk data: https://coronavirus.data.gov.uk/details/download
    export default {
        name: "D3ImplCovid",
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
            perCapita(capita, population, count) {
                return (capita*count/population).toFixed(2);
            },
            generateSvg() {
                let self = this;
                let zoom = 3;
                let margin = {top: 25, right: 40, bottom: 25, left: 25},
                    width = window.innerWidth/zoom/0.77 - margin.left - margin.right,
                    height = window.innerWidth/zoom/1.6 - margin.top - margin.bottom;


                //scales
                //"D3's time scale is an extension of d3.scale.linear that uses JavaScript Date objects as the domain representation.
                //Thus, unlike the normal linear scale, domain values are coerced to dates rather than numbers;"
                //https://github.com/mbostock/d3/wiki/Time-Scales
                var x = d3.scaleLinear()
                    .range([0, width]);

                var y = d3.scaleLinear()
                    .range([height, 0]);

                self.svg = d3.select("#chartCovid").append("svg")
                    .attr("class", "chartCovid")
                    .attr("width", width + margin.left + margin.right+25)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                var interval = 500;
                var dateInterval = 30;
                var capita = 1000000; //1M
                var ukPopulation = 66650000; //66.65 million
                var usaPopulation = 328200000; //328.2 million


                d3.csv("/uk-covid.csv").then(function (ukData) {
                    //calculate values to determine y domain

                    var idx = 0;
                    ukData.forEach(function (d) {
                        // d.cumCasesByPublishDate = self.perCapita(capita, ukPopulation, d.cumCasesByPublishDate);
                        d.cumDeaths28DaysByDeathDate = self.perCapita(capita, ukPopulation, d.cumDeaths28DaysByDeathDate);
                        d.usDeath = self.perCapita(capita, usaPopulation, d.usDeath);
                        // d.newCasesByPublishDate = self.perCapita(capita, ukPopulation, d.newCasesByPublishDate);
                        // d.newDeaths28DaysByDeathDate = self.perCapita(capita, ukPopulation, d.newDeaths28DaysByDeathDate);
                        d.index = idx;
                        idx++;
                    });

                    var ukMax = ukData[0].cumDeaths28DaysByDeathDate;

                    var usaMax = ukData[0].usDeath;


                    //start date: 2020-01-13;
                    var maxY = Math.max(ukMax, usaMax);

                    var maxX = ukData.length;

                    //pick y domain based on smallest and largest number of combined import and export numbers + yInterval for more space
                    y.domain([0, maxY + 100]);
                    x.domain([0, maxX]);


                    //returns y-axis tickmark labels formatted correctly
                    var tickFormatterY = function (tickVal) {
                        if (tickVal < 1000) return tickVal;
                        return (tickVal / 1000 + "k");
                    };

                    var yValues = function () {
                        var yNums = [];
                        for (var i = 50; i <= maxY; i += interval/10) {
                            yNums.push(i);
                        }
                        return yNums;
                    };

                    let tickFormatterX = function (tickVal) {
                        return ukData[maxX - tickVal].date.substring(5, 10);
                    };

                    var xValues = function () {
                        var xNums = [];
                        for (var i = dateInterval; i <= maxX; i += dateInterval) {
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

                    // total case line - yellow
                    self.ukDeathLined = d3.area()
                            .curve(d3.curveCardinal) //makes the line curvy
                            .x(d => x(ukData.length - d.index))
                            .y(d => y(d.cumDeaths28DaysByDeathDate));


                    //newCase line - green
                    self.usDeathLined = d3.area()
                        .curve(d3.curveCardinal)//makes the line curvy
                        .x(d => x(ukData.length - d.index))
                        .y(d => y(d.usDeath));


                    let area = d3.area()
                        .curve(d3.curveCardinal) //makes the line curvy
                        .x(d => x(ukData.length - d.index))
                        .y1(d => y(d.usDeath))
                        .y0(d => y(d.cumDeaths28DaysByDeathDate))
                        ; //y1 makes the Imports line the baseline


                    /****//**END LINE AND AREA FOR DEFINED DATA****/


                    /*************************append all of the graphics to the canvas**************************************/


                    self.svg.datum(ukData); //binds data, makes static and not interactive

                    //bg color borrowed from former student
                    //makes inner graph lighter
                    self.svg.append("rect")
                        .attr("height", height)
                        .attr("width", width)
                        .attr("fill", "white")
                        .attr("opacity", .2);

                    /**DIFFERENCE GRAPH**/


                    self.svg.append("clipPath")
                        .attr("id", "clip-above-covid")
                        .append("path")
                        .attr("d", area.y0(0));

                    self.svg.append("clipPath")
                        .attr("id", "clip-below-covid")
                        .append("path")
                        .attr("d", area.y0(height));

                    self.areaGreen = self.svg.append("path")
                        .attr("clip-path", "url(#clip-above-covid)")
                        .attr("d", area.y0(d => y(d.cumDeaths28DaysByDeathDate)))
                        .style("fill", '#ABAF7B');

                    self.areaPink = self.svg.append("path")
                        .attr("class", "area below")
                        .attr("clip-path", "url(#clip-below-covid)")
                        .attr("d", area.y0(d => y(d.cumDeaths28DaysByDeathDate)))
                        .style("fill", '#E4AE95');

                    /**END DIFFERENCE GRAPH**/


                    self.svg.append("path")
                        .attr("class", "line")
                        .attr("d", self.ukDeathLined)
                        .style("stroke", '#D6BF24')
                        .style("stroke-width", "3px");

                    self.svg.append("path")
                        .attr("class", "line exports")
                        .attr("d", self.usDeathLined)
                        .style("stroke", '#BB877F')
                        .style("stroke-width", "3px");


                    //x axis
                    self.svg.append("g")
                        .attr("transform", "translate(0," + height + ")") //orients x-axis to bottom of chart (default is top)
                        .attr("class", "axis")
                        .style("font-size", 'large')
                        .style("font-family", "chancery_cursiveitalic")
                        .call(xAxis);

                    // "time" label
                    self.svg.append("text")
                        .attr("transform", "translate(" + (width / 2) + ")")
                        .attr("y", -7) //place label with correct space adjacent to graph
                        .attr("class", "axis-labels")
                        .style("text-anchor", "middle")
                        .style("font-family", 'Times New Roman')
                        .text("Time");

                    //y axis
                    self.svg.append("g")
                        .attr("transform", "translate(" + width + ",0)") //orients y-axis to right of chart (default is left)
                        .attr("class", "axis")
                        .call(yAxis);

                    //styles the grid lines based on y-axis values - integer million lines are bolded
                    self.svg.selectAll('g.tick line')
                        .style("stroke-width", function (d) {
                            if ((d / interval*2) % 1 === 0) {
                                return 2;
                            } else {
                                return 1;
                            }
                        })
                        .style("opacity", function (d) {
                            if ((d / interval*2) % 1 === 0)
                                return 0.4;
                            else
                                return 0.2;
                        });


                    //"case" label
                    self.moneyLabel = self.svg.append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 0 - margin.left) //place it with correct space adjacent to graph
                        .attr("x", 0 - (height / 2))
                        .attr("dy", "1em")
                        .attr("class", "axis-labels")
                        .style("font-family", 'Times New Roman')
                        .style("text-anchor", "middle")
                        .text("Cases per 1 Million People");


                    //outline around inner chart
                    self.svg.append("rect")
                        .attr("height", height)
                        .attr("width", width + margin.right)
                        .attr("fill", "transparent")
                        .attr("stroke", "black")
                        .attr("stroke-width", 2);

                    //)******************************************CREATE GRAPH LABEL - borrowed from former student*******//
                    var ellipseX = ((width * 3) / 15);
                    var ellipseY = 100;
                    let ellipseRX = 120;
                    let ellipseRY = 70;
                    var textX = ((width * 3) / 15) - 80;
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
                        .attr("font-size", "1.4em")
                        // .style("font-size", 'x-large')
                        .style("font-family", 'maranalloregular')
                        .text("Covid-19 Deaths");
                    self.title4 = self.svg.append("text")
                        .attr("id", "currValue")
                        .attr("class", "titleText2")
                        .attr("x", textX + 6)
                        .attr("y", textY + 30) //adjusts vertical space between text liens
                        .attr("font-size", "1.3em")
                        // .style("font-size", 'xx-large')
                        .style("font-family", 'chancery_cursiveitalic')
                        .text("a comparison between the");
                    self.title5 = self.svg.append("g")
                        .attr("id", "currValue")
                        .attr("class", "titleText3")
                        .attr("transform", "translate(55,0)")
                        .append("text")
                        .attr("x", (textX - 45))
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
                        .attr("transform", "translate(" + (width - 320/zoom - 250) + "," + (height - 250/zoom - 90) + ") rotate(" + (-5) + ")")
                        .attr("dy", ".35em")
                        .attr("text-anchor", "start")
                        // .attr("visibility","hidden")
                        .style("fill", "black")
                        .text("U.K. Deaths");
                    self.importText = self.svg.append("text")
                        .attr("transform", "translate(" + (width - 690/zoom - 130) + "," + (height - 55/zoom - 90) + ") rotate(" + (-11) + ")")
                        .attr("dy", ".35em")
                        .attr("text-anchor", "start")
                        .style("fill", "black")
                        .text("U.S. Deaths");


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
  .chartCovid{
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
