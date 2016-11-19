/*
NOT NEEDED IN DIST SERVER:
webpack module
webpack config file
compiled instance of webpack
webpack middlewares

ADD IN DIST SERVER:
middleware to serve dist folder
get route serving production index.html
*/

import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression'; // For g-zip compression with production build

/*eslint-disable no-console*/

const port = 3000;
const app = express();

app.use(compression()); // Gzip compressed
app.use(express.static('dist'));

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, function(err) {
	if (err) {
		return new Error('Could not run server');
	}
	else {
		open(`http://localhost:${port}`);
	}
});
