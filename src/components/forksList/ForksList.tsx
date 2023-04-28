import { formatDate } from '../../utils';
import User from '../user/User';
import classes from './ForksList.module.css';

// TODO: I don't think I need to be declaring this type here. Octokit must have it somewhere.
type Fork = {
	id?: string;
	html_url?: string;
	updated_at?: string;
	owner?: {
		avatar_url: string;
		login: string;
	};
};

type ForksListProps = {
	forks: Fork[];
};

export default function ForksList({ forks }: ForksListProps) {
	return (
		<>
			{forks.length > 0 && (
				<ul className={classes['forks-list']}>
					{forks.map(fork => (
						<li key={fork.id}>
							<a href={fork.html_url} target="_blank" rel="noreferrer noopener">
								{fork.updated_at && <div className={classes.date}>{formatDate(fork.updated_at)}</div>}
								<User avatarUrl={fork.owner?.avatar_url} username={fork.owner?.login} />
							</a>
						</li>
					))}
				</ul>
			)}
			{forks.length === 0 && <p>No forks exist.</p>}
		</>
	);
}
