// Root reducer, typically called index.js
// Remember to add all new reducers created to this root reducer list
import { combineReducers } from 'redux';
import courses from './courseReducer'; // Notice courseReducer has the alias courses,
													// this is done so that the referenced state is simple,
													// ex: this.state.courses instead of this.state.courseReducer
import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
	// Connects list all the reducers to combine for the whole application
	courses, // courses: courses
	authors,
	ajaxCallsInProgress
});

export default rootReducer;
