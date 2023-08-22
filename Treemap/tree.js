// script.js
const datasetURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json';

// Fetch data and create treemap
d3.json(datasetURL).then(data => {
  const hierarchy = d3.hierarchy(data).sum(d => d.value);

  const treemapLayout = d3.treemap()
    .size([800, 600])
    .padding(1)(hierarchy);

  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  const svg = d3.select('#tree-map')
    .append('svg')
    .attr('width', 800)
    .attr('height', 600);

  svg.selectAll('rect')
    .data(treemapLayout.leaves())
    .enter()
    .append('rect')
    .attr('class', 'tile')
    .attr('data-name', d => d.data.name)
    .attr('data-category', d => d.data.category)
    .attr('data-value', d => d.data.value)
    .attr('x', d => d.x0)
    .attr('y', d => d.y0)
    .attr('width', d => d.x1 - d.x0)
    .attr('height', d => d.y1 - d.y0)
    .attr('fill', d => colorScale(d.data.category));

  // Create legend
  const legend = d3.select('#legend');

  legend.selectAll('.legend-item')
    .data(data.children.map(d => d.name))
    .enter()
    .append('div')
    .attr('class', 'legend-item')
    .style('background-color', (d, i) => colorScale(i))
    .text(d => d);
});
