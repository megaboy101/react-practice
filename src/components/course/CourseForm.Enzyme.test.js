import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme'; // Shallow is a wrapper over TestUtils shallow renderer
import TestUtils from 'react-addons-test-utils'; // Dont need to import, already done so by enzyme
import CourseForm from './CourseForm';

// No required, just made for convenience
function setup(saving) {
	const props = {
		course: {},
		saving: saving,
		errors: {},
		onSave: () => {},
		onChange: () => {}
	};

	return shallow(<CourseForm {...props} />); // Shallow render CourseForm with the defined props
}

describe('CourseForm via Enzyme', () => {
	it('renders form and h1', () => {
		const wrapper = setup(false); // Component to test
		// Tests on component (wrapper)
		expect(wrapper.find('form').length).toBe(1); // Expect to find one form
		expect(wrapper.find('h1').text()).toEqual('Manage Course'); // Expect to find a h1 with text "Manage Course"
	});

	it('save button is labeled "Save" when not saving', () => {
		const wrapper = setup(false);
		expect(wrapper.find('input').props().value).toBe('Save');
	});

	it ('save button is labeled "Saving..." when saving', () => {
		const wrapper = setup(true);
		expect(wrapper.find('input').props().value).toBe('Saving...');
	});
});
