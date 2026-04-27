// Example data
const data = [
    { 'year': 2015, 'milk': 10, 'water': 4 },
    { 'year': 2016, 'milk': 12, 'water': 6 },
    { 'year': 2017, 'milk': 6, 'water': 7 }
  ];

  const stack = d3.stack().keys(['milk', 'water']);
  const stackedData = stack(data);
  console.log(stackedData);
  
  // Create chart
  const stackedBarChart = new StackedBarChart({ parentElement: '#chart'}, data);