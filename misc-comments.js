/*
STARTUP FLOW:


DEV MODE:
1. Reads package.json, loads in necessary dependencies
	- Runs npm start command
		> Runs prestart message (babel-transpiled)
		> Initaites execution of server code srcServer.js
		> Runs linting and initiates watch mode for live changes
		> Runs mocha tests and initiates watch mode for live changes

2. Runs server code in tools/srcServer.js
	- Import necessary files
		> express
		> webpack
		> path
		> config (webpack file)
		> open
	- Initialize server configuration variables
		> port
		> express()
		> compiler (webpack)
	- Setup webpack middlewares
	- Setup hot reloading middleware for webpack
	- Setup express routing (routing handled front-end, so just serve index.html for all urls)
	- Initiate server on port
		> Use open to open new webpage

3. Webpack compiles and runs synchronously
	- Import necessary files
		> webpack
		> path
	- Configure webpack object literal
		> Set 'debug' mode (true | false) (display bebug info to console, false by default)
		> set 'devtool' (cheap-module-eval-source-map)
		> set 'noInfo' (true | false) (show files being bundled in console)
		> Define 'entry' points as array
		 	* eventsource-polyfill for hot reloading
			* webpack-hot-middleware/client?reload=true in case hot reloading bugs
			* src/index.js (must be last)
		> set 'target' (web)
		> Define 'output' as object literal
			* Set 'path' to place output (usually a /dist folder)
			* define 'publicPath' as entry/base path (usually "/")
			* define 'filename' for name of bundled file (usually bundle.js)
		> Define 'devServer' as object literal for location of source files to bundled
			* set 'contentBase' to /src file
		> Define 'plugins' as array of new objects for webpack addons
			* webpack.HotModuleReplacementPlugin() to reload modules without refreshing the whole page
			* webpack.NoErrorsPlugin() to keep errors from breaking hot reloading
		> Define 'module' as object literal for module loading
			* Define 'loaders' as array of object literalls for types of files webpack handles
				- 'test' prop as a RegEx test for the extension name (.js, .css)
				- 'include' prop for specific files to include instead of all by default
				- 'loader' prop for what things the file should load with

4. Webpack bundled front-end code is runs index.js in /src
	- Import necessary files
		> 'babel-polyfill' for things babel cant transpile
		> React from 'react'
		> { render } from 'react-dom' for DOM connection
		> configureStore from './store/configureStore' for redux store config
		> { Provider } from 'react-redux' to connect redux store to react components
		> { Router, browserHistory } from 'react-router' for routing and clean url's
		> routes from './routes' for React front-end component routing
		> { loadCourses } from './actions/courseActions' for courses given by api on startup
		> { loadAuthors } from './ations/authorActions' for authors given by api on startup
		> './styles/styles.css' for css files
		> './node_modules/...' for other library related things (ex. bootstrap/toastr css)
	- Create instance of redux store and dispatch functions to run immediately
	- Render top level component
		> Provider component with store prop equaling store instance for redux top-level state store
		> Router component inside with browserHistory and routes props for url page routing

6. Interpret and route url through router component in routes.js
	- import necessay files
		> React from 'react'
		> { route, IndexRoute } from 'react-router' for base routes and extensions
		> App from './components/App' for root view component all components fit inside of
		> HomePage from './components/home/HomePage' for homepage component
		> AboutPage from './components/about/AboutPage' for aboutpage component
		> CoursesPage from './components/course/CoursesPage' for coursespage component
		> ManageCoursePage from './components/course/ManageCoursePage' for ManageCoursePage component
	- Export default route system
		> Base 'Route' '/' with 'component' 'App', all extensions of that url are nested inside
		> 'IndexRoute' with component prop to 'HomePage' for basic route given only '/'
		> 'Route' with 'path' to 'courses' and 'component' 'CoursesPage'
		> 'Route' with 'path' to 'course' and 'component' 'ManageCoursePage'
		> 'Route' with 'path' to 'course:id' and 'component' 'ManageCoursePage'
		> 'Route' with 'path' to 'about' and 'component' 'AboutPage'

7. Load routed component as child within App shell component
	- You have website :)



PROD MODE:



STATE FLOW:
TOP-DOWN:
1. On startup, the store is configured, mixing in the root reducer (a mass of all the other reducers), any initial state passed in, and any middlewares

2. The root reducer combines all the other reducers to be used

3. react-redux exposes the redux store at the projects root component (typically Router) by wrapping it in the Provider component

4. react-redux connects each individual component to the store with the connect method. Use mapStateToProps and mapDispatchToProps to narrow what slice of state and actions each component can work with

BOTTOM-UP:
1. Action is triggered by some component method calling a props.actions action mapped to mapDispatchToProps

2. Goes to action file that returns an action object, and then is sent to its corresponding reducer

3. Reducer takes in state of specific thing (like an array of numbers), along with sent aciton and return the new state of the thing

4. Store is updated and trickles down through the component tree
*/





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
	  "clean-dist": "npm run remove-dist && mkdir dist", // Removes then recreates dist folder, to ensure folder is empty and clean to write on
	  "remove-dist": "node_modules/.bin/rimraf ./dist", // Remove dist folder
	  "build:html": "babel-node tools/buildHtml.js", // Create production html base
	  "prebuild": "npm-run-all clean-dist test lint build:html", // No --parallel flag, so arguments run in order, clean, then test, then lint, then build html base
	  "build": "babel-node tools/build.js", // Run webpack production build
	  "postbuild": "babel-node tools/distServer.js" // Spin up the production server
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
