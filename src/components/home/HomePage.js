import React from 'react';
import {Link} from 'react-router'; // In braces since its a specific named component

class HomePage extends React.Component {
	render() {
		return (
			<div className="jumbotron">
				<h1>Pluralsight Administration</h1>
				<p>React, Redux, and React Router in ES6 for ultra-responsive web apps</p>
				<Link to="about" className="btn btn-primary btn-lg">Learn more</Link> {/* Named router component, links to about page */}
			</div>
		);
	}
}

export default HomePage; // Default means not name specific/no braces on import
