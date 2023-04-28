import { getFileTypes } from '../../utils';
import FileBadge from '../fileBadge/FileBadge';
import classes from './FileBadges.module.css';

type FileBadgesProps = {
	files: Files;
};

export default function FileBadges({ files }: FileBadgesProps) {
	const uniqueFiles = getFileTypes(files);

	return <div className={classes.badges}>{uniqueFiles.map(file => file && <FileBadge key={file} text={file} />)}</div>;
}
