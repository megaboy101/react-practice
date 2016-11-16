import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import { ManageCoursePage } from './ManageCoursePage';

describe ('Manage Course Page', () => {
	it('sets error message when trying to save empty title', () => {
		const props = {
			authors: [],
			actions: {saveCourse: () => { // Pass in actions (like onClick, onChange, etc.); mock action that always succeeds (always saves)
				return Promise.resolve();
			}},
			course: {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''}
		};

		const wrapper = mount(<ManageCoursePage {...props} />); // Uses mount instead of shallow to test ManageCoursePage and its child components
	// const wrapper = mount(<Provider store={store}><ManageCoursePage /></Provider>)' // Provides store context (to allow for inherited state)
		const saveButton = wrapper.find('input').last();
		expect(saveButton.prop('type')).toBe('submit'); // Expect saveButton to be a submit type button, used since wrapper now include ManageCoursePage and all its children, so it complicated
		saveButton.simulate('click'); // Simulates a click of the save button, enzyme can simulate any event
		expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.'); // Expect a save failure to have the title "Title must have..."
	});
});
