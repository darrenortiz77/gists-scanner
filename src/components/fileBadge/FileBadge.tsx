import classes from './FileBadge.module.css';

type FileBadgeProps = {
	text: string;
};

export default function FileBadge({ text }: FileBadgeProps) {
	return <span className={classes.badge}>{text}</span>;
}
