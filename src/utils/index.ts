/**
 * Format a date-time into a human-readable format.
 *
 * @todo Currently hardcoded to format for en-US in EST timezone. No localization support yet.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format
 *
 * @param date String in standard date-time string format
 * @returns Date/time formatted in a friendly, human-readable format. i.e.: Thu, Apr 27, 2023, 8:42:35 PM
 */
export const formatDate = (date: string) => {
	const dateObj = new Date(date);
	const DF = new Intl.DateTimeFormat('en-US', {
		timeZone: 'EST',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		weekday: 'short',
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});
	return DF.format(dateObj);
};

/**
 * Formats bytes into its most-appropriate unit and appends the unit to the end.
 *
 * @param bytes Filesize in bytes
 * @returns 4.12MB, 1.2KB, 678 Bytes, etc...
 */
export const formatFilesize = (bytes?: number | null) => {
	if (bytes === undefined || bytes === null) {
		return '';
	}

	const NF = Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });
	const kbs = bytes / 1024;
	const mbs = kbs / 1024;
	const gbs = mbs / 1024;
	let num;
	let unit;

	if (gbs >= 1) {
		num = gbs;
		unit = 'GB';
	} else if (mbs >= 1) {
		num = mbs;
		unit = 'MB';
	} else if (kbs >= 1) {
		num = kbs;
		unit = 'KB';
	} else {
		num = bytes;
		unit = ' Bytes';
	}

	num = NF.format(num);

	return `${num}${unit}`;
};

/**
 * Takes in a list of Files and returns an array containing the unique file-types/languages within.
 * @param files
 * @returns Array of unique strings
 */
export const getFileTypes = (files: Files) => {
	const filetypes = Object.keys(files).map(key => files[key]?.language || files[key]?.type);
	return [...new Set(filetypes)].filter(filetype => filetype !== '');
};

/**
 * Calculate the total number of pages for a particular Octokit response.
 *
 * @param link Link text which comes from the `header` portion of the Octokit response.
 *
 * @returns Number of pages present in dataset
 */
export const getNumPages = (link?: string) => {
	if (!link) {
		return 1;
	}

	// Sample link looks like:
	// <https://api.github.com/user/26523804/gists?username=boegelbot&page=2>; rel="next", <https://api.github.com/user/26523804/gists?username=boegelbot&page=280>; rel="last"

	const lastPageMatch = link.match(/page=(\d+?)>; rel="last"/i);
	const prevPageMatch = link.match(/page=(\d+?)>; rel="prev"/i);

	if (lastPageMatch && lastPageMatch.length >= 2) {
		return +lastPageMatch[1];
	} else if (prevPageMatch && prevPageMatch.length >= 2) {
		return +prevPageMatch[1] + 1;
	}

	return 1;
};
