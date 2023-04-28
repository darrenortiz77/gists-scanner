import { Link } from 'react-router-dom';
import Avatar from '../avatar/Avatar';
import classes from './User.module.css';

type UserProps = {
	avatarUrl?: string;
	username?: string;
	targetUrl?: string;
};

export default function User({ avatarUrl, username, targetUrl }: UserProps) {
	const isLinkable = targetUrl !== undefined && targetUrl !== '';
	const isExternal = targetUrl?.indexOf('http') === 0;

	const userOutput = (
		<div className={classes.user}>
			<Avatar avatarUrl={avatarUrl} username={username} />
			<div className={classes.username}>{username}</div>
		</div>
	);

	if (!isLinkable) {
		return userOutput;
	} else if (isExternal) {
		return (
			<a href={targetUrl} target="_blank" rel="noreferrer noopener">
				{userOutput}
			</a>
		);
	} else {
		return <Link to={targetUrl}>{userOutput}</Link>;
	}
}
