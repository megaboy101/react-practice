import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import toastr from 'toastr'; // Notification library

class ManageCoursePage extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			course: Object.assign({}, props.course),
			errors: {},
			saving: false // State unique to this component, rest of the app doesnt need it
		};

		this.updateCourseState = this.updateCourseState.bind(this);
		this.saveCourse = this.saveCourse.bind(this);
	}

	componentWillReceiveProps(nextProps) { // Used for when props change midway through (like loaded from an api)
		if (this.props.course.id != nextProps.course.id) {
			this.setState({course: Object.assign({}, nextProps.course)});
		}
	}

	// Works with all form fields by working with the value of the corresponding name property
	updateCourseState(event) {
		const field = event.target.name;
		let course = this.state.course;
		course[field] = event.target.value;
		return this.setState({course: course});
	}

	saveCourse(event) {
		event.preventDefault();
		this.setState({saving: true});

		this.props.actions.saveCourse(this.state.course)
			// Force the page to redirect to courses upon saving, requires setup below
			.then(() => this.redirect()) // Create a promise from the thunk actions.saveCourse so the save function waits to redirect until the save has been completed
			// If the title length is 0 (no title inputted), api throws error
			.catch(error => {
				toastr.error(error); // Throw a toastr styled error message
				this.setState({saving: false}); // Remember to set state of saving back off
			});
	}

	redirect() { // Redirect page to /courses
		this.setState({saving: false});
		toastr.success('Course saved');
		this.context.router.push('/courses');
	}

	render() {
		return (
			<CourseForm
				allAuthors={this.props.authors}
				onChange={this.updateCourseState}
				onSave={this.saveCourse}
				course={this.state.course}
				errors={this.state.errors}
				saving={this.state.saving}
			/>
		);
	}
}

ManageCoursePage.propTypes = {
	course: PropTypes.object.isRequired,
	authors: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired
};

// Static property, must go past class definition. This pulls in react-router context for use on this.context.router
ManageCoursePage.contextTypes = {
	router: PropTypes.object // Not required to avoid experimental warnings on context
};

function getCourseById(courses, id) {
	const course = courses.filter(course => course.id == id);
	if (course.length) return course[0]; // Get the first id, since filter creates an array
	return null;
}

function mapStateToProps(state, ownProps) {
	const courseId = ownProps.params.id; // from the path '/course/:id'

	let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

	if (courseId && state.courses.length > 0 /* Make sure the course list has loaded */) {
		course = getCourseById(state.courses, courseId);
	}

	const authorsFormattedForDropdown = state.authors.map(author => {
		return {
			value: author.id,
			text: author.firstName + ' ' + author.lastName
		};
	});

	return {
		course: course,
		authors: authorsFormattedForDropdown
	};
}

function mapDispatchToProps(dispatch) {
	return {
		// Turns redux actions to this.props.actions
		actions: bindActionCreators(courseActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
