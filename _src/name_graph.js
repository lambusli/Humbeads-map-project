// Insert names
export function insertNames(svgDOM) {
	const width = svgDOM.attr("width");
	const height = svgDOM.attr("height");

	// the g container for this visualization
	const this_g = svgDOM.append("g");

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
