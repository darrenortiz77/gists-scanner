import { render, screen } from '@testing-library/react';
import App, { routerConfig } from './App';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

const renderPage = (path = '/') => {
	const router = createMemoryRouter(routerConfig, { initialEntries: [path] });
	render(<RouterProvider router={router} />);
};

describe('Routing', () => {
	test('homepage/search page', async () => {
		renderPage();
		const heading = await screen.findByRole('heading', { name: 'Gists Scanner', level: 1 });
		expect(heading).toBeInTheDocument();
	});

	test('users results page', async () => {
		renderPage('/user/asdf');
		const heading = await screen.findByRole('heading', { name: 'Gists for asdf', level: 1 });
		expect(heading).toBeInTheDocument();
	});

	test('users results paginated', async () => {
		renderPage('/user/asdf/2');
		const heading = await screen.findByRole('heading', { name: 'Gists for asdf', level: 1 });
		expect(heading).toBeInTheDocument();
	});

	test('gist details page', async () => {
		renderPage('/gist/asdf');
		const heading = await screen.findByRole('heading', { name: /Gist Details for/i, level: 1 });
		expect(heading).toBeInTheDocument();
	});

	test('404', async () => {
		renderPage('/kjhgkjhgkjhg');
		const heading = await screen.findByRole('heading', { name: '404', level: 1 });
		expect(heading).toBeInTheDocument();
	});
});
