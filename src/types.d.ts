import { Endpoints } from '@octokit/types';

declare global {
	type GistsList = Endpoints['GET /gists/public']['response'];
	type UsersGists = Endpoints['GET /users/{username}/gists']['response'];
	type Gist = Endpoints['GET /gists/{gist_id}']['response'];
	type Forks = Endpoints['GET /gists/{gist_id}/forks']['response'];
	type File =
		| {
				filename?: string;
				language?: string | null;
				type?: string;
				size?: number;
		  }
		| undefined
		| null;
	type Files = Record<string, File>;
}
