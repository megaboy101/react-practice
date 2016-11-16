import expect from 'expect';
import { createStore } from 'redux'; // Passed to root reducer
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as courseActions from '../actions/courseActions';

describe('Store', function() {
	it('should handle creating courses', function() {
		// arrange
		const store = createStore(rootReducer, initialState); // Create a store
		const course = { // Mock course to test, only including necessarcy data
			title: "Clean Code"
		};

		// act
		const action = courseActions.createCourseSuccess(course); // Reference to action creator
		store.dispatch(action); // initialize store

		//  assert
		const actual = store.getState().courses[0]; // Get actual state of things now in store
		const expected = {
			title: 'Clean Code'
		};
		expect(actual).toEqual(expected);
	});
});
