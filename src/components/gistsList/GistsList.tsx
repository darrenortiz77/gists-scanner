import classes from './GistsList.module.css';
import { Link, useParams } from 'react-router-dom';
import FileBadges from '../fileBadges/FileBadges';
import { formatDate, getNumPages } from '../../utils';
import Pagination from '../pagination/Pagination';

type GistsListProps = {
	gists: UsersGists;
};

export default function GistsList({ gists }: GistsListProps) {
	const params = useParams();
	const currentPage = params.page ? +params.page : 1;
	const numPages = getNumPages(gists.headers.link);

	return (
		<>
			<ul className={classes['gists-list']}>
				{gists.data.map(gist => (
					<li key={gist.id}>
						<Link to={`/gist/${gist.id}`}>{formatDate(gist.created_at)}</Link>
						{gist.description && gist.description !== '' && <p>{gist.description}</p>}
						<FileBadges files={gist.files} />
					</li>
				))}
			</ul>
			{numPages > 1 && (
				<Pagination urlPattern={`/user/${params.username}/`} numPages={numPages} currentPage={currentPage} />
			)}
		</>
	);
}
