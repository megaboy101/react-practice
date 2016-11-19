// File to discern which store to use, development or production
// Uses require instead of ES6 imports since ES6 doesnt have dynamic imports

if (process.env.NODE_ENV === 'production') {
	module.exports = require('./configureStore.prod');
}
else {
	module.exports = require('./configureStore.dev');
}
