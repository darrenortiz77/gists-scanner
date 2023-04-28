import classes from './ErrorPage.module.css';
import { Link, useRouteError } from 'react-router-dom';

type ErrorResponse = {
	status?: number;
	message?: string;
};

export default function ErrorPage() {
	const error = useRouteError() as ErrorResponse;
	console.error(error);

	return (
		<>
			<main className={error.status === 404 ? classes['error-404'] : ''}>
				<h1>{error.status === 404 ? '404' : 'Oops!'}</h1>
				{error.status === 404 && (
					<>
						<p>Is it me you're looking for?</p>
						<p>
							<Link to="/">Go home</Link>
						</p>
					</>
				)}
				{error.status !== 404 && (
					<p>
						{error.status}
						<br />
						{error.message}
					</p>
				)}
			</main>
		</>
	);
}
