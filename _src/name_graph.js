/* ===============================================================
* Contain all the functions that are related to the display of the names

* List of functions:
** 1. insertNames(svgDOM)
** 2.
==================================================================*/

function make2D(x, y) {
	let res = [];
	for (let i = 0; i < x; i++) {
		let inner = [];
		for (let j = 0; j < y; j++) {
			inner.push({})
		}
		res.push(inner);
	}
	return res;
}

// Insert names defallt circular display
export function insertNamesDefault(svgDOM) {
	const width = svgDOM.attr("width");
	const height = svgDOM.attr("height");

	// Delete all the other g containers that are used for other name displays
	d3.selectAll(".names").remove();

	// the g container for this visualization
	const this_g = svgDOM.append("g")
		.classed("names", true);

	const simulation = d3.forceSimulation()
		.force("center", d3.forceCenter(width / 2, height / 2))
		.force("charge", d3.forceManyBody().strength(1))
		.force("collide", d3.forceCollide())

	d3.csv("../data/name_sheet_1.csv").then(function(nameList){
		let data = nameList;

		// Prepare extra properties
		data.forEach(function(d){
			d.radius = d["Full_name"].length;
		});

		let size = data.length;

		// Add a big dummy node in the middle
		data = [{radius: 250, dummy: true}].concat(data);

		// update the display of nodes
		updateNodes();

		// further configure forceSimulation
		simulation.force("collide")
			.radius((d) => d.radius);

		simulation.nodes(data)
			.on("tick", ticked);

		// ================ Event functions ==================
		function updateNodes() {
			let domNodes = this_g.selectAll(".name")
				.data(data)

			domNodes.exit().remove();

			let newNodes = domNodes.enter()
				.append("g")
				.classed("name", true);

			domNodes = domNodes.merge(newNodes)
			 	.attr("transform", (d) => `translate(${d.x}, ${d.y})`);

			let circles = domNodes.append("circle")
				.attr("cx", 5)
				.attr("cy", 5)
				.attr("r", (d) => d.radius)
				.attr("fill", "#BA7E7A")
				.attr("opacity", (d) => d.dummy ? 0 : 1);

			let labels = domNodes.append("text")
				.classed("label", true)
				.text((d) => d["Full_name"]);

		}

		function ticked() {
			let domNodes = this_g.selectAll(".name")

			domNodes.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
		}

	});

}


export function insertNamesQuadrants(svgDOM) {
	const width = svgDOM.attr("width");
	const height = svgDOM.attr("height");

	// Delete all the other g containers that are used for other name displays
	d3.selectAll(".names").remove();

	// the g container for this visualization
	const this_g = svgDOM.append("g")
		.classed("names", true);

	// Specify the center of each quadrant
	// Suppose the width of each quadrant is the same. Same with height.
	/* Suppose the quadrant layout is:
	* 6A 6B 6C 6D 6E
	* 5A 5B 5C 5D 5E
	* ...
	* 1A 1B 1C 1D 1E
	*/
	const numW = 5;		// number of horizontal quadrants
	const numH = 6; 	// number of vertical quadrants
	const sideW = width / numW;		// the length of width of one quadrant
	const sideH = height / numH;	// the length of height of one quadrant
	const centers = make2D(numH, numW); // 2D 0-array of size numH * numW that stores all center
	// const centers = Array(numH).fill(null).map(() => Array(numW).fill({})) // malfunctions	// 2D 0-array of size numH * numW

	// set centers
	for (let i = 0; i < numH; i++){
		for (let j = 0; j < numW; j++){
			centers[i][j].numeric = height - sideH * i - sideH * 0.5;
			centers[i][j].letter = sideW * j + sideW * 0.5;
		}
	}

	// given a quandrant in the form like "1A", return the object that stores the coordinate of the center of this quandrant
	function centerOf(code) {
		let numeric = Number(code.substring(0, 1)) - 1; // '1' --> 0, '2' --> 1, etc.
		let letter = code.substring(1, 2).charCodeAt('0') - 'A'.charCodeAt('0'); // 'A' --> 0, 'B' --> 1
		return centers[numeric][letter];
	}

	console.log(centerOf('4E')); 
	console.log(centerOf('2B'));

	/*
	const simulation = d3.forceSimulation()
		.force("center", d3.forceCenter(width / 2, height / 2))
		.force("charge", d3.forceManyBody().strength(1))
		.force("collide", d3.forceCollide())

	d3.csv("../data/name_sheet_1.csv").then(function(nameList){
		let data = nameList;

		// Prepare extra properties
		data.forEach(function(d){
			d.radius = d["Full_name"].length;
		});

		let size = data.length;

		// Add a big dummy node in the middle
		data = [{radius: 250, dummy: true}].concat(data);

		// update the display of nodes
		updateNodes();

		// further configure forceSimulation
		simulation.force("collide")
			.radius((d) => d.radius);

		simulation.nodes(data)
			.on("tick", ticked);

		// ================ Event functions ==================
		function updateNodes() {
			let domNodes = this_g.selectAll(".name")
				.data(data)

			domNodes.exit().remove();

			let newNodes = domNodes.enter()
				.append("g")
				.classed("name", true);

			domNodes = domNodes.merge(newNodes)
			 	.attr("transform", (d) => `translate(${d.x}, ${d.y})`);

			let circles = domNodes.append("circle")
				.attr("cx", 5)
				.attr("cy", 5)
				.attr("r", (d) => d.radius)
				.attr("fill", "#BA7E7A")
				.attr("opacity", (d) => d.dummy ? 0 : 1);

			let labels = domNodes.append("text")
				.classed("label", true)
				.text((d) => d["Full_name"]);

		}

		function ticked() {
			let domNodes = this_g.selectAll(".name")

			domNodes.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
		}

	});
	*/
}
