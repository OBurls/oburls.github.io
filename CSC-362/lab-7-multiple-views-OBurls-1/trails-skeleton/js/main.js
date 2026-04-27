
// Global objects go here (outside of any functions)
let data, scatterplot, barchart;
let difficultyFilter = [];
const dispatcher = d3.dispatch('filterCategories');
/**
 * Load data from CSV file asynchronously and render charts
 */
d3.csv('data/vancouver_trails.csv')
   .then(_data => {
     data = _data; // for safety, so that we use a local copy of data.

     data.forEach(function(elem){
      elem.time = parseInt(elem.time);
      elem.distance = parseInt(elem.distance);
     })

     // Initialize scale
     const colorScale = d3.scaleOrdinal()
      .domain(["Easy", "Intermediate", "Difficult"])
      .range(["lightgreen", "yellowgreen", "darkgreen"]);

     
     scatterplot = new Scatterplot({parentElement: '#scatterplot', colorScale: colorScale}, data); //we will update config soon
     scatterplot.updateVis();

     barchart = new Barchart({parentElement: '#barchart', colorScale: colorScale}, dispatcher, data);
     barchart.updateVis();
   })
  .catch(error => console.error(error));

/**
 * Use bar chart as filter and update scatter plot accordingly
 */
function filterData() {
 	if (difficultyFilter.length == 0) {
   		scatterplot.data = data;
  	} else {
    		scatterplot.data = data.filter(d =>
difficultyFilter.includes(d.difficulty));
  	}
  	scatterplot.updateVis();
}

dispatcher.on('filterCategories', selectedCategories => {
	if (selectedCategories.length == 0) {
		scatterplot.data = data;
	} else {
		scatterplot.data = data.filter(d => selectedCategories.includes(d.difficulty));
	}
	scatterplot.updateVis();
});




