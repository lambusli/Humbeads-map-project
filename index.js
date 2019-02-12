const width = 775, height = 850;

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
	d3.json("data/geojson/Lines.geojson"),
	d3.json("data/geojson/Points.geojson")
]).then(function(data) {
	console.log(data);

	const polygons = data[0].features;
	const lines = data[1].features;
	const points = data[2].features;


	// draw all the polygon cities
	map_layer.selectAll(".polygon_fea")
		.data(polygons)
		.enter()
		.append("path")
		.classed("polygon_fea", true)
		.attr("d", path_func)
		.attr("fill", "lightgray")
		.attr("stroke", "black");

	// draw all the line features
	map_layer.selectAll(".line_fea")
		.data(lines)
		.enter()
		.append("path")
		.classed("line_fea", true)
		.attr("d", path_func)
		.attr("fill-opacity", 0)
		.attr("stroke", "#372554")
		.attr("stroke-width", 3);

	// draw all the point features
	map_layer.selectAll(".point_fea")
		.data(points)
		.enter()
		.append("circle")
		.classed("point_fea", true)
		.attr("cx", (d) => projection_func(d.geometry.coordinates)[0])
		.attr("cy", (d) => projection_func(d.geometry.coordinates)[1])
		.attr("r", 5)
		.attr("fill", "#e65f5c");

});
