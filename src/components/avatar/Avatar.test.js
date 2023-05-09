import { render, screen } from '@testing-library/react';
import Avatar from './Avatar';

describe('<Avatar />', () => {
	test('should render an image', () => {
		render(<Avatar avatarUrl="https://avatars.githubusercontent.com/u/1315907?v=4" username="Darren" />);

		const img = screen.getByRole('img');
		expect(img).toBeInTheDocument();
	});
});
