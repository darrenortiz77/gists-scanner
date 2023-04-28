import classes from './TitledSection.module.css';

type TitledSectionProps = {
	title?: string;
	children?: React.ReactNode;
};

export default function TitledSection({ title, children }: TitledSectionProps) {
	return (
		<section className={classes['titled-section']}>
			<div className={classes['titled-section__title']}>{title}</div>
			<div className={classes['titled-section__content']}>{children}</div>
		</section>
	);
}
