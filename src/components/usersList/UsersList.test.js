import { screen, waitFor, prettyDOM, render } from '@testing-library/react';
import { renderRouterControlledElement } from '../../setupTests';
import UsersList from './UsersList';
import { defer } from 'react-router-dom';

const mockGists = {
	data: [
		{
			owner: {
				login: 'Darren',
				avatar_url: 'https://avatars.githubusercontent.com/u/1315907?v=4',
			},
			public: true,
		},
	],
};

const mockGistsFetcher = new Promise(resolve => {
	setTimeout(() => {
		resolve(mockGists);
	}, 100);
});

const mockLoader = () => {
	return defer({
		gists: mockGistsFetcher,
	});
};

describe('<UsersList />', () => {
	test('should display loading text as data is coming in', async () => {
		renderRouterControlledElement(<UsersList />, { loader: mockLoader });

		await waitFor(() => {
			const loadingText = screen.getByText(/Loading users list/i);
			expect(loadingText).toBeInTheDocument();
		});
	});

	test('should display user(s) when data loaded', async () => {
		renderRouterControlledElement(<UsersList />, { loader: mockLoader });

		await waitFor(async () => {
			const listItems = await screen.findAllByRole('listitem');
			expect(listItems).toHaveLength(1);
		});
	});
});
