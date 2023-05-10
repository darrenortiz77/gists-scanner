import SearchUserForm from './SearchUserForm';
import { renderRouterControlledElement } from '../../setupTests';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as githubApi from '../../data/github-api';

/**
 * Render the search form wrapped in a memory router.
 * Pass its default submit action (API calls are mocked).
 * Can overide with different mock action via `action` argument.
 */
const renderSearchForm = () => {
	renderRouterControlledElement(<SearchUserForm />, { action: githubApi.searchUser });
};

/**
 * Get the search input.
 */
const getInput = () => {
	return screen.getByLabelText(/Enter a GitHub username/i);
};

afterEach(() => {
	jest.restoreAllMocks();
});

/**
 * Actual tests
 */
describe('<SearchUserForm />', () => {
	test('should render', () => {
		renderSearchForm();
		const input = getInput();
		expect(input).toBeInTheDocument();
	});

	test('search input should have focus on mount', () => {
		renderSearchForm();
		const input = getInput();
		expect(input).toHaveFocus();
	});

	test('input value should change when typing in it', async () => {
		renderSearchForm();
		const input = getInput();
		const user = userEvent.setup();
		await user.type(input, 'Hello world!');
		expect(input).toHaveValue('Hello world!');
	});

	test('should call submit action when hitting enter', async () => {
		jest.spyOn(githubApi, 'searchUser');
		renderSearchForm();
		const input = getInput();
		const user = userEvent.setup();
		await user.click(input);
		await user.keyboard('{Enter}');
		expect(githubApi.searchUser).toHaveBeenCalled();
	});

	test('should display "Searching..." while form is being processed', async () => {
		renderSearchForm();

		const input = getInput();
		const user = userEvent.setup();

		await user.type(input, 'asdf');
		await user.keyboard('{Enter}');

		const searching = await screen.findByText(/Searching/i);
		expect(searching).toBeInTheDocument();
	});

	test('should display validation error if username is empty', async () => {
		renderSearchForm();

		const input = getInput();
		const user = userEvent.setup();

		await user.clear(input);
		await user.keyboard('{Enter}');

		const error = await screen.findByText(/Please enter a username/i);
		expect(error).toBeInTheDocument();
		expect(input).toHaveFocus();
	});

	test('should show "no gists" message if valid user, but has no gists', async () => {
		renderSearchForm();

		const input = getInput();
		const user = userEvent.setup();

		await user.type(input, 'no-gists');
		await user.keyboard('{Enter}');

		const error = await screen.findByText(/User exists but has no gists/i);
		expect(error).toBeInTheDocument();
		expect(input).toHaveFocus();
	});

	test('should show rate-limit error', async () => {
		renderSearchForm();

		const input = getInput();
		const user = userEvent.setup();

		await user.type(input, 'rate-limit');
		await user.keyboard('{Enter}');

		const error = await screen.findByText(/Rate limit reached/i);
		expect(error).toBeInTheDocument();
		expect(input).toHaveFocus();
	});

	test('should display user not found if 404 returned', async () => {
		renderSearchForm();

		const input = getInput();
		const user = userEvent.setup();

		await user.type(input, 'throw-error');
		await user.keyboard('{Enter}');

		const error = await screen.findByText(/User does not exist/i);
		expect(error).toBeInTheDocument();
		expect(input).toHaveFocus();
	});
});
