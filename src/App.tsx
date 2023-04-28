import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SearchPage from './routes/SearchPage';
import UserResultsPage from './routes/UserResultsPage';
import GistDetailsPage from './routes/GistDetailsPage';
import Root from './routes/Root';
import { getGistDetails, getGists, getUsersGists, searchUser } from './data/github-api';
import ErrorPage from './routes/ErrorPage';

export const routerConfig = [
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
		action: searchUser,
		handle: {
			crumb: 'search',
		},
		children: [
			{
				index: true,
				element: <SearchPage />,
				loader: getGists,
			},
			{
				path: 'user/:username',
				element: <UserResultsPage />,
				loader: getUsersGists,
			},
			{
				path: 'user/:username/:page',
				element: <UserResultsPage />,
				loader: getUsersGists,
			},
			{
				path: 'gist/:gistId',
				element: <GistDetailsPage />,
				loader: getGistDetails,
			},
		],
	},
];

const router = createBrowserRouter(routerConfig);

export default function App() {
	return <RouterProvider router={router} />;
}
