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

	const polygons = data[0].features;
	const lines = data[1].features;
	const points = data[2].features;

	// ========================= Part 1: Draw Features =============================

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



	// =================== Part 2: Event listeners for highlighting features ==========================

	// function for showing tooltip
	function showTooltip(d, i, dom) {
		coord = [+d3.event.pageX, +d3.event.pageY];

		d3.select("#map_tooltip")
			.classed("hidden", false)
			.style("left", coord[0] + 25 + "px")
			.style("top", coord[1] + 25 + "px")
			.style("opacity", 0)
			.transition()
			.style("opacity", 1)
			.duration(200).delay(0)

		d3.select("#feature_name").text(d.properties.Name);
	}

	// function for hiding tooltip
	function hideTooltip(d, i, dom) {
		d3.select("#map_tooltip")
			//.classed("hidden", false)
			.transition()
			.style("opacity", 0)
			.duration(200).delay(0)

	}

	// function for mouse on polygon feature
	function onPolygon(d, i, dom) {
		d3.select(dom)
			.transition()
			.attr("fill", "#6BAA75")
			.attr("opacity", 1)
			.duration(300).delay(0);
		showTooltip(d, i, dom);
	}

	// function for mouse off polygon feature
	function offPolygon(d, i, dom) {
		d3.select(dom)
			.transition()
			.attr("fill", "lightgray")
			.attr("opacity", defOpa)
			.duration(300).delay(0);
		hideTooltip(d, i, dom);
	}

	// function for mouse on line feature
	function onLine(d, i, dom) {
		d3.select(dom)
			.transition()
			.attr("stroke", "#372554")
			.attr("opacity", 1)
			.attr("stroke-width", 6)
			.duration(300).delay(0);
		showTooltip(d, i, dom);
	}

	// function for mouse off line feature
	function offLine(d, i, dom) {
		d3.select(dom)
			.transition()
			.attr("stroke", "#8A668E")
			.attr("opacity", defOpa)
			.attr("stroke-width", 3)
			.duration(300).delay(0);
		hideTooltip(d, i, dom);
	}

	// function for mouse on point feature
	function onPoint(d, i, dom) {
		d3.select(dom)
			.transition()
			.attr("fill", "red")
			.attr("stroke", "#083D77")
			.attr("opacity", 1)
			.attr("stroke-width", 3)
			.attr("r", 10)
			.duration(300).delay(0);
		showTooltip(d, i, dom);
	}

	// function for mouse off point feature
	function offPoint(d, i, dom) {
		d3.select(dom)
			.transition()
			.attr("fill", "#e65f5c")
			.attr("stroke", "")
			.attr("opacity", defOpa)
			.attr("stroke-width", 0)
			.attr("r", 5)
			.duration(300).delay(0);
		hideTooltip(d, i, dom);
	}

	// mouse on polygon
	d3.selectAll(".polygon_fea").on("mouseover", function(d, i){
		onPolygon(d, i, this);
	});

	// mouse move on polygon
	d3.selectAll(".polygon_fea").on("mousemove", function(d, i){
		onPolygon(d, i, this);
	});

	// mouse off polygon
	d3.selectAll(".polygon_fea").on("mouseleave", function(d, i){
		offPolygon(d, i, this);
	});

	// mouse on line
	d3.selectAll(".line_fea").on("mouseover", function(d, i){
		onLine(d, i, this);
	});

	// mouse move on line
	d3.selectAll(".line_fea").on("mousemove", function(d, i){
		onLine(d, i, this);
	});

	// mouse off line
	d3.selectAll(".line_fea").on("mouseleave", function(d, i){
		offLine(d, i, this);
	});

	// mouse on point
	d3.selectAll(".point_fea").on("mouseover", function(d, i){
		onPoint(d, i, this);
	});

	// mouse off point
	d3.selectAll(".point_fea").on("mouseleave", function(d, i){
		offPoint(d, i, this);
	});

});
