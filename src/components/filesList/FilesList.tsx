import classes from './FilesList.module.css';
import { formatFilesize } from '../../utils';
import FileBadge from '../fileBadge/FileBadge';

type FilesListProps = {
	files?: Files;
};

export default function FilesList({ files }: FilesListProps) {
	return (
		<>
			<ul className={classes['files-list']}>
				{files &&
					Object.keys(files).map(key => {
						const file = files[key];
						return file ? (
							<li key={file.filename}>
								<div className={classes.filebadge}>
									<FileBadge text={file.language ?? file.type ?? ''} />
								</div>
								<div className={classes.filename}>{file.filename}</div>
								<div className={classes.filesize}>{formatFilesize(file.size)}</div>
							</li>
						) : null;
					})}
			</ul>
		</>
	);
}
