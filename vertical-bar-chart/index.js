const margin = {
  top: 20,
  right: 30,
  bottom: 30,
  left: 50,
};
const height = 500 - margin.top - margin.bottom;
const width = 1200 - margin.left - margin.right;

const tooltip = d3.select('body')
  .append('div')
  .style('opacity', '0')
  .attr('id', 'tooltip');

const overlay = d3.select('body')
  .append('div')
  .style('opacity', '0')
  .attr('id', 'overlay');

const x = d3.scaleTime()
  .range([0, width]);

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

d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json')
  .then(function (res) {
    const data = res.data.map(function(d) {
      return {
        name: d[0],
        value: d[1],
      };
    });

    const barWidth = width / res.data.length;

    const yearDates = res.data.map(function(d) {
      return new Date(d[0]);
    });

    const xMax = new Date(d3.max(yearDates));
    x.domain([d3.min(yearDates), xMax]);

    y.domain([0, d3.max(data, function (d) { return d.value; })]);

    chart.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', function (d, i) {
        return x(yearDates[i]);
      })
      .attr('y', function (d) {
        return y(d.value);
      })
      .attr('height', function (d) {
        return height - y(d.value);
      })
      .attr('width', barWidth)
      .attr('data-date', function(d) {
        return d.name;
      })
      .attr('data-gdp', function(d) {
        return d.value;
      })
      .on('mouseover', function (d, i) {
        tooltip.transition()
          .duration(200)
          .style('opacity', '0.9');
        tooltip.html(`${d.name}: ${d.value}`)
          .attr('data-date', d.name)
          .style('left', `${(i * barWidth) + 60}px`)
          .style('top', height - 100 + 'px')
          .style('transform', 'translateX(60px)');

        overlay.transition()
          .duration(0)
          .style('opacity', 0.9);
        console.log(`${i * barWidth}0px`)
        overlay
          .style('top', `${y(d.value) + margin.top + 40}px`)
          .style('left', `${i * barWidth}px`)
          .style('width', `${barWidth}px`)
          .style('transform', `translateX(${margin.left + 3.8}px)`)
          .style('height', `${height - y(d.value)}px`);
      })
      .on('mouseout', function (d) {
        tooltip.transition()
          .duration(200)
          .style('opacity', '0');
        overlay.transition()
          .duration(200)
          .style('opacity', '0');
      });

    chart.append('g')
      .attr('id', 'x-axis')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

    chart.append('g')
      .attr('id', 'y-axis')
      .attr('class', 'y axis')
      .attr('transform', `translate(0, 0)`)
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 20)
      .attr('x', -60)
      .attr('dy', '.71em')
      .style('font-size', '20px')
      .style('text-anchor', 'end')
      .attr('fill', 'black')
      .text('Gross Domestic Product');
  });
