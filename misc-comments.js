// .babelrc
// Configuration settings for babel, must be in root
{
  "presets": ["react", "es2015"], // Preset to react and es6
  "env": { // Environment settings
    "development": { // Development env only
      "presets": ["react-hmre"] // run hmre preset, bundle of hot reloading features for babel
    }
  }
}




// .eslintrc
// Config settings for eslint, must be in root
{
  "extends": [ // Linting extensions
    "eslint:recommended", // Run recommended settings
    "plugin:import/errors", // Enhanced import linting
    "plugin:import/warnings" // Enhanced import linting
  ],
  "plugins": [ // plugins for linting styles
    "react" // lint react rules
  ],
  "parserOptions": { // Enables es6
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true // use Harmony jsx
    }
  },
  "env": { // global variables to expect without declaration in file
    "es6": true,
    "browser": true,
    "node": true,
    "jquery": true,
    "mocha": true
  },
  "rules": { // Setting overwrites
    "quotes": 0,
    "no-console": 1,
    "no-debugger": 1,
    "no-var": 1,
    "semi": [1, "always"],
    "no-trailing-spaces": 0,
    "eol-last": 0,
    "no-unused-vars": 0,
    "no-underscore-dangle": 0,
    "no-alert": 0,
    "no-lone-blocks": 0,
    "jsx-quotes": 1,
	 // React linting options: 0-Off 1-warning 2-error
    "react/display-name": [ 1, {"ignoreTranspilerName": false }],
    "react/forbid-prop-types": [1, {"forbid": ["any"]}],
    "react/jsx-boolean-value": 1,
    "react/jsx-closing-bracket-location": 0,
    "react/jsx-curly-spacing": 1,
    "react/jsx-indent-props": 0,
    "react/jsx-key": 1,
    "react/jsx-max-props-per-line": 0,
    "react/jsx-no-bind": 1,
    "react/jsx-no-duplicate-props": 1,
    "react/jsx-no-literals": 0,
    "react/jsx-no-undef": 1,
    "react/jsx-pascal-case": 1,
    "react/jsx-sort-prop-types": 0,
    "react/jsx-sort-props": 0,
    "react/jsx-uses-react": 1,
    "react/jsx-uses-vars": 1,
    "react/no-danger": 1,
    "react/no-did-mount-set-state": 1,
    "react/no-did-update-set-state": 1,
    "react/no-direct-mutation-state": 1,
    "react/no-multi-comp": 1,
    "react/no-set-state": 0,
    "react/no-unknown-property": 1,
    "react/prefer-es6-class": 1,
    "react/prop-types": 1,
    "react/react-in-jsx-scope": 1,
    "react/require-extension": 1,
    "react/self-closing-comp": 1,
    "react/sort-comp": 1,
    "react/wrap-multilines": 1
  }
}





