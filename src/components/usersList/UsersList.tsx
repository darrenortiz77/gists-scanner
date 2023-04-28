import { Suspense } from 'react';
import classes from './UsersList.module.css';
import { Await, useLoaderData } from 'react-router-dom';
import User from '../user/User';

/**
 * Takes in a list of gists and returns an array of unique users.
 *
 * @todo Debatable as to whether this should go in the utils module,
 * but since it's currently only used in this file I think it's fine
 * to leave it here.
 *
 * @param gists
 * @returns Array of tuples representing unique usernames and their avatars: [[username, avatar], [username, avatar], [username, avatar],...]
 */
const getUniqueUserData = (gists: GistsList) => {
	const userData: Map<string, string> = new Map();

	gists?.data.forEach(gist => {
		if (gist.owner && gist.public) {
			userData.set(gist.owner.login, gist.owner.avatar_url);
		}
	});

	return [...userData.entries()];
};

export default function UsersList() {
	const { gists } = useLoaderData() as { gists: GistsList };

	return (
		<div className={classes['users-list-ctn']}>
			<p>Or select any of the sample users below who are known to have Gists...</p>
			<Suspense fallback={<p>Loading users list...</p>}>
				<Await resolve={gists}>
					{loadedGists => (
						<ul>
							{getUniqueUserData(loadedGists).map(([username, avatarUrl]) => (
								<li key={username}>
									<User avatarUrl={avatarUrl} username={username} targetUrl={`/user/${username}`} />
								</li>
							))}
						</ul>
					)}
				</Await>
			</Suspense>
		</div>
	);
}
