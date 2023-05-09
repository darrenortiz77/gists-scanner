import { render, screen } from '@testing-library/react';
import ForksList from './ForksList';

describe('<ForksList />', () => {
	const missingText = 'No forks exist.';

	test('should render list of Forks', () => {
		const mockForks = [
			{
				id: 'asdf',
				html_url: 'http://google.com',
				updated_at: '2011-10-05T14:48:00.000Z',
				owner: {
					avatar_url: 'https://avatars.githubusercontent.com/u/1315907?v=4',
					login: 'Darren',
				},
			},
			{
				id: 'qwer',
				html_url: 'http://google.ca',
				updated_at: '2011-10-05T14:48:00.000Z',
				owner: {
					avatar_url: 'https://avatars.githubusercontent.com/u/1315907?v=4',
					login: 'Ortiz',
				},
			},
		];

		render(<ForksList forks={mockForks} />);

		expect(screen.queryByText(missingText)).not.toBeInTheDocument();
		expect(screen.getAllByRole('listitem')).toHaveLength(mockForks.length);
	});

	test('should render "No forks exist" if array is empty', () => {
		render(<ForksList forks={[]} />);
		expect(screen.getByText(missingText)).toBeInTheDocument();
	});

	test('should render "No forks exist" if no forks passed in', () => {
		render(<ForksList />);
		expect(screen.getByText(missingText)).toBeInTheDocument();
	});
});
