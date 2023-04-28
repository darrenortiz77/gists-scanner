import classes from './Pagination.module.css';
import { NavLink } from 'react-router-dom';

type PaginationProps = {
	urlPattern: string;
	numPages: number;
	currentPage: number;
	maxPagination?: number;
};

/**
 * Construct pagination url.
 *
 * @param urlPattern Expecting either:
 * a) a string with {page} in it which would then be replaced with the page number
 * i.e.: 'myUrl/{page}/some-other-path' === 'myUrl/2/some-other-path'
 * b) a regular string with no {page} portion to it in which case the page will just be appeneded to the end
 * i.e.: 'myUrl/' === 'myUrl/2'
 * @param page The page number to insert in the url
 *
 * @returns String (url) with page number inserted
 */
const getPaginatedUrl = (urlPattern: string, page: number) => {
	if (urlPattern.includes('{page}')) {
		return urlPattern.replace('{page}', page.toString());
	} else {
		return `${urlPattern}${page}`;
	}
};

/**
 * Returns a NavLink pointing to the correct pagination path.
 *
 * @todo Possible candidate for memoization.
 *
 * @param urlPattern See `getPaginatedUrl` above
 * @param page Page number for link
 * @param currentPage Current page we're on
 * @param label Text for the link
 * @param extraClass Any extra CSS classes to add
 * @param key
 *
 * @returns NavLink
 */
const getLink = (
	urlPattern: string,
	page: number,
	currentPage: number,
	label: string | number,
	extraClass?: string | null,
	key?: string | number
) => {
	return (
		<NavLink
			key={key}
			to={getPaginatedUrl(urlPattern, page)}
			preventScrollReset={false}
			className={({ isActive }) => {
				const activeClass = isActive || (page === 1 && currentPage === 1) ? classes.active : '';
				const extra = extraClass ? extraClass : '';
				return `${activeClass} ${extra}`.trim();
			}}
		>
			{label}
		</NavLink>
	);
};

export default function Pagination({ urlPattern, numPages, currentPage, maxPagination = 10 }: PaginationProps) {
	if (numPages <= 1) {
		return null;
	}

	const prevPage = currentPage > 1 ? currentPage - 1 : 1;
	const nextPage = currentPage < numPages ? currentPage + 1 : numPages;
	let startingPage = currentPage <= Math.ceil(maxPagination / 2) ? 1 : currentPage - Math.ceil(maxPagination / 2);
	startingPage = Math.min(startingPage, Math.max(numPages - maxPagination + 1, 1));
	const endingPage = Math.min(startingPage + maxPagination - 1, numPages);

	const paginations = [];
	for (let p = startingPage; p <= endingPage; p++) {
		const link = getLink(urlPattern, p, currentPage, p, null, p);
		paginations.push(link);
	}

	return (
		<div className={classes.pagination}>
			{numPages > maxPagination && getLink(urlPattern, 1, currentPage, 'First page', `${classes.first}`)}
			{getLink(urlPattern, prevPage, currentPage, 'Previous page', `${classes.prev}`)}
			{paginations}
			{getLink(urlPattern, nextPage, currentPage, 'Next page', `${classes.next}`)}
			{numPages > maxPagination && getLink(urlPattern, numPages, currentPage, 'Last page', `${classes.last}`)}
		</div>
	);
}
