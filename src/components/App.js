// This component handles the App template used on every page.
import React, {PropTypes} from 'react';
import Header from './common/Header';
import { connect } from 'react-redux';

class App extends React.Component {
	render() {
		return (
			<div className="container-fluid">
				<Header
					loading={this.props.loading}
				/>
				{this.props.children} {/* HTML content passed in from react-router */}
			</div>
		);
	}
}

// Proptype validation
App.propTypes = {
	children: PropTypes.object.isRequired, // Makes children a required propType
	loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
	return {
		loading: state.ajaxCallsInProgress > 0 // Boolean whether there are ajax calls running
	};
}

export default connect(mapStateToProps)(App);
