import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routerConfig } from '../../App';
import { render, screen, waitFor, within } from '@testing-library/react';

describe('<Breadcrumbs />', () => {
	test('should not render breadcrumbs on homepage', async () => {
		const router = createMemoryRouter(routerConfig, { initialEntries: ['/'] });
		render(<RouterProvider router={router} />);

		await waitFor(() => {
			const breadcrumbs = screen.queryByTestId('breadcrumbs');
			expect(breadcrumbs).not.toBeInTheDocument();
		});
	});

	test('should render search/username on user page', async () => {
		const router = createMemoryRouter(routerConfig, { initialEntries: ['/user/darren'] });
		render(<RouterProvider router={router} />);

		const breadcrumbs = await screen.findByTestId('breadcrumbs');

		const search = within(breadcrumbs).getByText('search');
		const username = within(breadcrumbs).getByText('darren');
		expect(search).toBeInTheDocument();
		expect(username).toBeInTheDocument();
	});

	test('should render search/gistID on gist details page', async () => {
		const router = createMemoryRouter(routerConfig, { initialEntries: ['/gist/1234'] });
		render(<RouterProvider router={router} />);

		const breadcrumbs = await screen.findByTestId('breadcrumbs');

		const search = within(breadcrumbs).getByText('search');
		const gistId = within(breadcrumbs).getByText('1234');
		expect(search).toBeInTheDocument();
		expect(gistId).toBeInTheDocument();
	});
});
