var data = [30, 86, 168, 281, 303, 365];

d3.select(".chart")
  .selectAll("div")
  .data(data)
    .enter()
    .append("div")
    .style("width", function(d) { return d * 2 + "px"; })
    // .style("font", "10px sans-serif")
    // .style("background-color", "steelblue")
    // .style("text-align", "right")
    // .style("padding", "3px")
    // .style("margin", "1px")
    // .style("color", "white")
    .text(function(d) { return '$ ' + d; });