import { render, screen } from '@testing-library/react';
import TitledSection from './TitledSection';

describe('<TitledSection />', () => {
	test('should render title', () => {
		const titleTxt = 'My title';
		render(<TitledSection title={titleTxt} />);

		const title = screen.getByText(titleTxt);
		expect(title).toBeInTheDocument();
	});

	test('supports children', () => {
		const childTxt = 'Some child paragraph';
		render(
			<TitledSection>
				<p>{childTxt}</p>
			</TitledSection>
		);

		const child = screen.getByText(childTxt);
		expect(child).toBeInTheDocument();
	});
});
