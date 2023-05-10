const publicGists = {
	headers: {},
	status: 200,
	url: '',
	data: [
		{
			public: true,
			owner: {
				login: 'GiiMiko',
				avatar_url: 'https://avatars.githubusercontent.com/u/125937703?v=4',
			},
		},
	],
};

const usersGists = {
	headers: {},
	status: 200,
	url: '',
	data: [
		{
			id: '2abd4f38fd6177003a176e4a02e13be1',
			files: {
				'GistDetailsPage.tsx': {
					filename: 'GistDetailsPage.tsx',
					type: 'text/plain',
					language: 'TSX',
					size: 822,
				},
				'SearchPage.tsx': {
					filename: 'SearchPage.tsx',
					type: 'text/plain',
					language: 'TSX',
					size: 583,
				},
			},
			created_at: '2023-04-26T19:49:07Z',
			updated_at: '2023-04-26T19:58:13Z',
			description: 'My first gist',
			owner: {
				login: 'darrenortiz77',
				id: 1315907,
				avatar_url: 'https://avatars.githubusercontent.com/u/1315907?v=4',
			},
		},
	],
};

const userWithNoGists = {
	headers: {},
	status: 200,
	url: '',
	data: [],
};

const rateLimitReached = {
	headers: {},
	status: 422,
	url: '',
	data: [],
};

const gistDetails = {
	headers: {},
	status: 200,
	url: '',
	data: [
		{
			id: 'bd94da501c1dd0b16c834472b14fa82d',
			created_at: '2023-04-26T19:58:13Z',
			updated_at: '2023-04-26T19:58:13Z',
			description: 'My first gist',
			owner: {
				login: 'bcairns',
				avatar_url: 'https://avatars.githubusercontent.com/u/638372?v=4',
			},
		},
	],
};

const forks = {
	headers: {},
	status: 200,
	url: '',
	data: {
		id: '2abd4f38fd6177003a176e4a02e13be1',
		updated_at: '2023-04-26T19:58:13Z',
		html_url: 'https://gist.github.com/darrenortiz77/2abd4f38fd6177003a176e4a02e13be1',
		owner: {
			login: 'darrenortiz77',
			avatar_url: 'https://avatars.githubusercontent.com/u/1315907?v=4',
		},
	},
};

export class Octokit {
	async request(requestStr) {
		let response = {
			headers: {},
			status: 200,
			url: '',
			data: [],
		};

		if (requestStr.match(/throw-error/i)) {
			throw new Error('some error');
		} else if (requestStr === 'GET /gists/public') {
			response = publicGists;
		} else if (requestStr.match(/GET \/users\/no-gists/i)) {
			response = userWithNoGists;
		} else if (requestStr.match(/GET \/users\/rate-limit/i)) {
			response = rateLimitReached;
		} else if (requestStr.match(/^GET \/users\/.+?/i)) {
			response = usersGists;
		} else if (requestStr.match(/^GET \/gists\/.+?\/forks/i)) {
			response = forks;
		} else if (requestStr.match(/^GET \/gists\/.+?/i)) {
			response = gistDetails;
		}

		const promise = await new Promise(resolve => {
			setTimeout(() => {
				resolve(response);
			}, 100);
		});

		return promise;
	}
}
