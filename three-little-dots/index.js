const data = [16, 36, 64, 100];

const svg = d3.select('svg');
const circle = svg.selectAll("circle")
    .data([32, 57, 293], function(d) { return d; });

circle.enter().append("circle")
    .attr("cy", 30)
    .attr("cx", function(d, i) { return i * 100 + 30; })
    .attr("r", function(d) { return Math.sqrt(d); });

circle.exit().remove();
