// Redux Store
import { createStore, applyMiddleware } from 'redux'; // applyMiddleware creates usable middleware before the store is created
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk'; // Used for async redux with AJAX and api calls

// Function to configure store, designed to be called at apps entry point, thus the store is configued on startup
export default function configureStore(initialState) { // Initialize store with initial states
	return createStore(
		rootReducer,
		initialState,
		applyMiddleware(thunk, reduxImmutableStateInvariant()) // Infinite parameters for every middleware to add
	);
}
