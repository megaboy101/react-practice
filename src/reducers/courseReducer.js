// Import the action names
import * as types from '../actions/actionTypes';
import initialState from './initialState';

// This reducer only handles the array of courses section of the state store
export default function courseReducer(state = initialState.courses, action) { // State defaults to empty if it has no courses/doesnt exist yet, this sets the initial state
	switch(action.type) { // Action.type since its the same action sent with the type and other properties
		case types.LOAD_COURSES_SUCCESS:
			return action.courses;
			// No break statement since value is being returned

		case types.CREATE_COURSE_SUCCESS:
		// no state.push, keep immutability
			return [
				...state,
				Object.assign({}, action.course)
			];

		case types.UPDATE_COURSE_SUCCESS:
			return [
				...state.filter(course => course.id !== action.course.id),
				Object.assign({}, action.course)
			];

		default:
			return state;
	}
}
