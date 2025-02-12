export const enum ROUTER_KEYS {
	ALL_MATCH = '/*',
	COUNTRIES = '/',
	COUNTRY = '/country/:name/:code',
}

export const STORAGE_KEYS = Object.freeze({
	ACCESS_TOKEN: 'ACCESS_TOKEN',
	REFRESH_TOKEN: 'REFRESH_TOKEN',
});

export const QUERY_KEYS = Object.freeze({
	AUTH: 'AUTH',
});
