<template>
  <div class="container">
    <div id="chart" style="background-color: #F3ECCB; font-family: 'Dancing Script', cursive"></div>
    Some Math can go here
  </div>
</template>

<script>
    import * as d3 from "d3";

    export default {
        name: "d3Impl",
        mounted() {
            this.generateSvg();
        },
        props: {
            slideNumber: {
                type: Number,
                default: 0,
            },
        },
        data () {
            return {
                maxSlideNumber: 8,
                svg: null,
                exportText: null, importText: null, yLabel: null, xLabel: null, moneyLabel: null,
                timeLabel: null, importLine: null, exportLine: null, areaGreen: null, areaPink: null,
                importDots: null, exportDots: null,
                title1: null, title2: null, title3: null, title4: null, title5: null,
            }
        },
        watch: {
            slideNumber (newValue) {
                console.log(this.slideNumber);
                if (this.slideNumber === 1) {
                    this.changeOpacity(this.xLabel);
                    this.changeOpacity(this.timeLabel);
                } else if (this.slideNumber === 2) {
                    this.changeOpacity(this.yLabel);
                    this.changeOpacity(this.moneyLabel);
                } else if (this.slideNumber === 3) {
                    //bumpy line
                } else if (this.slideNumber === 4) {
                    this.changeOpacity(this.importLine);
                    this.changeOpacity(this.importText)
                } else if (this.slideNumber === 5) {
                    this.changeOpacity(this.exportLine);
                    this.changeOpacity(this.exportText);
                } else if (this.slideNumber === 6) {
                    this.changeOpacity(this.areaGreen);
                    this.changeOpacity(this.areaPink)
                } else if (this.slideNumber === 7) {
                    this.changeOpacity(this.title1);
                    this.changeOpacity(this.title3);
                    this.changeOpacity(this.title4);
                    this.changeOpacity(this.title5);
                } else if (this.slideNumber === 8) {
                    //data + line adjust
                    this.changeOpacity(this.importDots);
                    this.changeOpacity(this.exportDots);
                }
            }
        },
        methods: {
            changeOpacity(element) {
                element.transition()
                    .attr("opacity", 1)
                    .duration(800);
            },
            generateSvg() {
                let self = this;
                let zoom = 3;
                let margin = {top: 25, right: 60, bottom: 25, left: 25},
                    width = window.innerWidth/zoom - margin.left - margin.right,
                    height = window.innerWidth/zoom/1.6 - margin.top - margin.bottom;


                //scales
                //"D3's time scale is an extension of d3.scale.linear that uses JavaScript Date objects as the domain representation.
                //Thus, unlike the normal linear scale, domain values are coerced to dates rather than numbers;"
                //https://github.com/mbostock/d3/wiki/Time-Scales
                var x = d3.scaleTime()
                    .range([0, width]);

                var y = d3.scaleLinear()
                    .range([height, 0]);

                self.svg = d3.select("#chart").append("svg")
                    .attr("class", "chart")
                    .attr("width", width + margin.left + margin.right+25)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                var interval = 200000;

                let exportText, importText, yLabel, moneyLabel,
                    timeLabel, importLine, exportLine, areaGreen, areaPink,
                    importDots, exportDots;
                let title1, title2, title3, title4, title5;

                d3.csv("/playfair_nums_def.csv").then(function (csvData) {
                    csvData.forEach(function (d) {
                        d.Imports = +d.Imports; //ensures data is in number format
                        d.Exports = +d.Exports;
                    });

                    //calculate values to determine y domain
                    var maxImport = d3.max(csvData, function (d) {
                        return d.Imports
                    });
                    var maxExport = d3.max(csvData, function (d) {
                        return d.Exports
                    });
                    var minImport = d3.min(csvData, function (d) {
                        return d.Imports
                    });
                    var minExport = d3.min(csvData, function (d) {
                        return d.Exports
                    });

                    var firstYr = d3.min(csvData, function (d) {
                        return d.Years
                    });
                    var lastYr = d3.max(csvData, function (d) {
                        return d.Years
                    });

                    var maxY = Math.max(maxImport, maxExport + 1000000);


                    //extent is the equivalent of calling min and max simultaneously
                    x.domain(d3.extent(csvData, function (d) {
                        return (d.Years);
                    }));

                    //pick y domain based on smallest and largest number of combined import and export numbers + yInterval for more space
                    y.domain([0, maxY + interval]);


                    //returns y-axis tickmark labels formatted correctly
                    var tickFormatterY = function (tickVal) {
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
                    var yValues = function () {
                        var yNums = [];
                        for (var i = interval; i <= maxY; i += interval) {
                            yNums.push(i);
                        }
                        return yNums;
                    };

                    //x-axis
                    var xAxis = d3.axisBottom(x)
                        .tickSizeInner(-height) //background grid, vertical lines
                        .tickSizeOuter([0])
                        // .tickFormat(tickFormatterX)
                        .tickFormat(d3.format("d")); //removes comma from year

                    //y-axis
                    var yAxis = d3.axisRight(y)
                        .tickValues(yValues()) //override default values created by d3
                        .tickSizeInner(-width) //background grid, horizontal lines
                        .tickSizeOuter([0])
                        .tickFormat(tickFormatterY); //calls custom format function

                    //line & line2 are area svg for the difference graph (ow would be line svg)

                    /****LINE AND AREA FOR DEFINED DATA****/

                        //imports line - yellow
                        //TODO: curve format -> not basis
                    var line = d3.area()
                            .curve(d3.curveCardinal) //makes the line curvy
                            .defined(function (d) {
                                return d.Imports;
                            }) //limits this line to defined data
                            .x(d => x(d.Years))
                            .y(d => y(d.Imports));

                    //exports line - pink
                    var line2 = d3.area()
                        .curve(d3.curveCardinal)//makes the line curvy
                        .defined(function (d) {
                            return d.Exports;
                        }) //limits this line to defined data
                        .x(d => x(d.Years))
                        .y(d => y(d.Exports));

                    var area = d3.area()
                        .curve(d3.curveCardinal) //makes the line curvy
                        .defined(function (d) {
                            return d.Imports;
                        }) //limits this area to defined area
                        .x(function (d) {
                            return x(d.Years)
                        })
                        .y1(function (d) {
                            return y(d.Imports)
                        }); //y1 makes the Imports line the baseline


                    /****//**END LINE AND AREA FOR DEFINED DATA****/


                    /****LINE AND AREA FOR UNDEFINED DATA****/

                        //imports line - dashed yellow
                    var lineUndefined = d3.line()
                            .curve(d3.curveCardinal) //makes the line curvy
                            .defined(function (d) {
                                console.log(d.critical);
                                return d.critical;
                            }) //returns the data to make the undefined, dashed line
                            .x(d => x(d.Years))
                            .y(d => y(d.Imports));

                    //exports line - dashed pink
                    var lineUndefined2 = d3.line()
                        .curve(d3.curveCardinal) //makes the line curvy
                        .defined(d => d.critical)
                        .x(d => x(d.Years))
                        .y(d => y(d.Exports));

                    var areaUndefined = d3.area()
                        .curve(d3.curveCardinal) //makes the line curvy
                        .defined(d => d.critical) //returns the critical data to limit to undefined area
                        .x(d => x(d.Years)) //years are only the critical years
                        .y1(d => y(d.Imports)); //y1 makes the Imports line the baseline, these imports are only the critical point imports


                    /*************************append all of the graphics to the canvas**************************************/


                    self.svg.datum(csvData); //binds data, makes static and not interactive

                    //bg color borrowed from former student
                    //makes inner graph lighter
                    self.svg.append("rect")
                        .attr("height", height)
                        .attr("width", width)
                        .attr("fill", "white")
                        .attr("opacity", .2);


                    //import dots
                    self.importDots = self.svg.selectAll("dot")
                        .data(csvData)
                        .enter().append("circle")
                        .attr("r", 3)
                        .attr("fill", "#D6BF24")
                        .attr("cx", function (d) {
                            return x(d.Years);
                        })
                        .attr("cy", function (d) {
                            return y(d.Imports);
                        })
                        .attr("opacity", 0);

                    //export dots
                    self.exportDots = self.svg.selectAll("dot")
                        .data(csvData)
                        .enter().append("circle")
                        .attr("r", 3)
                        .attr("fill", "#BB877F")
                        .attr("cx", function (d) {
                            return x(d.Years);
                        })
                        .attr("cy", function (d) {
                            return y(d.Exports);
                        })
                        .attr("opacity", 0);

                    /**DIFFERENCE GRAPH**/

                    //clip path area above imports line
                    self.svg.append("clipPath")
                        .attr("id", "clip-above")
                        .append("path")
                        .attr("d", area.y0(0));

                    // area below the imports line
                    self.svg.append("clipPath")
                        .attr("id", "clip-below")
                        .append("path")
                        .attr("d", area.y0(height));

                    self.areaGreen = self.svg.append("path")
                        // .attr("class", "area above")
                        .attr("clip-path", "url(#clip-above)")
                        .attr("d", area.y0(d => y(d.Exports)))
                        .attr("opacity", 0)
                        .style("fill", '#ABAF7B');

                    self.areaPink = self.svg.append("path")
                        .attr("class", "area below")
                        .attr("clip-path", "url(#clip-below)")
                        .attr("d", area.y0(d => y(d.Exports)))
                        .attr("opacity", 0)
                        .style("fill", '#E4AE95');

                    /**END DIFFERENCE GRAPH**/


                    //line imports
                    self.importLine = self.svg.append("path")
                        .attr("class", "line")
                        .attr("d", line).attr("opacity", 0)
                        .style("stroke", '#D6BF24')
                        .style("stroke-width", "5px");

                    //line exports
                    self.exportLine = self.svg.append("path")
                        .attr("class", "line exports")
                        .attr("d", line2).attr("opacity", 0)
                        .style("stroke", '#BB877F')
                        .style("stroke-width", "5px");

                    //x axis
                    self.xLabel = self.svg.append("g")
                        .attr("transform", "translate(0," + height + ")") //orients x-axis to bottom of chart (default is top)
                        .attr("class", "axis")
                        .attr("opacity", 0)
                        .style("font-sie", 'large')
                        .style("font-family", "chancery_cursiveitalic")
                        .call(xAxis);

                    // "time" label
                    self.timeLabel = self.svg.append("text")
                        .attr("transform", "translate(" + (width / 2) + ")")
                        .attr("y", -7) //place label with correct space adjacent to graph
                        .attr("class", "axis-labels").attr("opacity", 0)
                        .style("text-anchor", "middle")
                        .style("font-family", 'Times New Roman')
                        .text("Time");

                    //y axis
                    self.yLabel = self.svg.append("g")
                        .attr("transform", "translate(" + width + ",0)") //orients y-axis to right of chart (default is left)
                        .attr("class", "axis").attr("opacity", 0)
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


                    //"money" label
                    self.moneyLabel = self.svg.append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 0 - margin.left) //place it with correct space adjacent to graph
                        .attr("x", 0 - (height / 2))
                        .attr("dy", "1em")
                        .attr("class", "axis-labels").attr("opacity", 0)
                        .style("font-family", 'Times New Roman')
                        .style("text-anchor", "middle")
                        .text("Money");


                    //outline around inner chart
                    self.svg.append("rect")
                        .attr("height", height)
                        .attr("width", width + margin.right)
                        .attr("fill", "transparent")
                        .attr("stroke", "black")
                        .attr("stroke-width", 2);

                    //)******************************************CREATE GRAPH LABEL - borrowed from former student*******//
                    var ellipseX = ((width * 3) / 10);
                    var ellipseY = 110;
                    let ellipseRX = 120;
                    let ellipseRY = 80;
                    var textX = ((width * 2) / 15) - 30;
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
                        .attr("stroke-width", 1).attr("opacity", 0);
                    self.title2 = self.svg.append("ellipse")
                        .attr("id", "currValue")
                        .attr("cx", ellipseX)
                        .attr("cy", ellipseY)
                        .attr("rx", ellipseRX)
                        .attr("ry", ellipseRY)
                        .attr("fill", "#FF4F4F")
                        .attr("stroke-width", 0).attr("opacity", 0);
                    self.title3 = self.svg.append("text")
                        .attr("id", "currValue")
                        .attr("class", "titleText")
                        .attr("x", textX)
                        .attr("y", textY).attr("opacity", 0)
                        .attr("font-size", "1.25em")
                        // .style("font-size", 'x-large')
                        .style("font-family", 'maranalloregular')
                        .text("EXPORTS & IMPORTS");
                    self.title4 = self.svg.append("text")
                        .attr("id", "currValue")
                        .attr("class", "titleText2")
                        .attr("x", textX + 60)
                        .attr("y", textY + 30) //adjusts vertical space between text liens
                        .attr("opacity", 0)
                        .attr("font-size", "1.5em")
                        // .style("font-size", 'xx-large')
                        .style("font-family", 'chancery_cursiveitalic')
                        .text("to and from all");
                    self.title5 = self.svg.append("g")
                        .attr("id", "currValue")
                        .attr("class", "titleText3")
                        .attr("transform", "translate(55,0)")
                        .append("text")
                        .attr("x", (textX - 50))
                        .attr("y", (textY + 60)).attr("opacity", 0)
                        .attr("font-size", "1.5em")
                        // .style("font-size", 'xx-large')
                        .style("font-family", 'maranalloregular')
                        .style("position", 'fixed')
                        .style("border-left", '75px')
                        .style("border-top", '100px')
                        .text("NORTH AMERICA");


                    // add line labels
                    self.exportText = self.svg.append("text")
                        .attr("transform", "translate(" + (width - 320/zoom - 100) + "," + (height - 250/zoom) + ") rotate(" + (-75) + ")")
                        .attr("dy", ".35em")
                        .attr("text-anchor", "start")
                        // .attr("visibility","hidden")
                        .attr("opacity", 0)
                        .style("fill", "black")
                        .text("Line of Exports");
                    self.importText = self.svg.append("text")
                        .attr("transform", "translate(" + (width - 690/zoom - 120) + "," + (height - 55/zoom - 20) + ") rotate(" + (-11) + ")")
                        .attr("dy", ".35em")
                        .attr("text-anchor", "start")
                        .attr("opacity", 0)
                        .style("fill", "black")
                        .text("Line of Imports");


                });

                let stage = 0;
                d3.select("#chart").on("click", function () {
                    // console.log();
                    if (stage === 0) {
                        self.changeOpacity(self.xLabel);
                        self.changeOpacity(timeLabel);
                    } else if (stage === 1) {
                        self.changeOpacity(yLabel);
                        self.changeOpacity(moneyLabel);
                    } else if (stage === 2) {
                        //bumpy line
                    } else if (self.slideNumber === 3) {
                        self.changeOpacity(importLine);
                        self.changeOpacity(importText)
                    } else if (stage === 4) {
                        self.changeOpacity(exportLine);
                        self.changeOpacity(exportText);
                    } else if (stage === 5) {
                        self.changeOpacity(areaGreen);
                        self.changeOpacity(areaPink)
                    } else if (stage === 6) {
                        self.changeOpacity(title1);
                        title2.transition()
                            .attr("opacity", .1)
                            .duration(800);
                        self.changeOpacity(title3);
                        self.changeOpacity(title4);
                        self.changeOpacity(title5);
                    } else if (stage === 7) {
                        //data + line adjust
                        self.changeOpacity(importDots);
                        self.changeOpacity(exportDots);
                    }
                    //missing data
                    if (stage < 7) stage++;
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
  .chart{
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

  .area.above { fill: #ABAF7B; } /*green fill*/
  .area.below { fill: #E4AE95; } /*pink fill*/
  .line {
    /*  fill: none;
    */
    stroke: #D6BF24; /*yellow line*/
    stroke-width: 5px;
  }

  .exports{
    stroke: #BB877F; /*pink line*/
    stroke-width: 5px; /*added after doing undefined work*/

  }

  .tick line{
    opacity: 0.2;
    stroke-width: 1px;
  }

  .boldline{
    opacity: 1;
    stroke-width: 10px;
  }

  .area-undefined{
    fill:gray;
    /*  stroke:black;
  stroke-width: .5px;*/
  }

  /*from undefined line example*/
  /*.area {
      fill: gray;
      stroke: none;
  }*/
  .line-undefined {
    stroke-dasharray: 3px;
  }
  /**/

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