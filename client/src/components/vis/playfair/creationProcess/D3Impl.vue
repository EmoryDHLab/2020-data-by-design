<template>
  <div class="container">
    <div id="chart" style="background-color: #F3ECCB; font-family: 'Dancing Script', cursive"></div>

  </div>
</template>

<script>
    import * as d3 from "d3";
    import Visualization from "../../../../mixins/vis/Visualization";

    export default {
        name: "d3Impl",
        mixins: [Visualization()],
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
                importLined: null, exportLined: null,
                exportText: null, importText: null, yLabel: null, xLabel: null, moneyLabel: null,
                timeLabel: null, importLine: null, exportLine: null,
                importLine1801d: null, exportLine1801d: null, importLineFirstDraft: null, exportLineFirstDraft: null,
                areaGreen: null, areaPink: null,
                importDots: null, exportDots: null,
                title1: null, title2: null, title3: null, title4: null, title5: null,
            }
        },
        watch: {
            slideNumber (newValue) {
                // console.log(this.slideNumber);
                if (this.slideNumber === 1) {
                    this.changeOpacity(this.xLabel);
                    this.changeOpacity(this.timeLabel);
                } else if (this.slideNumber === 2) {
                    this.changeOpacity(this.yLabel);
                    this.changeOpacity(this.moneyLabel);
                } else if (this.slideNumber === 3) {
                    this.changeOpacity(this.importText);
                    this.changeOpacity(this.importLineFirstDraft);
                } else if (this.slideNumber === 4) {
                    this.changeOpacity(this.exportText);
                    this.changeOpacity(this.exportLineFirstDraft);
                } else if (this.slideNumber === 5) {
                    this.importLineFirstDraft.transition()
                        .attr("d", this.importLine1801d)
                        .attr("transform", "")
                        .duration(800);
                    this.exportLineFirstDraft.transition()
                        .attr("d", this.exportLine1801d)
                        .attr("transform", "")
                        .duration(800);
                } else if (this.slideNumber === 6) {
                    this.importLineFirstDraft.transition()
                        .attr("d", this.importLined)
                        .attr("transform", "")
                        .attr("opacity", 1)
                        .duration(800);

                    this.exportLineFirstDraft.transition()
                        .attr("d", this.exportLined)
                        .attr("opacity", 1)
                        .attr("transform", "")
                        .duration(800);

                    this.changeOpacityBack(this.areaPink);
                    this.changeOpacityBack(this.areaGreen);
                } else if (this.slideNumber === 7) {
                    this.exportLineFirstDraft.transition()
                        .style("stroke", '#BB877F')
                        .duration(800);
                    this.importLineFirstDraft.transition()
                        .style("stroke", '#D6BF24')
                        .duration(800);
                    this.changeOpacity(this.areaGreen);
                    this.changeOpacity(this.areaPink)
                } else if (this.slideNumber === 8) {
                    this.changeOpacity(this.title1);
                    this.changeOpacity(this.title3);
                    this.changeOpacity(this.title4);
                    this.changeOpacity(this.title5);
                    this.changeOpacityBack(this.importDots);
                    this.changeOpacityBack(this.exportDots);
                } else if (this.slideNumber === 9) {
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
            changeOpacityBack(element) {
                element.transition()
                    .attr("opacity", 0)
                    .duration(800);
            },
            generateSvg() {
                let self = this;
                let zoom = 3;
                let margin = {top: 25, right: 60, bottom: 25, left: 25},
                    width = window.innerWidth/zoom/0.77 - margin.left - margin.right,
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


                d3.csv("/playfair_nums_def.csv").then(function (csvData) {
                    csvData.forEach(function (d) {
                        d.Imports = +d.Imports; //ensures data is in number format
                        d.Exports = +d.Exports;
                        d.Imports1801 = +d.Imports1801;
                        d.Exports1801 = +d.Exports1801;
                        d.ImportsDraft = +d.ImportsDraft;
                        d.ExportsDraft = +d.ExportsDraft;
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

                    //line & exportLined are area svg for the difference graph (ow would be line svg)

                    /****LINE AND AREA FOR DEFINED DATA****/

                        //imports line - yellow
                        //TODO: curve format -> not basis
                    self.importLined = d3.area()
                            .curve(d3.curveCardinal) //makes the line curvy
                            .defined(function (d) {
                                return d.Imports;
                            }) //limits this line to defined data
                            .x(d => x(d.Years))
                            .y(d => y(d.Imports));

                    self.importLine1801d = d3.area()
                        .curve(d3.curveCatmullRom) //makes the line curvy
                        .defined(function (d) {
                            return d.Imports1801;
                        }) //limits this line to defined data
                        .x(d => x(d.Years))
                        .y(d => y(d.Imports1801));

                    self.exportLine1801d = d3.area()
                        .curve(d3.curveCatmullRom) //makes the line curvy
                        .defined(function (d) {
                            return d.Exports1801;
                        }) //limits this line to defined data
                        .x(d => x(d.Years))
                        .y(d => y(d.Exports1801));

                    var importDraftd = d3.area()
                        .curve(d3.curveCatmullRom) //makes the line curvy
                        .defined(function (d) {
                            return d.ImportsDraft;
                        }) //limits this line to defined data
                        .x(d => x(d.Years))
                        .y(d => y(d.ImportsDraft));

                    var exportDraftd = d3.area()
                        .curve(d3.curveCatmullRom) //makes the line curvy
                        .defined(function (d) {
                            return d.ExportsDraft;
                        }) //limits this line to defined data
                        .x(d => x(d.Years))
                        .y(d => y(d.ExportsDraft));

                    //exports line - pink
                    self.exportLined = d3.area()
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
                        .attr("d", self.importLined)
                        .attr("opacity", 0)
                        .style("stroke", '#D6BF24')
                        .style("stroke-width", "3px");

                    //line exports
                    self.exportLine = self.svg.append("path")
                        .attr("class", "line exports")
                        .attr("d", self.exportLined)
                        .attr("opacity", 0)
                        .style("stroke", '#BB877F')
                        .style("stroke-width", "3px");

                    self.importLine1801 = self.svg.append("path")
                        .attr("opacity", 0)
                        .attr("fill", "none")
                        // .attr("transform", "translate(-98 80),scale(0.415 0.5)")
                        // .attr("d", "M231.7,391.73c94.31,4.3,204-24.91,285.67-36.19,119.35-7.78,202.15-10.18,299.7-19.67,124.29-16.83,75.32-.65,147-55,42.66-21,82.8-4,107.2-50.52C1091.4,208.53,1089,316,1090.2,325.9c-4,47.62,2,104.09,46.1,77.6,31-22.77,32.66-64.15,57.33-102.57,4.6-11.62,23.86-30.53,26.91-34.35C1236.35,208,1285,194,1282.3,195.5c20.61-9.31,34.26-20.84,64-21")
                        .attr("d", self.importLine1801d)
                        .style("stroke", '#D6BF24')
                        .style("stroke-width", "3px");

                    self.exportLine1801 = self.svg.append("path")
                        .attr("opacity", 0)
                        .attr("fill", "none")
                        .attr("d", self.exportLine1801d)
                        // .attr("transform", "translate(0 40),scale(0.415 0.5)")
                        // .attr("d", "M0,494.6c14.42-.08,51.38-3.28,96-11,15.77-2.72,31.82.35,51,1,33.56,1.15,72.14,1.3,103-4,47.07-12.5,59.13-13.39,66-14,5.54-.48,7.2,5.24,50,1.89l.3-.31s46.24-10.85,51.14-11.7l32.86-4.66C738.4,375.32,745.24,108.14,760,94.65c8.55-50.73,25.3-58.59,32-51.89,7.59,\n" +
                        //     "7.59,2,28.53,4,40,6.7,39.29,8.84,82.09,4.44\n" +
                        //     ",122-.88,8-.64,51.32,6.48,51.32,14.83,9.15,15.31-47.18,\n" +
                        //     "18.46-72.46.55-4.37.32-25.35,7.73-25.35l1.84.76,3.78,43.8c3.82,95.74-11.16,136.71,3.83,136.71,18,4.24,9.29-23.55,24.06-22l.3.61c5.21,5.9,5.69,55.47,12.14,55.47,8.35-5.43,\n" +
                        //     "9.06-23.89,12.66-48.12,4.83-19.66,25.28-16.56,42.38-42.29,16.32-13.43,17.77-12.55,26-21.59,6-14.6,10.52-34.73,16.48-49.33,7-23.41,12.29-45.21,18.16-68.74C997,134,1012.24,68.71,1020,69.94c14.6-.62,8.47,42.11,22.49,42.11l14.88-28.28C1065,73.07,1109,15.23,1109,3.65l5.14-2.77")
                        .style("stroke", '#BB877F')
                        .style("stroke-width", "3px");


                    self.importLineFirstDraft = self.svg.append("path")
                        .attr("opacity", 0)
                        .attr("fill", "none")
                        // .attr("transform", "translate(0 195),scale(1.1 1.1)")
                        // .attr("d", "M.17,74.54a78.58,78.58,0,0,1,13.44-1,94.5,94.5,0,0,0,9.6-.48c4.7-.62,9.83-.69,13.92-1.92,9.87-3,13-3.84,11.52-3.84,1.11-1.14,6.69,1,10.08-1,3-1.73,8.15-1.29,9.9-1.29,1.69-.38,6.24.48,7.38.33,8.4-3.23,9.36-1.12,13.44-1.92,5-1,13.08-2.59,18.24-2.88,24.56-1.39,20.84-5,34.08-7.2,6.89-1.16,15,.31,22.56-1,4.1,0,5.8-1.89,8.64-1.92,10.37-.12,16.76,2.66,24.48,1.92,4.36-.42,3.05-1.26,11-3.36,1.62-.43,5.24.26,9.12-.48s8.15-3,10.56-3.36c8.71-.56,17.49-.54,24.48-2.88,3.1-2.07,5-3.7,8.16-5.76,7.56-2.33,17.15-3.13,24.42-16.71,7.79-2.9,14.07-1.38,21.11-2.06-1.85.36-2.57,1.12,2.17-2.26l2.7-13.16c-.56.1,2.89-15.11,5.76,51.47,0,2.22-1.46,17.27,1.06,17.82,4.81,0,10.68.42,16.22.42")
                        .attr("d", importDraftd)
                        .style("stroke", '#616161')
                        .style("stroke-width", "3px");

                    self.exportLineFirstDraft = self.svg.append("path")
                        .attr("opacity", 0)
                        .attr("fill", "none")
                        .attr("d", exportDraftd)
                        // .attr("transform", "translate(0 80),scale(1.1 1.1)")
                        // .attr("d", "M.48,185.37l1-.57c42.4,1,27.21-2.06,36.42-1.67,7.73.33,14.2-2.16,14.2-2.72a87.51,87.51,0,0,0,18.71-1.76c3.21-.64,9,2.45,13.92,0,9.61-4.76,18.7-.93,26.4-3.84,7.15-2.7,13,.21,15.84-3.36,3.45-4.32,8.49-2.4,9.12-2.4,4.91-5,8.62-4.33,19.2-2.88,7.88-1.39,12.09,1.22,16.92,1.22l.55.17c5.42.83,8.6.09,22.37-6.19,5-2.28,6.73-7.57,10.48-7.72,13.12-.49,21.39-10.94,22.17-11.33.75-1.53,7.74-7.1,11-11.67s5-6.24,6.24-6.24c0,0,4.23-11.53,7.71-11.53,2.5-2.94,4.93-5.13,5.73-8.63,1.35-5.92,2.19-10.71,6.24-14.88C267.05,87,265.9,79,268.83,75.79c0-2.28,1.28-10.58,2.58-10.58,5-22.82,12.62-16.2,6.51-15.86v.15c.28-4.92,2.54-13.33,1.72-15.33,2.39-9.51,3.9-18.46,\n" +
                        //     "6.3-28,.85-1.73,1.7-3.47,2.56-5.2,1.87,0,5.73,1,7.46,1,2.37,21.54,1,24.06,3.36,45.6,0,2.15,2.94,33.94,5.15,38.48,3.69,0,3-10.86,3-13,0-7.63-2.57-39.12,1-42.75.81-10,1.64,93.48,4.28,117.63.52,4.78,3.55-2.75,4.34-3.4,1.34-20.74,4.94-34.22,5.17-31,4,55.38,6.28,4.4,11.88,2\n")
                        .style("stroke", '#616161')
                        .style("stroke-width", "3px");

                    //import dots
                    self.importDots = self.svg.selectAll("dot")
                        .data(csvData)
                        .enter().append("circle")
                        .attr("r", 2)
                        .attr("fill", "#616161")
                        .attr("cx", function (d) {
                            if (d.Years >= 1770 && d.Years <= 1782) {
                                return x(d.Years);
                            }
                        })
                        .attr("cy", function (d) {
                            return y(d.Imports);
                        })
                        .attr("opacity", 0);

                    //export dots
                    self.exportDots = self.svg.selectAll("dot")
                        .data(csvData)
                        .enter().append("circle")
                        .attr("r", 2)
                        .attr("fill", "#616161")
                        .attr("cx", function (d) {
                            if (d.Years >= 1770 && d.Years <= 1782) {
                                return x(d.Years);
                            }
                        })
                        .attr("cy", function (d) {
                            return y(d.Exports);
                        })
                        .attr("opacity", 0);

                    //x axis
                    self.xLabel = self.svg.append("g")
                        .attr("transform", "translate(0," + height + ")") //orients x-axis to bottom of chart (default is top)
                        .attr("class", "axis")
                        .attr("opacity", 0)
                        .style("font-size", 'large')
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
                    let ellipseRX = 110;
                    let ellipseRY = 70;
                    var textX = ellipseX - ellipseRX/6*5;
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
                        .attr("font-size", "1.1em")
                        // .style("font-size", 'x-large')
                        .style("font-family", 'maranalloregular')
                        .text("EXPORTS & IMPORTS");
                    self.title4 = self.svg.append("text")
                        .attr("id", "currValue")
                        .attr("class", "titleText2")
                        .attr("x", textX + 60)
                        .attr("y", textY + 27) //adjusts vertical space between text liens
                        .attr("opacity", 0)
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
                        .attr("y", (textY + 55)).attr("opacity", 0)
                        .attr("font-size", "1.3em")
                        // .style("font-size", 'xx-large')
                        .style("font-family", 'maranalloregular')
                        .style("position", 'fixed')
                        .style("border-left", '75px')
                        .style("border-top", '100px')
                        .text("NORTH AMERICA");


                    // add line labels
                    self.exportText = self.svg.append("text")
                        .attr("transform", "translate(" + (width*0.6) + "," + (height*0.6) + ") rotate(" + (-65) + ")")
                        .attr("dy", ".35em")
                        .attr("text-anchor", "start")
                        // .attr("visibility","hidden")
                        .attr("opacity", 0)
                        .style("fill", "black")
                        .text("Line of Exports");
                    self.importText = self.svg.append("text")
                        .attr("transform", "translate(" + (width*0.25) + "," + (height*0.87) + ") rotate(" + (-11) + ")")
                        .attr("dy", ".35em")
                        .attr("text-anchor", "start")
                        .attr("opacity", 0)
                        .style("fill", "black")
                        .text("Line of Imports");


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
