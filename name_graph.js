const width = 800, height = 800;

const svg = d3.select("#names")
	.append("svg")
	.attr("width", width)
	.attr("height", height);

const simulation = d3.forceSimulation()
	.force("center", d3.forceCenter(width / 2, height / 2))
	.force("charge", d3.forceManyBody())

d3.csv("data/name_sheet_1.csv").then(function(data){

	updateNodes();

	simulation.nodes(data)
		.on("tick", ticked);

	// ================ Event functions ==================
	function updateNodes() {
		let domNodes = svg.selectAll(".name")
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
			.attr("r", 5)
			.attr("fill", "#BA7E7A");

		let labels = domNodes.append("text")
			.classed("label", true)
			.text((d) => d["Full_name"]);


	}

	function ticked() {
		let domNodes = svg.selectAll(".name")

		domNodes.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
	}

});
