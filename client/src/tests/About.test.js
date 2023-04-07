import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About/About';

describe('About component', () => {
	it('renders the component', () => {
		const { getByText, getByAltText } = render(<About />);
		const title = getByText('Proyecto Individual (PI) Dogs');
		const description = getByText(/El presente proyecto individual \(PI\) es acerca de perros/i);
		const image = getByAltText('Node & React');

		expect(title).toBeInTheDocument();
		expect(description).toBeInTheDocument();
		expect(image).toBeInTheDocument();
	});
});