// package.json
{
  "name": "pluralsight-redux-starter",
  "version": "1.0.0",
  "description": "Starter kit for React and Redux Pluralsight course by Cory House",
  // Automation scripts for build processes(run linting, transpiling, etc.)
  "scripts": {
	  /* On "npm start":
	  		display the start message (prestart)
			run webpack to bundle code (open:src)
			start server (open:src)
			open server in chrome (open:src)
			lint files (lint:watch)
			run tests (test:watch)
			re-run scripts on save (open:src/lint:watch/test:watch)
	  */
	  // start and prestart both run with start command
	  "prestart": "babel-node tools/startMessage.js", // Before running the start command, run a complied happy starter message
	  "start": "npm-run-all --parallel open:src lint:watch test:watch", // Run all the scripts given at the same time (run server and live lint)
	  "open:src": "babel-node tools/srcServer.js", // run compiled version (babel-node) of server starter (srcServer.js)
	  // ALL npm scripts that arent start must be preset with run (ex: npm run lint)
	  "lint": "node_modules/.bin/esw webpack.config.* src tools", /* Run esw/es6 watch executable (downloaded in node modules)
	  																					 to watch webpack config files, files in src, and files in tools */
	  "lint:watch": "npm run lint -- --watch" // Run the lint script, but with the watch flag (to enable watching)
	  "test": "mocha --reporter spec tools/testSetup.js \"src/**/*.test.js\"" // Run mocha testing with the progress reporter using the setup from testSetup to test all src files ending in test.js, switch to spec when actually testing
	  "test:watch": "npm run test -- --watch" // Run test watching to run on file save
  },
  "author": "Cory House",
  "license": "MIT",
  // Used in final production build
  "dependencies": {
    "babel-polyfill": "6.8.0", // Use babel features that cant be transpiled (ex: new.target)
    "bootstrap": "3.3.6", // CSS framework
    "jquery": "2.2.3", // Used for toastr
    "react": "15.0.2", // React
    "react-dom": "15.0.2", // Connect react to the DOM
    "react-redux": "4.4.5", // Connect react to redux
    "react-router": "2.4.0", // Route react
    "react-router-redux": "4.0.4", // Keep redux and router in sync
    "redux": "3.5.2", // Redux (unidirectional data flow)
    "redux-thunk": "2.0.1", // Async redux
    "toastr": "2.1.2" // Message displayer (for the user)
  },
  // Used for development assistance
  "devDependencies": {

    "babel-cli": "6.8.0", // Command line use of babel
    "babel-core": "6.8.0", // Babel
    "babel-loader": "6.2.4", // Connect babel to Webpack
    "babel-plugin-react-display-name": "2.0.0", // add es6 DisplayName property to React.createClass calls
    "babel-preset-es2015": "6.6.0", // Preset babel to es6 mode
    "babel-preset-react": "6.5.0", // Add jsx
    "babel-preset-react-hmre": "1.1.1", // Hot reloading preset HMR = hot-module-reloading
    "babel-register": "6.8.0", // Connect babel to mocha for testing

    "colors": "1.1.2", // Add colors to terminal :)
    "compression": "1.6.1", // Add gzip support to express
    "cross-env": "1.0.7", // Handle environment variables across developers
    "css-loader": "0.23.1", // Add css support to Webpack

    "enzyme": "2.2.0", // Simple testing utilities

    "eslint": "2.9.0", // Linter
    "eslint-plugin-import": "1.6.1", // Advanced es6 linting for modules
    "eslint-plugin-react": "5.0.1", // Advanced React linting
    "eslint-watch": "2.1.11", // Add watching (live linting)

    "eventsource-polyfill": "0.9.6", // Hot reloading for IE
    "expect": "1.19.0", // Assertion library for mocha

	 "express": "4.13.4", // Node backend framework

	 "extract-text-webpack-plugin": "1.0.1", // Extracts css to seprate file in production build (for Webpack)
    "file-loader": "0.8.5", // File loading support for Webpack
    "jsdom": "8.5.0", // In-memory DOM for testing

    "mocha": "2.4.5", // Testing library

	 "nock": "8.0.0", // Mock HTTP requests for testing

    "npm-run-all": "1.8.0", // Run all npm scripts at the same time (Ex: lint and transpile)

    "open": "0.0.5", // Auto-open app in default browser

    "react-addons-test-utils": "15.0.2", // React testing utilities
    "redux-immutable-state-invariant": "1.2.3", // Warn when redux state changes
    "redux-mock-store": "1.0.2", // Mock redux store for testing

    "rimraf": "2.5.2", // Easily delete files
    "style-loader": "0.13.1", // Style support for Webpack
    "url-loader": "0.5.7", // Url loading support for Webpack

    "webpack": "1.13.0", // Webpack (file bundler with many plugins)
    "webpack-dev-middleware": "1.6.1", // Middleware support for Webpack
    "webpack-hot-middleware": "2.10.0" // Hot reloading for Webpack
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/coryhouse/pluralsight-redux-starter"
  }
}


// Redux container class template
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import /* name */ from  /* child presentational components */

class /* className */ extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (

		);
	}
}

(/* className */).Proptypes = {
	//myProp: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
	return {
		state: state
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(/* className */);
