import { screen } from '@testing-library/react';
import User from './User';
import { renderRouterControlledElement } from '../../setupTests';

describe('<User />', () => {
	test('should render an image and username', () => {
		renderRouterControlledElement(
			<User avatarUrl="https://avatars.githubusercontent.com/u/1315907?v=4" username="Darren" />
		);
		expect(screen.getByRole('img')).toBeInTheDocument();
		expect(screen.getByText('Darren')).toBeInTheDocument();
	});

	test('should not render a link if targetUrl is empty or missing', () => {
		renderRouterControlledElement(
			<User avatarUrl="https://avatars.githubusercontent.com/u/1315907?v=4" username="Darren" />
		);
		expect(screen.queryByRole('link')).not.toBeInTheDocument();
	});

	test('should render a link if targetUrl is passed in', () => {
		renderRouterControlledElement(
			<User avatarUrl="https://avatars.githubusercontent.com/u/1315907?v=4" username="Darren" targetUrl="#" />
		);
		expect(screen.getByRole('link')).toBeInTheDocument();
	});

	test("link should open in new tab if it's an external link", () => {
		renderRouterControlledElement(
			<User
				avatarUrl="https://avatars.githubusercontent.com/u/1315907?v=4"
				username="Darren"
				targetUrl="http://google.com"
			/>
		);
		expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
	});

	test("link should open same window/tab if it's an internal link", () => {
		renderRouterControlledElement(
			<User avatarUrl="https://avatars.githubusercontent.com/u/1315907?v=4" username="Darren" targetUrl="/" />
		);
		expect(screen.getByRole('link')).not.toHaveAttribute('target');
	});
});
