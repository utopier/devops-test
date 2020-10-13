/* eslint-disable */
import React from 'react';
import About from '../about';
import { render, screen } from '@testing-library/react';

describe('about page', () => {
	it('matches snapshot', () => {
		const utils = render(<About />);
		expect(utils.container).toMatchSnapshot();
	});
	it('about text', () => {
		const utils = render(<About />);
		utils.findByText('about');
	});
});
