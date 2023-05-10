import * as reactRouterDom from 'react-router-dom';
import { getGistDetails, getGists, getUsersGists, searchUser } from './github-api';

// jest.mock('react-router-dom', () => {
// 	const originalModule = jest.requireActual('react-router-dom');

// 	return {
// 		__esModule: true,
// 		...originalModule,
// 		redirect: jest.fn(),
// 	};
// });

/*
NOTE: all tests below are being skipped on purpose.
Bad practice to test the actual API itself.
Best to mock it and test app itself.
*/

describe('getGists()', () => {
	test.skip('gets public gists', () => {
		const response = getGists();
		const gists = response.data.gists;
		return expect(gists).resolves.toBeTruthy();
	});

	test.skip('returns gists in format we expect', async () => {
		const response = getGists();
		const gists = await response.data.gists;
		expect(gists.data).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					public: true,
					owner: expect.objectContaining({
						login: expect.any(String),
						avatar_url: expect.any(String),
					}),
				}),
			])
		);
	});
});

describe('searchUser()', () => {
	const fakeRequest = username => {
		return {
			formData: () => {
				return {
					get: () => {
						return username;
					},
				};
			},
		};
	};

	test.skip('user with gists should redirect to user/:username', async () => {
		const username = 'darrenortiz77';
		const request = fakeRequest(username);
		await searchUser({ request });
		expect(reactRouterDom.redirect).toHaveBeenCalledWith(`/user/${username}`);
	});

	test.skip('existing user with zero gists should return error response', async () => {
		const username = 'asdf';
		const request = fakeRequest(username);
		const response = await searchUser({ request });
		const json = await response.json();
		expect(json).toEqual(expect.objectContaining({ error: expect.any(String) }));
	});

	test.skip('non-existant user should return error response', async () => {
		const username = 'oihasdfgnaisdfubnasdfi4iubasdfbnasidfu';
		const request = fakeRequest(username);
		const response = await searchUser({ request });
		const json = await response.json();
		expect(json).toEqual(expect.objectContaining({ error: expect.any(String) }));
	});
});

describe('getUsersGists()', () => {
	test.skip('gets a users gists', () => {
		const response = getUsersGists({ params: { username: 'darrenortiz77' } });
		const gists = response.data.gists;
		return expect(gists).resolves.toBeTruthy();
	});
	test.skip('returns gists in format we expect', async () => {
		const response = getUsersGists({ params: { username: 'darrenortiz77' } });
		const gists = await response.data.gists;
		expect(gists.data).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					id: expect.any(String),
					created_at: expect.any(String),
					public: true,
					owner: expect.objectContaining({
						login: expect.any(String),
						avatar_url: expect.any(String),
					}),
					files: expect.anything(),
					// TODO: can't figure out syntax to test structure of files since the keys within are dynamic
					// files: expect.anything(
					// 	expect.objectContaining({
					// 		language2: expect.any(String),
					// 		type: expect.any(String),
					// 		filename: expect.any(String),
					// 	})
					// ),
				}),
			])
		);
	});
});

describe('getGistDetails()', () => {
	test.skip('gets gist details', () => {
		const response = getGistDetails({ params: { gistId: '2abd4f38fd6177003a176e4a02e13be1' } });
		const gistData = response.data.gistData;
		return expect(gistData).resolves.toBeTruthy();
	});

	test.skip('gets fork details', () => {
		const response = getGistDetails({ params: { gistId: '2abd4f38fd6177003a176e4a02e13be1' } });
		const forkData = response.data.forkData;
		return expect(forkData).resolves.toBeTruthy();
	});

	test.skip('returns gists in format we expect', async () => {
		const response = getGistDetails({ params: { gistId: '2abd4f38fd6177003a176e4a02e13be1' } });
		const gists = await response.data.gistData;
		expect(gists.data).toEqual(
			expect.objectContaining({
				html_url: expect.any(String),
				owner: expect.objectContaining({
					login: expect.any(String),
					avatar_url: expect.any(String),
					html_url: expect.any(String),
				}),
				files: expect.anything(),
			})
		);
	});

	test.skip('returns forks in format we expect', async () => {
		const response = getGistDetails({ params: { gistId: '2abd4f38fd6177003a176e4a02e13be1' } });
		const forks = await response.data.forkData;
		expect(forks.data).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					id: expect.any(String),
					html_url: expect.any(String),
					owner: expect.objectContaining({
						login: expect.any(String),
						avatar_url: expect.any(String),
					}),
				}),
			])
		);
	});
});
