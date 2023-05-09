import { render, screen } from '@testing-library/react';
import FileBadge from './FileBadge';

describe('<FileBadge />', () => {
	test('should render text', () => {
		const testTxt = 'test text';
		render(<FileBadge text={testTxt} />);

		const txt = screen.getByText(testTxt);
		expect(txt).toBeInTheDocument();
	});
});
