import { getGistDetails, getGists, getUsersGists } from './github-api';

/*
TODO: very mediocre tests. Pretty much just testing the happy-path.
Not even testing the specific data response.
*/

test('it gets public gists', () => {
	const response = getGists();
	const gists = response.data.gists;
	return expect(gists).resolves.toBeTruthy();
});

/*
TODO: not sure how to test the "searchUser" method as it's
expecting a react-router "Request". Need to research.
*/
// test('it can find a user', () => {
// 	const response = searchUser();
// });

test('it gets a users gists', () => {
	const response = getUsersGists({ params: { username: 'darrenortiz77' } });
	const gists = response.data.gists;
	return expect(gists).resolves.toBeTruthy();
});

test('it gets gist details', () => {
	const response = getGistDetails({ params: { gistId: '2abd4f38fd6177003a176e4a02e13be1' } });
	const gistData = response.data.gistData;
	return expect(gistData).resolves.toBeTruthy();
});

test('it gets fork details', () => {
	const response = getGistDetails({ params: { gistId: '2abd4f38fd6177003a176e4a02e13be1' } });
	const forkData = response.data.forkData;
	return expect(forkData).resolves.toBeTruthy();
});
