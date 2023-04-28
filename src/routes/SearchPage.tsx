import SearchUserForm from '../components/searchUserForm/SearchUserForm';
import UsersList from '../components/usersList/UsersList';

export default function SearchPage() {
	return (
		<>
			<h1>Gists Scanner</h1>
			<SearchUserForm />
			<UsersList />
		</>
	);
}
