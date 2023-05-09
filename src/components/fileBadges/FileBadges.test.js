import { render, screen } from '@testing-library/react';
import FileBadges from './FileBadges';

describe('<FileBadges />', () => {
	test('should render a single badge for each unique filetype', () => {
		const mockFiles = {
			one: {
				language: 'Javascript',
			},
			two: {
				language: 'Typescript',
			},
			three: {
				language: 'Javascript',
			},
		};

		render(<FileBadges files={mockFiles} />);

		const js = screen.getByText('Javascript'); // this would throw an error if more than one is found
		const ts = screen.getByText('Typescript');

		expect(js).toBeInTheDocument();
		expect(ts).toBeInTheDocument();
	});
});
