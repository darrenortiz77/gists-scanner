import SearchUserForm from './SearchUserForm';
import { renderRouterControlledElement } from '../../setupTests';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { searchUser } from '../../data/github-api';

const mockSubmitAction = jest.fn();

const getInput = () => {
	return screen.getByLabelText(/Enter a GitHub username/i);
};

describe('<SearchUserForm />', () => {
	test('should render', () => {
		renderRouterControlledElement(<SearchUserForm />);
		const input = getInput();
		expect(input).toBeInTheDocument();
	});

	test('search input should have focus on mount', () => {
		renderRouterControlledElement(<SearchUserForm />);
		const input = getInput();
		expect(input).toHaveFocus();
	});

	test('input value should change when typing in it', async () => {
		renderRouterControlledElement(<SearchUserForm />);
		const input = getInput();
		const user = userEvent.setup();
		await user.type(input, 'Hello world!');
		expect(input).toHaveValue('Hello world!');
	});

	test('should call submit action when hitting enter', async () => {
		renderRouterControlledElement(<SearchUserForm />, { action: mockSubmitAction });
		const input = getInput();
		const user = userEvent.setup();
		await user.click(input);
		await user.keyboard('{Enter}');
		expect(mockSubmitAction).toHaveBeenCalled();
	});

	test('should display "Searching..." while form is being processed', async () => {
		mockSubmitAction.mockImplementationOnce(() => {
			return new Promise(resolve => {
				setTimeout(() => {
					resolve(true);
				}, 100);
			});
		});

		renderRouterControlledElement(<SearchUserForm />, { action: mockSubmitAction });

		const input = getInput();
		const user = userEvent.setup();

		await act(async () => {
			await user.click(input);
			await user.keyboard('{Enter}');
		});

		const searching = await screen.findByText(/Searching/i);
		expect(searching).toBeInTheDocument();
	});

	test.only('should display error if error returned and input should regain focus', async () => {
		mockSubmitAction.mockReturnValueOnce({ error: 'My test error' });

		renderRouterControlledElement(<SearchUserForm />, { action: mockSubmitAction });

		const input = getInput();
		const user = userEvent.setup();

		await user.click(input);
		await user.keyboard('{Enter}');

		const error = await screen.findByText('My test error');
		expect(error).toBeInTheDocument();
		expect(input).toHaveFocus();
	});

	test.only('should display validation error if username is empty', async () => {
		// Testing with actual route action since it shouldn't hit the API in this case
		renderRouterControlledElement(<SearchUserForm />, { action: searchUser });

		const input = getInput();
		const user = userEvent.setup();

		await user.click(input);
		await user.keyboard('{Enter}');

		const error = await screen.findByText('Please enter a username.');
		expect(error).toBeInTheDocument();
		expect(input).toHaveFocus();
	});
});
