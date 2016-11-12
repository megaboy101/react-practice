import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authorReducer(state = initialState.authors, action) { // State defaults to empty array if it has no authors/doesnt exist yet, this sets the initial state
	switch(action.type) { // Action.type since its the same action sent with the type and other properties
		case types.LOAD_AUTHORS_SUCCESS:
			return action.authors;
			// No break statement since value is being returned

		default:
			return state;
	}
}
