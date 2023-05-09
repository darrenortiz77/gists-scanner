// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

beforeAll(() => {
	// jest.spyOn(console, 'log').mockImplementation(() => {});
	// jest.spyOn(console, 'error').mockImplementation(() => {});
	// jest.spyOn(console, 'warn').mockImplementation(() => {});
	// jest.spyOn(console, 'info').mockImplementation(() => {});
	// jest.spyOn(console, 'debug').mockImplementation(() => {});
});

export const renderRouterControlledElement = (childNode, { action, loader } = {}) => {
	const routes = [
		{
			path: '/',
			element: childNode,
			action: action,
			loader: loader,
		},
	];

	const router = createMemoryRouter(routes);

	render(<RouterProvider router={router} />);
};
