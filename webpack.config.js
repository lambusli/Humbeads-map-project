// In web config
const path = require("path");

module.exports = {
	entry: {
		bundle: [
			"./_src/main.js",
			"./_src/configure.js",
			"./_src/cartemap.js"
		]
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "_src") // the directory of new bundled file.
	}
}
