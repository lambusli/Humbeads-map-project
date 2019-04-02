// Set the width and height of a svg
export function setSize(svgDOM, width, height) {
	svgDOM.attr("width", width);
	svgDOM.attr("height", height);

	// Draw the boundary of svg for visual assistance
	svgDOM.append("rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", width)
		.attr("height", height)
		.attr("fill-opacity", 0)
		.attr("stroke", "gray")
		.attr("stroke-width", 3);
}
