const data = [30, 86, 168, 281, 303, 365];

const width = 420;
const height = 20;

const chart = d3.select('.chart')
  .attr('width', width)
  .attr('height', height * data.length);

const svg =
  chart.selectAll('g')
    .data(data)
  .enter().append('g')
    .attr('transform', function (d, i) {
      return `translate(0, ${i * height})`;
    });
svg.append('rect')
  .attr('width', function (d) { return d; })
  .attr('height', height - 1);
svg.append('text')
  .attr('x', function(d) { return d - 3; })
  .attr('y', height / 2)
  .attr('dy', '.34em')
  .text(function(d) {
    return `$${d}`
  });
