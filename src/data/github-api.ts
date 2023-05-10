import { Octokit } from '@octokit/core';
import { OctokitResponse } from '@octokit/types';
import { LoaderFunctionArgs, defer, redirect } from 'react-router-dom';

type RequestOptions = {
	username?: string;
	gist_id?: string;
	per_page?: number;
	page?: number;
};

const GH_API_VERSION = '2022-11-28';
const octokit = new Octokit();

/*
TODO: this cache is limited to the current session memory.
A reload would clear the cache immediately. Saving to sessionStorage
might be a better solution. Or ultimately, switching to an OOTB solution
like React Query or Redux
*/
const cache = new Map<string, OctokitResponse<any>>();

/**
 * Main request handler to retrieve data from GitHub API.
 * Caches responses locally to prevent duplicate queries in the same session.
 * All other "public" methods below leverage this method under the hood.
 *
 * @see https://docs.github.com/en/rest/gists/gists?apiVersion=2022-11-28
 *
 * @param requestStr Request path to pass to Octokit
 * @param options (optional) Options object Octokit accepts for certain requests
 * @param invalidateCache (Default false) If true, will ignore the local cache and force a fresh pull
 * @returns OctokitResponse
 */
const fetchFromGitHub = async (requestStr: string, options?: RequestOptions, invalidateCache = false) => {
	// Check in local cache first
	const cacheKey = `${requestStr}::${JSON.stringify(options)}`;
	if (!invalidateCache && cache.has(cacheKey)) {
		return cache.get(cacheKey);
	}

	const response = await octokit.request(requestStr, {
		...options,
		headers: { 'X-GitHub-Api-Version': GH_API_VERSION },
	});

	// Save the response to the local cache
	cache.set(cacheKey, response);

	// console.log(response);

	return response;
};

/**
 * Get some publicly available gists (not user-specific).
 * This is used only so we can pull some sample GH users out of the result
 * so we can present the user with a list of users that are known to have
 * at least one or more publicly-available Gists.
 *
 * @see https://docs.github.com/en/rest/gists/gists?apiVersion=2022-11-28#list-public-gists
 *
 * @returns DeferredData
 */
export const getGists = () => {
	return defer({
		gists: fetchFromGitHub('GET /gists/public', { per_page: 100 }),
	});
};

/**
 * Form processor for Search form on homepage.
 * If:
 * - user failed to enter a valid string
 * - GH user does not exist
 * - GH user exists but has no gists
 * - a rate-limiting error occurs
 * we return an error message to be displayed on the form.
 * Else, if a result is returned we redirect to the `/user/${username}` page
 * to display the results
 */
export const searchUser = async ({ request }: LoaderFunctionArgs) => {
	const data = await request.formData();
	const username = data.get('username')?.toString() || '';

	if (username.trim() === '') {
		return { error: 'Please enter a username.' };
	}

	try {
		const response = await fetchFromGitHub(`GET /users/${username}/gists`, { username, per_page: 30, page: 1 });

		if (response?.status === 422) {
			return { error: 'Rate limit reached. Please try again in a little while.' };
		} else if (response?.data?.length === 0) {
			return { error: 'User exists but has no gists. Please try a different user.' };
		} else if (response?.data?.length > 0) {
			return redirect(`/user/${username}`);
		}
	} catch (err) {
		// console.error(err);
		return { error: 'User does not exist. Please try again.' };
	}
};

/**
 * Get paginated results for all gists belonging to a particular user.
 * Expected router params are `username` and optionally a `page`.
 */
export const getUsersGists = ({ params }: LoaderFunctionArgs) => {
	const username = params.username;
	const pageNum = params.page ? +params.page : 1;

	return defer({
		gists: fetchFromGitHub(`GET /users/${username}/gists`, { username, per_page: 30, page: pageNum }),
	});
};

/**
 * Get all details for a particular gist including the last 3 forks made on it (if any).
 */
export const getGistDetails = ({ params }: LoaderFunctionArgs) => {
	const gistId = params.gistId;

	return defer({
		gistData: fetchFromGitHub(`GET /gists/${gistId}`, { gist_id: gistId }),
		forkData: fetchFromGitHub(`GET /gists/${gistId}/forks`, { gist_id: gistId, per_page: 3 }),
	});
};
