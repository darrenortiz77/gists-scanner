import { render, screen } from '@testing-library/react';
import FilesList from './FilesList';

describe('<FilesList />', () => {
	test('should render a list of files', () => {
		const mockFiles = {
			'hello-world.js': {
				filename: 'hello-world.js',
				language: 'Javascript',
				size: 123,
			},
			'types.d.ts': {
				filename: 'types.d.ts',
				language: 'Typescript',
				size: 123,
			},
			'.gitignore': {
				filename: '.gitignore',
				language: '',
				type: 'text/plain',
				size: 123,
			},
		};

		render(<FilesList files={mockFiles} />);

		Object.values(mockFiles).forEach(file => {
			const filename = screen.getByText(file.filename);
			expect(filename).toBeInTheDocument();
		});

		expect(screen.getAllByRole('listitem')).toHaveLength(3);
	});
});
