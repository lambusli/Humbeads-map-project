import * as conf from "./configure.js";
import * as M from "./cartemap.js";
import * as N from "./name_graph.js";

const svg = d3.select("#map_svg");

// set the size of svg
conf.setSize(svg, 1000, 1000);

// insert names
N.insertNamesDefault(svg);

// insert map
M.insertMap(svg);

// Event listener: what to do when display option changes
d3.select("#disp_options").on("change", function(){
	let selOp = document.getElementById("disp_options").value;		// selOp === "selected option"

	// Default display
	if (selOp == 'D') {
		N.insertNamesDefault(svg);
		M.insertMap(svg);
	}
	// Quadrant display
	else if (selOp == 'Q') {
		N.insertNamesQuadrants(svg);
		M.insertMap(svg); 
	}
});
