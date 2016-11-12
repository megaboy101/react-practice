import * as types from '../actions/actionTypes';
import initialState from './initialState';

function actionTypeEndsInSuccess(type) {
	return type.substring(type.length - 8) == '_SUCCESS';
}

// This reducer increments the state by 1
export default function ajaxStatusReducer(state = initialState.ajaxCallsInProgress, action) {
	// Using an if as opposed to a switch since its simpler
	if (action.type == types.BEGIN_AJAX_CALLS) {
		return state + 1; // Remember state is an integer count
	}
	else if (
		// If there is an error on the ajax call or the ajax call is finished, lower the running call count by 1
		action.type == types.AJAX_CALL_ERROR ||
		actionTypeEndsInSuccess(action.type)) {
		return state - 1;
	}

	return state;
}
