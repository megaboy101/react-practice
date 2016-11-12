// Filename capitalized by convention of react class
// Not a functional component due to need for a class in hot-reloading

import React from 'react';

class AboutPage extends React.Component {
	render() {
		return (
			<div>
				<h1>About</h1>
				<p>This application uses React, Redux, React Router, and a variety of other helpful libraries</p>
			</div>
		);
	}
}

export default AboutPage;
