// Configuration file for webserver that servers file is src

import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev'; // From webpack file, thats why the object is called 'default'
import open from 'open';

const port = 3000; // Port number
const app = express(); // Express instance
const compiler = webpack(config); // Webpack instance with config module as setup

// Setup webpack middlewares with finished webpack setup as argument
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true, // No terminal information
  publicPath: config.output.publicPath // Public path, defined by Webpack config file
}));

// Setup hot-reloading middleware for webpack with finished webpack setup as argument
app.use(require('webpack-hot-middleware')(compiler));

// Serve index.html for all get requests (*), since its a single page app
app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

// Turn on server
app.listen(port, function(err) {
  if (err) {
    return new Error("Server failure");
  } else {
    open(`http://localhost:${port}`); // If no errors, open Chrome to the running server url
  }
});
