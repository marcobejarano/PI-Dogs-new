import React from 'react';
import { render } from '@testing-library/react';
import FormSuccess from '../components/FormSuccess/FormSuccess';

describe('FormSuccess component', () => {
	it('renders the success message', () => {
		const { getByText } = render(<FormSuccess />);
		const successMessage = getByText(/Form has been successfully sent/i);
		expect(successMessage).toBeInTheDocument();
	});

	it('renders image with the correct attributes', () => {
		const { getByAltText } = render(<FormSuccess />);
		const huskyImage = getByAltText('husky');
		expect(huskyImage).toBeInTheDocument();
		expect(huskyImage).toHaveAttribute('src', 'husky.jpg');
	});
});