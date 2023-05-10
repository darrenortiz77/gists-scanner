import { screen } from '@testing-library/react';
import { renderRouterControlledElement } from '../../setupTests';
import UsersList from './UsersList';
import { getGists } from '../../data/github-api';

const renderUsersList = () => {
	renderRouterControlledElement(<UsersList />, { loader: getGists });
};

describe('<UsersList />', () => {
	test('should display loading text as data is coming in', async () => {
		renderUsersList();

		const loadingText = await screen.findByText(/Loading users list/i);
		const listItems = screen.queryAllByRole('listitem');
		expect(loadingText).toBeInTheDocument();
		expect(listItems.length).toBe(0);
	});

	test('should display user(s) when data loaded', async () => {
		renderUsersList();

		const listItems = await screen.findAllByRole('listitem');
		const loadingText = screen.queryByText(/Loading users list/i);
		expect(listItems.length).toBeGreaterThan(0);
		expect(loadingText).not.toBeInTheDocument();
	});
});
