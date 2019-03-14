import * as conf from "./configure.js";
import {insertMap} from "./cartemap.js";

const svg = d3.select("#map_svg");

// set the size of svg
conf.setSize(svg, 800, 800);

// insert map
insertMap(svg); 
