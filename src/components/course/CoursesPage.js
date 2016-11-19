/*
5 MAJOR PIECES OF CONTAINER COMPONENTS:
	1. Initialize state with a constructor, call binding functons
	2. Have child functions called by render
	3. Render function that just calls a child component (no jsx)
	4. Have proptypes for validation
	5. Have redux connetion function and functions that go with it
*/

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions'; // Create course action to dispatch
import CourseList from './CourseList';
import { browserHistory } from 'react-router';

class CoursesPage extends React.Component {
	constructor(props, context) { // Container component due to state
		super(props, context); // Inherit the props of the parent component

		this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
	}

	courseRow(course, index) {
		return <div key={index}>{course.title}</div>;
	}

	redirectToAddCoursePage() {
		browserHistory.push('/course');
	}

	render() {
		const {courses} = this.props; // Removes having to write this.props.courses

		return (
			<div>
				<h1>Courses</h1>
				<input
					type="submit"
					value="Add Course"
					className="btn btn-primary"
					onClick={this.redirectToAddCoursePage}/>
				<CourseList courses={courses} />
			</div>
		);
	}
}

CoursesPage.propTypes = {
	courses: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps){ // State = state in redux store, ownProps = access props attached to component
	return { // Returns an object of properties to expose to component
		courses: state.courses // Name (courses) dependent on name determined in reducer
	};
}

function mapDispatchToProps(dispatch) { // Determines what actions are available in the component and maps them to props
	return {
		// createCourse: course => dispatch(courseActions.createCourse(course)) // Wrapped in dispatch function to send aciton to reducer, instead of just return the action object
		actions: bindActionCreators(courseActions, dispatch) // Automatically wrap all action functions in CourseActions in a dispatch call
	};
}

// No mapDispatchToProps, therefore there is a usable dispatch prop
// mapStateToProps/mapDispatchToProps arent required names, can also be created inline
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage); // Double paranthesis due to 2 function calls (the first returns a function to handle the second)
