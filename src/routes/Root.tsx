import { Outlet } from 'react-router-dom';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';

export default function Root() {
	return (
		<>
			<main>
				<Breadcrumbs />
				<Outlet />
			</main>
		</>
	);
}
