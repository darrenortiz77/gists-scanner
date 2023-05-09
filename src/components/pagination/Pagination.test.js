import { render, screen } from '@testing-library/react';
import Pagination from './Pagination';
import { MemoryRouter } from 'react-router-dom';

const renderPagination = (numPages, currentPage, maxPagination = 10) => {
	render(
		<MemoryRouter initialEntries={[`/user/someuser/${currentPage}`]}>
			<Pagination urlPattern="" numPages={numPages} currentPage={currentPage} maxPagination={maxPagination} />
		</MemoryRouter>
	);
};

const expectToBeInDocument = pageNums => {
	pageNums.forEach(num => {
		expect(screen.getByText(`${num}`)).toBeInTheDocument();
	});
};

const expectNotToBeInDocument = pageNums => {
	pageNums.forEach(num => {
		expect(screen.queryByText(`${num}`)).not.toBeInTheDocument();
	});
};

describe('<Pagination />', () => {
	test('should render pagination links if more than one page', () => {
		renderPagination(5, 1);
		expect(screen.getByText('Next page')).toBeInTheDocument();
	});

	test('should NOT render pagination links if only one page', () => {
		renderPagination(1, 1);
		expect(screen.queryByText('Next page')).not.toBeInTheDocument();
	});

	test('should not display pagination numbers higher than max pages', () => {
		renderPagination(11, 1, 10);
		expect(screen.queryByText('11')).not.toBeInTheDocument();
	});

	test('"first page" and "last page" links should be visible if num pages is > max pages', () => {
		renderPagination(11, 1, 10);
		expect(screen.getByText('First page')).toBeInTheDocument();
		expect(screen.getByText('Last page')).toBeInTheDocument();
	});

	test('"first page" and "last page" links should NOT be visible if num pages is <= max pages', () => {
		renderPagination(10, 1, 10);
		expect(screen.queryByText('First page')).not.toBeInTheDocument();
		expect(screen.queryByText('Last page')).not.toBeInTheDocument();
	});

	describe('even-num max pages (4)', () => {
		test('correct pagination numbers appear if page 1 of 20', () => {
			renderPagination(20, 1, 4);
			expectToBeInDocument([1, 2, 3, 4]);
			expectNotToBeInDocument([5]);
		});

		test('correct pagination numbers appear if page 2 of 20', () => {
			renderPagination(20, 2, 4);
			expectToBeInDocument([1, 2, 3, 4]);
			expectNotToBeInDocument([5]);
		});

		test('correct pagination numbers appear if page 3 of 20', () => {
			renderPagination(20, 3, 4);
			expectToBeInDocument([2, 3, 4, 5]);
			expectNotToBeInDocument([1, 6]);
		});

		test('correct pagination numbers appear if page 4 of 20', () => {
			renderPagination(20, 4, 4);
			expectToBeInDocument([3, 4, 5, 6]);
			expectNotToBeInDocument([2, 7]);
		});

		test('correct pagination numbers appear if page 10 of 20', () => {
			renderPagination(20, 10, 4);
			expectToBeInDocument([9, 10, 11, 12]);
			expectNotToBeInDocument([8, 13]);
		});

		test('correct pagination numbers appear if page 18 of 20', () => {
			renderPagination(20, 18, 4);
			expectToBeInDocument([17, 18, 19, 20]);
			expectNotToBeInDocument([16]);
		});

		test('correct pagination numbers appear if page 20 of 20', () => {
			renderPagination(20, 18, 4);
			expectToBeInDocument([17, 18, 19, 20]);
			expectNotToBeInDocument([16]);
		});
	});

	describe('odd-num max pages (3)', () => {
		test('correct pagination numbers appear if page 1 of 20', () => {
			renderPagination(20, 1, 3);
			expectToBeInDocument([1, 2, 3]);
			expectNotToBeInDocument([4]);
		});

		test('correct pagination numbers appear if page 2 of 20', () => {
			renderPagination(20, 2, 3);
			expectToBeInDocument([1, 2, 3]);
			expectNotToBeInDocument([4]);
		});

		test('correct pagination numbers appear if page 3 of 20', () => {
			renderPagination(20, 3, 3);
			expectToBeInDocument([2, 3, 4]);
			expectNotToBeInDocument([1, 5]);
		});

		test('correct pagination numbers appear if page 10 of 20', () => {
			renderPagination(20, 10, 3);
			expectToBeInDocument([9, 10, 11]);
			expectNotToBeInDocument([8, 12]);
		});

		test('correct pagination numbers appear if page 19 of 20', () => {
			renderPagination(20, 19, 3);
			expectToBeInDocument([18, 19, 20]);
			expectNotToBeInDocument([17]);
		});

		test('correct pagination numbers appear if page 20 of 20', () => {
			renderPagination(20, 20, 3);
			expectToBeInDocument([18, 19, 20]);
			expectNotToBeInDocument([17]);
		});
	});
});
