import classes from './Avatar.module.css';

type AvatarProps = {
	avatarUrl?: string;
	username?: string;
	size?: 'small' | 'large';
	align?: 'left' | 'center' | 'right';
};

export default function Avatar({ avatarUrl, username, size = 'small', align = 'left' }: AvatarProps) {
	return <img className={`${classes.avatar} ${classes[size]} ${classes[align]}`} src={avatarUrl} alt={username} />;
}
