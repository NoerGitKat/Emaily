// Figure out whether to use dev or prod keys
if (process.env.NODE_ENV === 'production') {
	// Use production keys and immediately export for use
	module.exports = require('./prod');
} else {
	// Use development keys and immediately export for use
	module.exports = require('./dev');
}
