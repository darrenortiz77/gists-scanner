import { Await, useLoaderData, useParams } from 'react-router-dom';
import { Suspense } from 'react';
import FilesList from '../components/filesList/FilesList';
import ForksList from '../components/forksList/ForksList';
import User from '../components/user/User';
import TitledSection from '../ui/titledSection/TitledSection';

/*
TODO: too much going on in one component. This should be broken up.
Also, got a little lazy with the CSS and threw in inline styles. Yuck.
*/

export default function GistDetailsPage() {
	const params = useParams();
	const { gistData, forkData } = useLoaderData() as { gistData: Gist; forkData: Forks };

	return (
		<>
			<h1 style={{ textAlign: 'left' }}>
				Gist Details for <span style={{ wordBreak: 'break-all' }}>{params.gistId}</span>
			</h1>
			<Suspense fallback={<p>Loading gist details...</p>}>
				<Await resolve={gistData}>
					{(loadedGistData: Gist) => (
						<>
							<p>
								<a href={loadedGistData.data.html_url} target="_blank" rel="noreferrer noopener">
									Go to Gist on GitHub
								</a>
							</p>
							<TitledSection title="Owner:">
								<User
									avatarUrl={loadedGistData.data.owner?.avatar_url}
									username={loadedGistData.data.owner?.login}
									targetUrl={loadedGistData.data.owner?.html_url}
								/>
							</TitledSection>

							{loadedGistData.data.description && (
								<TitledSection title="Description:">{loadedGistData.data.description}</TitledSection>
							)}

							<TitledSection title="Files:">
								<FilesList files={loadedGistData.data.files} />
							</TitledSection>
						</>
					)}
				</Await>
			</Suspense>

			<Suspense fallback={<p>Loading fork details...</p>}>
				<Await resolve={forkData}>
					{(loadedForkData: Forks) => (
						<TitledSection title="Recent Forks:">
							<ForksList forks={loadedForkData.data} />
						</TitledSection>
					)}
				</Await>
			</Suspense>
		</>
	);
}
