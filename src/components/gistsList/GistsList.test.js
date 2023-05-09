import { render, screen } from '@testing-library/react';
import GistsList from './GistsList';
import * as utils from '../../utils';
import { MemoryRouter } from 'react-router-dom';

const getNumPagesMock = jest.spyOn(utils, 'getNumPages');

const renderGists = mockGists => {
	render(
		<MemoryRouter initialEntries={['/user/someuser/1']}>
			<GistsList gists={mockGists} />
		</MemoryRouter>
	);
};

describe('<GistsList />', () => {
	test('should render list of Gists', () => {
		const mockGists = {
			headers: {
				link: '',
			},
			data: [
				{
					id: 'asdf',
					created_at: '2011-10-05T14:48:00.000Z',
					description: 'First gist description',
					files: {},
				},
				{
					id: 'qwer',
					created_at: '2012-10-05T14:48:00.000Z',
					description: 'Second gist description',
					files: {},
				},
			],
		};

		renderGists(mockGists);

		mockGists.data.forEach(gist => {
			const formattedDate = utils.formatDate(gist.created_at);
			const gistElm = screen.getByText(gist.description);
			const anchor = screen.getByText(formattedDate);

			expect(gistElm).toBeInTheDocument();
			expect(anchor).toBeInTheDocument();
			expect(anchor).toHaveAttribute('href', `/gist/${gist.id}`);
		});

		expect(screen.getAllByRole('listitem')).toHaveLength(mockGists.data.length);
	});

	test('should render pagination if more than one page', () => {
		const mockGists = {
			headers: {
				link: '',
			},
			data: [],
		};

		getNumPagesMock.mockImplementation(() => 5);

		renderGists(mockGists);

		expect(screen.getByText('Next page')).toBeInTheDocument();
	});

	test('should not render pagination if only one page', () => {
		const mockGists = {
			headers: {
				link: '',
			},
			data: [],
		};

		getNumPagesMock.mockImplementation(() => 1);

		renderGists(mockGists);

		expect(screen.queryByText('Next page')).not.toBeInTheDocument();
	});
});
