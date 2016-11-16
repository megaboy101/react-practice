import expect from 'expect'; // Assertion library
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import CourseForm from './CourseForm'; // Actual component

// Setup function for React Test Utils, makes testin gin long run faster and easier
function setup(saving) {
	// Props, set seperately for readability
	let props = { // Use spread operator below to inject props
		course: {},
		saving: saving,
		errors: {},
		onSave: () => {},
		onChange: () => {}
	};
	let renderer = TestUtils.createRenderer(); // Instance of the renderer
	renderer.render(<CourseForm {...props} />); // Render the CourseForm component
	let output = renderer.getRenderOutput(); // Get output of rendered component

	return { // Return object of set props, output of test, and renderer if necessary
		props,
		output,
		renderer
	};
}

// Describe block groups together and labels tests, nest tests inside
describe('CourseForm via React Test utils', () => {
	// Ensures a form and h1 tag are rendered to DOM
	it('renders form and h1', () => { // it describes what your trying to test
		const { output } = setup(); // Variable holding ouput only of test setup
		expect(output.type).toBe('form'); // Expect top level tag to be a form
		let [ h1 ] = output.props.children; // props.children is an array of element names, this is taking the first element
		expect(h1.type).toBe('h1'); // Expect the h1 varible to have the type h1
	});

	// Ensure save button says save when not saving
	it('save button is labeled "Save" when not saving', () => {
		const { output } = setup(false);
		const submitButton = output.props.children[5]; // Get 6th child element (input)
		expect(submitButton.props.value).toBe('Save'); // Expect value prop of input component to be "Save"
	});

	// Ensure save button says saving when saving
	it('save button is labeled "Saving..." when saving', () => {
		const { output } = setup(true);
		const submitButton = output.props.children[5]; // Get 6th child element (input)
		expect(submitButton.props.value).toBe('Saving...'); // Expect value prop of input component to be "Save"
	});
});
