import classes from './Breadcrumbs.module.css';
import { Link, useMatches } from 'react-router-dom';

// TODO: I'm not in love with how I'm building these breadcrumbs. There's got to be a better way.

export default function Breadcrumbs() {
	const matches = useMatches();

	/*
	Only display breadcrumbs if we're not on the homepage.
	For some reason, if we're on the homepage (Search), matches returns 2 results whereas all
	other routes only display a single entry for the homepage.
	*/
	if (matches.length <= 1 || (matches.length === 2 && matches[1].pathname === '/')) {
		return null;
	}

	return (
		<ul data-testid="breadcrumbs" className={classes.breadcrumbs}>
			{matches.map((match, i) => {
				const text =
					(match.handle as Record<string, string>)?.crumb || match.params.username || match.params.gistId || '';

				if (i < matches.length - 1) {
					return (
						<li key={text}>
							<Link to={match.pathname}>{text}</Link> /&nbsp;
						</li>
					);
				} else {
					return <li key={text}>{text}</li>;
				}
			})}
		</ul>
	);
}
