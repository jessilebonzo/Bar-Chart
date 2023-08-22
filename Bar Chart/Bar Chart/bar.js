d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
  .then(data => {
    const dataset = data.data;

    // Set up the chart dimensions
    const margin = { top: 20, right: 20, bottom: 60, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create the SVG element
    const svg = d3.select('#chart')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Define the scales
    const xScale = d3.scaleTime()
      .domain([new Date(dataset[0][0]), new Date(dataset[dataset.length - 1][0])])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, d => d[1])])
      .range([height, 0]);

    // Create axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Add axes to the chart
    svg.append('g')
      .attr('id', 'x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

    svg.append('g')
      .attr('id', 'y-axis')
      .call(yAxis);

    // Create the bars
    svg.selectAll('.bar')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('data-date', d => d[0])
      .attr('data-gdp', d => d[1])
      .attr('x', d => xScale(new Date(d[0])))
      .attr('y', d => yScale(d[1]))
      .attr('width', width / dataset.length)
      .attr('height', d => height - yScale(d[1]))
      .on('mouseover', (event, d) => {
        const tooltip = document.getElementById('tooltip');
        tooltip.innerHTML = `${d[0]}<br>${d[1]} Billion USD`;
        tooltip.style.display = 'block';
        tooltip.style.left = `${event.pageX + 10}px`;
        tooltip.style.top = `${event.pageY}px`;
        tooltip.setAttribute('data-date', d[0]);
      })
      .on('mouseout', () => {
        const tooltip = document.getElementById('tooltip');
        tooltip.style.display = 'none';
      });
  })
  .catch(error => console.error('Error loading dataset:', error));
