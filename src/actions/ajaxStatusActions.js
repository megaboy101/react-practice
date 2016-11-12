// Track status of ajax calls

import * as types from './actionTypes';

export function beginAjaxCall() {
	return {type: types.BEGIN_AJAX_CALLS};
}

// Action type for when ajax call and in failure
export function ajaxCallError() {
	return {type: types.AJAX_CALL_ERROR};
}
