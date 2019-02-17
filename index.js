// ============================ Set up ==============================

const width = 775, height = 850;

const defOpa = 0.7 // default opacity

const svg = d3.select("#map")
 	.append("svg")
	.attr("id", "mapSVG")
	.attr("width", width)
	.attr("height", height)

// create a projection that provides our mapping from lat,lon data to x,y, coordinates
const projection_func = d3.geoMercator()
	.center([8, 0])
	.rotate([0, -10])
	.scale(3000)
	.translate([width / 2, height / 2]);

// path function
const path_func = d3.geoPath()
	.projection(projection_func);

// draw map
const map_layer = svg.append("g")
	.attr("id", "map_layer");


Promise.all([
	d3.json("data/geojson/Polygon_cities.geojson"),
	d3.json("data/geojson/Lines_no_Mexican.geojson"),
	d3.json("data/geojson/Points.geojson")
]).then(function(data) {
	console.log(data);

	const polygons = data[0].features;
	const lines = data[1].features;
	const points = data[2].features;

	// ========================= Draw Features =============================

	// draw all the polygon cities
	map_layer.selectAll(".polygon_fea")
		.data(polygons)
		.enter()
		.append("path")
		.classed("polygon_fea", true)
		.attr("opacity", defOpa)
		.attr("d", path_func)
		.attr("fill", "lightgray")
		.attr("stroke", "black");

	// draw all the line features
	map_layer.selectAll(".line_fea")
		.data(lines)
		.enter()
		.append("path")
		.classed("line_fea", true)
		.attr("opacity", defOpa)
		.attr("d", path_func)
		.attr("fill-opacity", 0)
		.attr("stroke", "#8A668E")
		.attr("stroke-width", 3);

	// draw all the point features
	map_layer.selectAll(".point_fea")
		.data(points)
		.enter()
		.append("circle")
		.classed("point_fea", true)
		.attr("opacity", defOpa)
		.attr("cx", (d) => projection_func(d.geometry.coordinates)[0])
		.attr("cy", (d) => projection_func(d.geometry.coordinates)[1])
		.attr("r", 5)
		.attr("fill", "#e65f5c");



	// =================== Event listeners for highlighting features ==========================
	
	// mouse on polygon
	d3.selectAll(".polygon_fea").on("mouseover", function(d, i){
		d3.select(this)
			.attr("fill", "#6BAA75")
			.attr("opacity", 1)
	});

	// mouse off polygon
	d3.selectAll(".polygon_fea").on("mouseleave", function(d, i){
		d3.select(this)
			.attr("fill", "lightgray")
			.attr("opacity", defOpa)
	});

	// mouse on line
	d3.selectAll(".line_fea").on("mouseover", function(d, i){
		d3.select(this)
			.attr("stroke", "#372554")
			.attr("opacity", 1)
			.attr("stroke-width", 6);
	});

	// mouse off line
	d3.selectAll(".line_fea").on("mouseleave", function(d, i){
		d3.select(this)
			.attr("stroke", "#8A668E")
			.attr("opacity", defOpa)
			.attr("stroke-width", 3);
	});

	// mouse on point
	d3.selectAll(".point_fea").on("mouseover", function(d, i){
		d3.select(this)
			.attr("fill", "red")
			.attr("stroke", "#083D77")
			.attr("opacity", 1)
			.attr("stroke-width", 3)
			.attr("r", 10);
	});

	// mouse off point
	d3.selectAll(".point_fea").on("mouseleave", function(d, i){
		d3.select(this)
			.attr("fill", "#e65f5c")
			.attr("stroke", "")
			.attr("opacity", defOpa)
			.attr("stroke-width", 0)
			.attr("r", 5);
	});

});
