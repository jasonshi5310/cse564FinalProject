/* global d3 */
// This reuseable barChart is obtained from the following link
// https://raw.githubusercontent.com/john-guerra/d3BrushAndLinkingExample/master/js/barChart.js

var brushes = {
  "carrier-bar-plot-container": d3
                    .brushX()
                    .extent([
                    [0, 0],
                    [
                        370, //width - margin.right - margin.left,
                        280 //height - margin.bottom - margin.top
                    ]
                    ]),

  "Flight_Month-plot-container":d3
                    .brushX()
                    .extent([
                    [0, 0],
                    [
                        370, //width - margin.right - margin.left,
                        80 //height - margin.bottom - margin.top
                    ]
                    ]),
  "Flight_Day-plot-container":d3
                    .brushX()
                    .extent([
                    [0, 0],
                    [
                        370, //width - margin.right - margin.left,
                        80 //height - margin.bottom - margin.top
                    ]
                    ]),
  "Scheduled_Departure_Time-plot-container":d3
                    .brushX()
                    .extent([
                    [0, 0],
                    [
                        370, //width - margin.right - margin.left,
                        80 //height - margin.bottom - margin.top
                    ]
                    ]),
  "Dep_Wind_Speed_3-plot-container":d3
                    .brushX()
                    .extent([
                    [0, 0],
                    [
                        370, //width - margin.right - margin.left,
                        80 //height - margin.bottom - margin.top
                    ]
                    ]),
    "Dep_Temp_3-plot-container":d3
                    .brushX()
                    .extent([
                    [0, 0],
                    [
                        370, //width - margin.right - margin.left,
                        80 //height - margin.bottom - margin.top
                    ]
                    ]),
    "Dep_Clouds_3-plot-container":d3
                    .brushX()
                    .extent([
                    [0, 0],
                    [
                        370, //width - margin.right - margin.left,
                        80 //height - margin.bottom - margin.top
                    ]
                    ]),
    "Departure_Delay-plot-container":d3
                    .brushX()
                    .extent([
                    [0, 0],
                    [
                        370, //width - margin.right - margin.left,
                        80 //height - margin.bottom - margin.top
                    ]
                    ]),
                    "Lat_N-plot-container":d3
                    .brushX()
                    .extent([
                    [0, 0],
                    [
                        370, //width - margin.right - margin.left,
                        80 //height - margin.bottom - margin.top
                    ]
                    ]),
                    "Lng_W-plot-container":d3
                    .brushX()
                    .extent([
                    [0, 0],
                    [
                        370, //width - margin.right - margin.left,
                        80 //height - margin.bottom - margin.top
                    ]
                    ]),    
};
function barChart() {

    let margin = {top: 10, right: 20, bottom: 20, left: 30},
      width = 400,
      height = 400,
      isColored = false,
      isTemp = false,
      innerWidth = width - margin.left - margin.right,
      innerHeight = height - margin.top - margin.bottom,
      xValue = function(d) { return d[0]; },
      yValue = function(d) { return d[1]; },
      xScale = d3.scaleBand().padding(0.1),
      //xRangeBands = null,
      // this_data = [],
      // nbFt = 1;
      yScale = d3.scaleLinear(),
      onMouseOver = function () { },
      onMouseOut = function () { }
    //   area = d3
    //       .area()
    //       .x(X)
    //       .y1(Y),
      // brush = d3
      //     .brushX()
      //     .extent([
      //       [0, 0],
      //       [
      //         width - margin.right - margin.left,
      //         height - margin.bottom - margin.top
      //       ]
      //     ]),
      //brush = null;
       //brush = null,
          //.on("brush", brushended)
          //.on("end", brushended),
      onBrushed = function() {}
      ;
  
    function chart(selection) {
      selection.each(function (data) {
        // this_data = data;
        // nbFt = data.length;
        this_id = this.id;
        //console.log(this_id);
        //console.log(this_id);
        let brush = null;
        if (brushes[this_id] != undefined){
          brush = brushes[this_id]
          //console.log(this_id+"   "+data.length);
          brush.on("brush end", function() {
            let s = d3.event.selection || xScale.range();
            // let nbFt = this_data.length;
            // let innerWidth = 380;
            // let current_range = [Math.round(s[0] / (innerWidth/nbFt)), Math.round(s[1] / (innerWidth/nbFt))];
            //console.log(brush.extent())
            onBrushed(data, s);
          });
          //console.log(this_id);
        }
        // brush = brushes[this_id];
        // console.log(brush);
        
        // Select the svg element, if it exists.
        let svg = d3.select(this).selectAll("svg").data([data]);

        // Otherwise, create the skeletal chart.
        let svgEnter = svg.enter().append("svg");
        let gEnter = svgEnter.append("g");
        gEnter.append("g").attr("class", "x axis");
        gEnter.append("g").attr("class", "y axis");
        gEnter
          .append("g")
          .attr("class", "brush")
          .call(brush);
  
        innerWidth = width - margin.left - margin.right,
        innerHeight = height - margin.top - margin.bottom,
  
        // Update the outer dimensions.
        svg.merge(svgEnter).attr("width", width)
          .attr("height", height);
  
        // Update the inner dimensions.
        let g = svg.merge(svgEnter).select("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // console.log(typeof(xScale.rangeRound([0, innerWidth])));
        // console.log(typeof(xScale.range()));

        //((x-273.15)//5-3)
        

          xScale.rangeRound([0, innerWidth])
          .domain(data.map(xValue));
        
        yScale.rangeRound([innerHeight, 0])
          .domain([0, d3.max(data, yValue)]);
  
        if (isTemp){
          g.select(".x.axis")
          .attr("transform", "translate(0," + innerHeight + ")")
          .call(d3.axisBottom(xScale).tickFormat(function(d, i){ return (d+3)*5; }))
          ; // //((x-273.15)//5-3)
        }
        else {
          g.select(".x.axis")
          .attr("transform", "translate(0," + innerHeight + ")")
          .call(d3.axisBottom(xScale));
        }
      
  
        g.select(".y.axis")
            .call(d3.axisLeft(yScale).ticks(10))
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Frequency");
  
        let bars = g.selectAll(".bar")
          .data(function (d) { return d; });

        let barColor = ['lime','green','olive','purple','navy','fuchsia',
          'red', 'yellowgreen','teal', 'maroon', 'blue', 'aqua'];
  
        bars.enter().append("rect")
            .attr("class", "bar")
          .merge(bars)
            .attr("x", X)
            .attr("y", Y)
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) { return innerHeight - Y(d); })
            .attr("fill", function(d) {
                //console.log(d.key);
                if (isColored)
                    return barColor[Number(d.key)]
                else return "#66a61e";
            })
            .on("mouseover", onMouseOver)
            .on("mouseout", onMouseOut);
  
        //bars.exit().remove();
      });
  
    }
  
  // The x-accessor for the path generator; xScale ∘ xValue.
    function X(d) {
      return xScale(xValue(d));
    }
  
    // The y-accessor for the path generator; yScale ∘ yValue.
    function Y(d) {
      return yScale(yValue(d));
    }

    // function brushended() {
    //     // const selection = d3.event.selection;
    //     // if (!d3.event.sourceEvent || !selection) return;
    //     // const selectedTime = selection.map(d => xScale.invert(d));
    //     // onBrushed(selectedTime);
    //     let s = d3.event.selection || xScale.range();
    //     onBrushed(s, this.id);
    //     // let current_range = [Math.round(s[0] / (innerWidth/nbFt)), Math.round(s[1] / (innerWidth/nbFt))];
    //     //xScale.domain(data.slice(current_range[0], current_range[1]).map(ft => ft.id));
    //     // svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
    //     //     .scale(width / (current_range[1] - current_range[0]))
    //     //     .translate(-current_range[0], 0));
    //   }
  
    chart.margin = function(_) {
      if (!arguments.length) return margin;
      margin = _;
      return chart;
    };
  
    chart.width = function(_) {
      if (!arguments.length) return width;
      width = _;
      return chart;
    };
  
    chart.height = function(_) {
      if (!arguments.length) return height;
      height = _;
      return chart;
    };

    chart.isColored = function(_){
        if (!arguments.length) return isColored;
        isColored = _;
        return chart;
    };

    chart.isTemp = function(_){
      if (!arguments.length) return isTemp;
      isTemp = _;
      return chart;
  };

    chart.add_brush = function(new_brush, new_id){
      if (!arguments.length) return brushes;
      brushes[new_id] = new_brush;
      return chart;
    }
  
    chart.x = function(_) {
      if (!arguments.length) return xValue;
      xValue = _;
      return chart;
    };
  
    chart.y = function(_) {
      if (!arguments.length) return yValue;
      yValue = _;
      return chart;
    };
  
    chart.onMouseOver = function(_) {
      if (!arguments.length) return onMouseOver;
      onMouseOver = _;
      return chart;
    };
  
    chart.onMouseOut = function(_) {
      if (!arguments.length) return onMouseOut;
      onMouseOut = _;
      return chart;
    };

    chart.onBrushed = function(_) {
        if (!arguments.length) return onBrushed;
        onBrushed = _;
        return chart;
      };
    return chart;
  }
  
  
  