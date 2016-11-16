export function authorsFormattedForDropdown(authors) { // Refactor of function below, used in mapStateToProps
	return authors.map(author => {
		return {
			value: author.id,
			text: author.firstName + ' ' + author.lastName
		};
	});
}

// const authorsFormattedForDropdown = state.authors.map(author => {
// 	return {
// 		value: author.id,
// 		text: author.firstName + ' ' + author.lastName
// 	};
// });
