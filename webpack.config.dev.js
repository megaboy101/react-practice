/*
File must be webpack.config (.dev for development build only)
File must be in root of project folder
*/

import webpack from 'webpack';
import path from 'path';

// Configuration is just a giant object literal
export default { // Called default since its the only export
  debug: true, // Display debugging info in console
  devtool: 'cheap-module-eval-source-map',
  noInfo: false, // Display files being bundled
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true', // note that it reloads the page if hot module reloading fails.
    path.resolve(__dirname, 'src/index') // Actual app entry point, MUST BE LAST (loads into index.js)
  ],
  target: 'web', // =front-end web preset
  output: { // Where to create dev bundle
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/', // Starting path
    filename: 'bundle.js' // Name of bundled file
  },
  devServer: { // Location of files
    contentBase: path.resolve(__dirname, 'src')
  },
  plugins: [ // Webpack addons
    new webpack.HotModuleReplacementPlugin(), // replace modules without refreshing page
    new webpack.NoErrorsPlugin() // Keep errors from breaking hot-reloading
  ],
  module: {
    loaders: [ // Types of files for Webpack to handle
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']}, // Handle Javascript, with babel
      {test: /(\.css)$/, loaders: ['style', 'css']}, // Handle css
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'}, // For bootstrap
      {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'}, // For bootstrap
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'}, // For bootstrap
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'} // For bootstrap
    ]
  }
};
