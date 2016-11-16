import expect from 'expect';
import * as courseActions from './courseActions';
import * as types from './actionTypes';

import thunk from 'redux-thunk'; // for testing thunks
import nock from 'nock'; // used to mock http calls for testing thunks
import configureMockStore from 'redux-mock-store'; // used to mock redux store for testing thunks

// Testing synchronous actions (non-thunks)
describe('Course Actions', () => {
	describe('createCourseSuccess', () => {
		it('should create a CREATE_COURSE_SUCCESS action', () => {
			// arrange
			const course = {id: 'clean-code', title: 'Clean Code'};
			const expectedAction = {
				type: types.CREATE_COURSE_SUCCESS,
				course: course
			};

			// act
			const action = courseActions.createCourseSuccess(course);

			// assert
			expect(action).toEqual(expectedAction);
		});
	});
});

// Configure mock store, configures the store from an array of midleware (just thunks in this case)
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

// Test asynchronous actions
describe('Async Actions', () => {
	afterEach(() => { // Creates a clean slate to test after each async test
		nock.cleanAll();
	});

	it('should create BEGIN_AJAX_CALLS and LOAD_COURSES_SUCCESS when loading courses', (done) => { // notice done argument, used to aysnc mocha testing (so it doesnt run til async data is received)
		// Here's and example call to nock
		// nock('http:example.com/')
		// 	.get('/courses')
		// 	.reply(200, { body: { course: [{id: 1, firstName: 'Cory', lastName: 'House'}] }});

		// Declare actions to expect with thunk
		const expectedActions = [
			{type: types.BEGIN_AJAX_CALLS},
			{type: types.LOAD_COURSES_SUCCESS, body: {courses: [{id: 'clean-code', title: 'Clean'}]}}
		];

		const store = mockStore({courses: []}, expectedActions); // Load up mock store with inital conditions and actions
		store.dispatch(courseActions.loadCourses()).then(() => { // Dispatch from store to test pieces
			const actions = store.getActions(); // Get list of actions
			expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALLS); // Expect first action to be BEGIN_AJAX_CALLS
			expect(actions[1].type).toEqual(types.LOAD_COURSES_SUCCESS); // Expect second action to be LOAD_COURSES_SUCCESS
			done(); // Tells mocha that async testing is done (from done funciton defined in parameter list)
		});
	});
});
