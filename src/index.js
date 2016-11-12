// Import a file without 'from' for passive effects like pollyfilling or importing other file-types

import 'babel-polyfill'; // For things that arent transpilable by babel
import React from 'react';
import { render } from 'react-dom'; // render to DOM function
import configureStore from './store/configureStore'; // Config info for redux store
import { Provider } from 'react-redux'; // Provider is a high-order component that attaches redux store to react container components
import { Router, browserHistory } from 'react-router'; // Router is the root router/handler, browserHistory handles history with clean url's
import routes from './routes';
import { loadCourses } from './actions/courseActions';
import { loadAuthors } from './actions/authorActions';
import './styles/styles.css'; // Imports css files
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; // imports bootstrap
import '../node_modules/toastr/build/toastr.min.css'; // Import toastr notification css files

const store = configureStore(); // Startup redux store, initial state would go as parameter
store.dispatch(loadCourses()); // Dispatch this action when the store/page first loads
store.dispatch(loadAuthors()); // Remember to setup all startup functions from index.js so they start on site load

/* Reacts dom render method in ES6 */
render(
	<Provider store={store}>
		<Router history={browserHistory} routes={routes} />
	</Provider>,
	document.getElementById('app')
);
