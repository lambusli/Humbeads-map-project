import * as conf from "./configure.js";
import {insertMap} from "./cartemap.js";
import {insertNames} from "./name_graph.js";

const svg = d3.select("#map_svg");

// set the size of svg
conf.setSize(svg, 1000, 1000);

// insert names
insertNames(svg);

// insert map
insertMap(svg);
