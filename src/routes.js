import React from 'react';
import { Route, IndexRoute } from 'react-router'; // Route for a specific route, indexRoute for a root route ('/')
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import CoursesPage from './components/course/CoursesPage';
import ManageCoursePage from './components/course/ManageCoursePage'; // eslint-disable-line import/no-named-as-default

export default (
	<Route path="/" component={App}> // Load the app component, then nest the other components inside it as children
		// Since these routes are inside the App route, they will be sent as chilren to the App component, the child depends on the route
		<IndexRoute component={HomePage} /> // If someone just goes to '/', they will get the homepage
		<Route path="courses" component={CoursesPage} /> // If someone adds '/about', they will get the about page
		<Route path="course" component={ManageCoursePage} />
		<Route path="course/:id" component={ManageCoursePage} />
		<Route path="about" component={AboutPage} />
	</Route>
);
