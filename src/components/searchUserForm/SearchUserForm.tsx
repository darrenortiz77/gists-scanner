import classes from './SearchUserForm.module.css';
import { useEffect, useRef } from 'react';
import { Form, useActionData, useNavigation } from 'react-router-dom';

type ActionData =
	| {
			error?: string;
	  }
	| undefined;

export default function SearchUserForm() {
	const navigation = useNavigation();
	const data = useActionData() as ActionData;
	const searchInput = useRef<HTMLInputElement>(null);
	const isSubmitting = navigation.state === 'submitting';

	useEffect(() => {
		searchInput?.current?.focus();
	}, [data?.error]);

	return (
		<Form className={classes['search-form']} method="POST" action="/">
			<label htmlFor="search">Enter a GitHub username below to retrieve all Gists created by that user.</label>
			<input type="search" name="username" id="search" ref={searchInput} />
			{isSubmitting && <div className={classes.submitting}>Searching...</div>}
			{!isSubmitting && <div className={classes.error}>{data?.error ?? data?.error}</div>}
		</Form>
	);
}
