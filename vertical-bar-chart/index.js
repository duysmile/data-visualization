const data = [
  {name: "E", value: 0.12702},
  {name: "T", value: 0.09056},
  {name: "A", value: 0.08167},
  {name: "O", value: 0.07507},
  {name: "I", value: 0.06966},
  {name: "N", value: 0.06749},
  {name: "S", value: 0.06327},
  {name: "H", value: 0.06094},
  {name: "R", value: 0.05987},
  {name: "D", value: 0.04253},
  {name: "L", value: 0.04025},
  {name: "C", value: 0.02782},
  {name: "U", value: 0.02758},
  {name: "M", value: 0.02406},
  {name: "W", value: 0.0236},
  {name: "F", value: 0.02288},
  {name: "G", value: 0.02015},
  {name: "Y", value: 0.01974},
  {name: "P", value: 0.01929},
  {name: "B", value: 0.01492},
  {name: "V", value: 0.00978},
  {name: "K", value: 0.00772},
  {name: "J", value: 0.00153},
  {name: "X", value: 0.0015},
  {name: "Q", value: 0.00095},
  {name: "Z", value: 0.00074},
];

const margin = {
  top: 20,
  right: 30,
  bottom: 30,
  left: 50,
};
const height = 500 - margin.top - margin.bottom;
const width = 960 - margin.left - margin.right;

const x = d3.scaleBand()
  .rangeRound([0, width])
  .padding(0.1);

const y = d3.scaleLinear()
  .range([height, 0]);

const xAxis = d3.axisBottom()
  .scale(x);

const yAxis = d3.axisLeft()
  .scale(y);

const chart = d3.select('.chart')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
.append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

x.domain(data.map(function(d) {
  return d.name;
}));

y.domain([0, d3.max(data, function(d) { return d.value; })]);

const bar = chart.selectAll('.bar')
  .data(data)
  .enter()
.append('rect')
  .attr('class', 'bar')
  .attr('x', function(d) {
    return x(d.name);
  })
  .attr('y', function(d) {
    return y(d.value);
  })
  .attr('height', function(d) {
    return height - y(d.value);
  })
  .attr('width', x.bandwidth());

chart.append('g')
  .attr('class', 'x axis')
  .attr('transform', `translate(0, ${height})`)
  .call(xAxis)
.append('text')
  .attr('fill', 'black')
  .style('text-anchor', 'start')
  .attr('x', width - 5)
  .attr('y', 10)
  .text('Letters');

chart.append('g')
  .attr('class', 'y axis')
  .attr('transform', `translate(0, 0)`)
  .call(yAxis)
.append('text')
    // .attr('transform', 'rotate(-90)')
    .attr('y', -10)
    .attr('x', 0)
    .attr('dy', '.71em')
    .style('text-anchor', 'end')
    .attr('fill', 'black')
    .text('Frequency');