// Course action creators

// * = everyting, aliased as types, this is importing all the action names
import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi'; // Mock api
import { beginAjaxCall } from './ajaxStatusActions';

/* Actions must return objects specifying the type action to
complete, along with any necessary data to carry out the action */
export function loadCoursesSuccess(courses) {
	return { type: types.LOAD_COURSES_SUCCESS, courses }; // Remember course = course: course
}

export function createCourseSuccess(course) {
	return {type: types.CREATE_COURSE_SUCCESS, course};
}

export function updateCourseSuccess(course) {
	return {type: types.UPDATE_COURSE_SUCCESS, course};
}

// To load courses from api on startup with redux
export function loadCourses() {
	return function(dispatch) {
		dispatch(beginAjaxCall()); // Increment current running ajax call by 1
		// Returns a dispatchable function only after the getAllCourses promise has resolved, thus async :)
		return courseApi.getAllCourses().then(courses => {
			dispatch(loadCoursesSuccess(courses));
		}).catch(error => { // Catch any rejects/errors
			throw(error);
		});
	};
}

export function saveCourse(course) {
	return function(dispatch, getState) {
		dispatch(beginAjaxCall()); // Increment current running ajax call by 1
		return courseApi.saveCourse(course).then(savedCourse => {
			// Update or create course depending on whether the course has an id
			course.id ? dispatch(updateCourseSuccess(savedCourse)) :
							dispatch(createCourseSuccess(savedCourse));
		}).catch(error => {
			dispatch(ajaxCallError(error));
			throw(error);
		});
	};
}
