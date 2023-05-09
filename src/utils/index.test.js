import { formatDate, formatFilesize, getFileTypes, getNumPages } from '.';

describe('formatDate()', () => {
	test('formats dates properly', () => {
		expect(formatDate('2023-04-28T01:42:35Z')).toBe('Thu, Apr 27, 2023, 8:42:35 PM');
	});
});

describe('formatFilesize()', () => {
	test('< 1000b to be output as bytes', () => {
		expect(formatFilesize(813)).toBe('813 Bytes');
	});

	test('< 1024b to be output as bytes and number-formatted', () => {
		expect(formatFilesize(1023)).toBe('1,023 Bytes');
	});

	test('1024b to be 1KB', () => {
		expect(formatFilesize(1024)).toBe('1KB');
	});

	test('1000000 bytes to be 976.56MB', () => {
		expect(formatFilesize(1000000)).toBe('976.56KB');
	});

	test('1048576 bytes to be 1MB', () => {
		expect(formatFilesize(1048576)).toBe('1MB');
	});

	test('1073720852 bytes to be 1,023.98MB', () => {
		expect(formatFilesize(1073720852)).toBe('1,023.98MB');
	});

	test('1073741823 bytes to be 1,024MB', () => {
		expect(formatFilesize(1073741823)).toBe('1,024MB');
	});

	test('1073741824 bytes to be 1GB', () => {
		expect(formatFilesize(1073741824)).toBe('1GB');
	});

	test('1074815565824 bytes to be 1,001GB', () => {
		expect(formatFilesize(1074815565824)).toBe('1,001GB');
	});

	test('null bytes to be empty string', () => {
		expect(formatFilesize(null)).toBe('');
	});

	test('undefined bytes to be empty string', () => {
		expect(formatFilesize()).toBe('');
	});
});

describe('getFileTypes()', () => {
	test('no files to be empty array', () => {
		const files = {};
		const filetypes = getFileTypes(files);
		expect(filetypes).toStrictEqual([]);
	});

	test('files with missing language to fallback to type', () => {
		const files = {
			file1: {
				language: '',
				type: 'type 1',
			},
			file2: {
				language: null,
				type: 'type 2',
			},
			file3: {
				type: 'type 3',
			},
		};
		const filetypes = getFileTypes(files);
		expect(filetypes).toStrictEqual(['type 1', 'type 2', 'type 3']);
	});

	test('only unique filetypes are output', () => {
		const files = {
			file1: {
				language: 'language 1',
				type: 'type 1',
			},
			file2: {
				language: 'language 1',
				type: 'type 1',
			},
			file3: {
				language: 'language 2',
				type: 'type 2',
			},
			file4: {
				language: '',
				type: '',
			},
		};
		const filetypes = getFileTypes(files);
		expect(filetypes).toStrictEqual(['language 1', 'language 2']);
	});
});

describe('getNumPages()', () => {
	test('undefined link returns 1 page-num', () => {
		expect(getNumPages()).toBe(1);
	});

	test('empty link returns 1 page-num', () => {
		expect(getNumPages('')).toBe(1);
	});

	test('accurately get num pages when not on last page', () => {
		const link =
			'<https://api.github.com/user/26523804/gists?username=boegelbot&page=2>; rel="next", <https://api.github.com/user/26523804/gists?username=boegelbot&page=280>; rel="last"';
		expect(getNumPages(link)).toBe(280);
	});

	test('accurately get num pages when on last page', () => {
		const link =
			'<https://api.github.com/user/26523804/gists?username=boegelbot&page=279>; rel="prev", <https://api.github.com/user/26523804/gists?username=boegelbot&page=1>; rel="first"';
		expect(getNumPages(link)).toBe(280);
	});

	test("fallback to 1 page-num if link can't be properly parsed", () => {
		const link =
			'<https://api.github.com/user/26523804/gists?username=boegelbot&page=279>; rel="asdf", <https://api.github.com/user/26523804/gists?username=boegelbot&page=1>; rel="asdf"';
		expect(getNumPages(link)).toBe(1);
	});
});
