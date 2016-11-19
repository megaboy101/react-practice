/*
File must be in root of project folder
*/

import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const GLOBALS = {
	'process.env.NODE_ENV': JSON.stringify('production') // node environment variable to set production mode
};

// Configuration is just a giant object literal
export default { // Called default since its the only export
  debug: true, // Display debugging info in console
  devtool: 'source-map', // <-- production devtool
  noInfo: false, // Display files being bundled
  entry: './src/index', // Actual app entry point, MUST BE LAST (loads into index.js) <-- Only need entry point for production
  target: 'web', // =front-end web preset
  output: { // Where to create dev bundle
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/', // Starting path
    filename: 'bundle.js' // Name of bundled file
  },
  devServer: { // Location of files
    contentBase: './dist' // <-- Serve from dist folder in production
  },
  plugins: [ // <-- All new plugins for production
		new webpack.optimize.OccurenceOrderPlugin(), // Optimizes load order for minification
		new webpack.DefinePlugin(GLOBALS), // Define environment variables (to enable production mode)
		new ExtractTextPlugin('styles.css'), // Extract css to a seperate physical file
		new webpack.optimize.DedupePlugin(), // Eliminates duplicate packages found in node_modules
		new webpack.optimize.UglifyJsPlugin() // Minify javascript
	],
  module: {
    loaders: [ // Types of files for Webpack to handle
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']}, // Handle Javascript, with babel
      {test: /(\.css)$/, loader: ExtractTextPlugin.extract('css?sourceMap')}, // <-- Changed to allow for physical file extraction ( *filetype*?*handler* )
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'}, // For bootstrap
      {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'}, // For bootstrap
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'}, // For bootstrap
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'} // For bootstrap
    ]
  }
};
