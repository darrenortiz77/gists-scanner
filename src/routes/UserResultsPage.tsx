import { Await, useLoaderData, useParams } from 'react-router-dom';
import Avatar from '../components/avatar/Avatar';
import GistsList from '../components/gistsList/GistsList';
import { Suspense, useEffect } from 'react';

export default function UserResultsPage() {
	const params = useParams();
	const { gists } = useLoaderData() as { gists: UsersGists };

	// TODO: having a weird issue with the pagination in that it's not
	// scrolling back to the top automatically. I was under the impression
	// NavLink did that by default. Temporary hack to ensure we always scroll
	// back to the top on each page load.
	useEffect(() => {
		window.scrollTo(0, 0);
	});

	return (
		<>
			<h1>Gists for {params.username}</h1>
			<Suspense fallback={<p style={{ textAlign: 'center' }}>Loading gists...</p>}>
				<Await resolve={gists}>
					{(loadedGists: UsersGists) => (
						<>
							{loadedGists.data[0]?.owner?.avatar_url && (
								<div style={{ display: 'flex', justifyContent: 'center' }}>
									<a href={loadedGists.data[0]?.owner?.html_url} target="_blank" rel="noreferrer noopener">
										<Avatar
											avatarUrl={loadedGists.data[0]?.owner?.avatar_url}
											username={params.username || ''}
											size="large"
											align="center"
										/>
									</a>
								</div>
							)}
							<GistsList gists={loadedGists} />
						</>
					)}
				</Await>
			</Suspense>
		</>
	);
}
