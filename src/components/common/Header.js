import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';

const Header = ({ loading } /* destructured props from parent component */) => {
	// activeClassName: when route is active, or when on route, add class
	// This way, the current route has a highlighted nav name
	return (
		<nav>
			<IndexLink to="/" activeClassName="active">Home</IndexLink>
			{" | "}
			<Link to="/courses" activeClassName="active">Courses</Link>
			{" | "}
			<Link to="/about" activeClassName="active">About</Link>
			{/* Will only displey the LoadingDots component if loading is true */}
			{loading && <LoadingDots interval={100} dots={20} />} {/* Pre-loader component of dots */}
		</nav>
	);
};

Header.propTypes = {
	loading: PropTypes.bool.isRequired
};

export default Header;
